// app/api/generate/route.js
import { NextResponse } from "next/server";
import { GoogleGenAI, Type } from "@google/genai"; // Ensure Type is imported
import { google } from "googleapis";

// Initialize the Gemini AI model
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Initialize the YouTube API client
const youtube = google.youtube({
  version: "v3",
  auth: process.env.YOUTUBE_API_KEY, // from .env.local
});

// Define the common instructions for Gemini
// This isn't "memory" in the conversational sense, but ensures these instructions
// are consistently part of your prompt for every request.
const commonInstructions = `
  You are an expert AI learning designer and mentor for college students. Your task is to create a detailed, personalized learning roadmap.
  Prioritize resources from trusted sources: YouTube tutorials and playlists, online courses (e.g., Coursera, freeCodeCamp, Udemy), official documentation, and respected articles or blogs.
  Maintain clean and concise language.
`;

// Define the precise JSON schema for the output
const roadmapResponseSchema = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING },
    description: { type: Type.STRING },
    phases: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          duration: { type: Type.STRING },
          goal: { type: Type.STRING },
          steps: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                topics: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      title: { type: Type.STRING },
                      subtopics: { type: Type.ARRAY, items: { type: Type.STRING } },
                      resources: {
                        type: Type.ARRAY,
                        items: {
                          type: Type.OBJECT,
                          properties: {
                            title: { type: Type.STRING },
                            type: { type: Type.STRING }, // e.g., 'course', 'tutorial', 'article', 'video'
                            link: { type: Type.STRING },
                          },
                          // This helps guide the model on property order, but isn't strictly enforced for generation
                          propertyOrdering: ["title", "type", "link"],
                        },
                      },
                      notes: { type: Type.STRING },
                    },
                    propertyOrdering: ["title", "subtopics", "resources", "notes"],
                  },
                },
              },
              propertyOrdering: ["title", "topics"],
            },
          },
        },
        propertyOrdering: ["title", "duration", "goal", "steps"],
      },
    },
  },
  propertyOrdering: ["title", "description", "phases"],
};

export async function POST(req) {
  // 1. Parse & validate input
  let body;
  try {
    body = await req.json();
  } catch (e) {
    console.error("Invalid JSON:", e);
    return NextResponse.json({ error: "Invalid JSON input" }, { status: 400 });
  }
  const { goal, purpose, level, experience, timeframe } = body;
  if (!goal || !purpose || !level) {
    return NextResponse.json(
      { error: "Please provide goal, purpose, and level." },
      { status: 400 }
    );
  }

  // Construct the prompt with common instructions and user inputs
  const prompt = `
    ${commonInstructions}

    Only return valid JSON. Do not add explanations, commentary, or extra fields.
    Your JSON must strictly adhere to the following schema:
    ${JSON.stringify(roadmapResponseSchema, null, 2)}

    Use the following inputs to tailor the plan:
    - Goal: ${goal}
    - Motivation: ${purpose}
    - Current Level: ${level}
    - Prior Experience: ${experience || "None"}
    - Weekly Time: ${timeframe || "Not specified"}

    Instructions:
    1. Divide the roadmap into 3–5 logical phases (e.g., Foundation, Application, Mastery), each with clear duration and goals.
    2. In each phase, add several clear steps (e.g., "Learn Basics of X", "Build a Mini Project").
    3. Each step should include multiple topics. Each topic must include:
        - 3–5 subtopics
        - 2–4 high-quality resources with title, type (e.g., course, tutorial, article, video), and link
        - A helpful note on what to focus on or why it's important
  `;

  let jsonResponseData;
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-001",
      contents: [{ text: prompt }], // Ensure contents is an array of objects
      temperature: 0.4,
      // *** Key change: Add responseMimeType and responseSchema to config ***
      config: {
        responseMimeType: "application/json",
        responseSchema: roadmapResponseSchema, // Use the defined schema object
      },
    });
    console.log(response)

    // When responseMimeType is set to application/json, response.text
    // should directly contain the JSON string.
    jsonResponseData = JSON.parse(response.text);

  } catch (err) {
    console.error("Gemini API error:", err);
    // Log the full error to understand if it's a generation or parsing issue
    if (err.response && err.response.text) {
        console.error("Raw Gemini response on error:", err.response.text);
    }
    return NextResponse.json(
      { error: err.message || "Internal Server Error during AI generation" },
      { status: 500 }
    );
  }

  // 4. Enrich each topic with YouTube videos
  const maxVideos = 3;
  const allTopics = [];

  // It's safer to check if jsonResponseData.phases exists and is an array
  if (jsonResponseData.phases && Array.isArray(jsonResponseData.phases)) {
    for (const phase of jsonResponseData.phases) {
      if (phase.steps && Array.isArray(phase.steps)) {
        for (const step of phase.steps) {
          if (step.topics && Array.isArray(step.topics)) {
            for (const topic of step.topics) {
              allTopics.push(topic);
            }
          }
        }
      }
    }
  }

  // Run all searches in parallel
  const searchResults = await Promise.all(
    allTopics.map(async (topic) => {
      try {
        const resp = await youtube.list({
          part: "snippet",
          q: topic.title + " tutorial", // Add "tutorial" to improve search relevance
          type: "video",
          maxResults: maxVideos,
        });

        const videoResources = resp.data.items.map((item) => ({
          title: item.snippet.title,
          type: "video",
          link: `https://www.youtube.com/watch?v=${item.id.videoId}`, // Correct YouTube link format
        }));

        return { topic, videoResources };
      } catch (error) {
        console.error("YouTube API error for:", topic.title, error);
        return { topic, videoResources: [] };
      }
    })
  );

  // Merge results back into topics
  for (const { topic, videoResources } of searchResults) {
    // Ensure topic.resources is an array before concatenating
    topic.resources = [...(topic.resources || []), ...videoResources];
  }

  // 5. Return enriched roadmap
  return NextResponse.json(jsonResponseData);
}