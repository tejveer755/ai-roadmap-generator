
import React from 'react';
import { ArrowLeft, Brain, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import AnimatedBackground from '@/components/AnimatedBackground';
import RoadmapDisplay from '@/components/roadmap/RoadmapDisplay';

// Sample roadmap data for demonstration
const sampleRoadmap = {
  title: "Full-Stack Web Development Roadmap",
  description: "A comprehensive learning path to become a proficient full-stack web developer, covering both frontend and backend technologies with modern best practices.",
  phases: [
    {
      title: "Frontend Foundations",
      duration: "8-12 weeks",
      goal: "Master the fundamentals of frontend web development",
      steps: [
        {
          title: "HTML & CSS Mastery",
          topics: [
            {
              title: "HTML Fundamentals",
              subtopics: ["Semantic HTML", "Forms & Validation", "Accessibility", "SEO Basics"],
              resources: [
                { title: "MDN HTML Guide", type: "Documentation", link: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
                { title: "HTML Crash Course", type: "Video", link: "#" },
                { title: "Web Accessibility Course", type: "Course", link: "#" }
              ],
              notes: "Focus on semantic markup and accessibility best practices from the beginning"
            },
            {
              title: "CSS & Styling",
              subtopics: ["Flexbox", "Grid", "Responsive Design", "CSS Variables", "Animations"],
              resources: [
                { title: "CSS Grid Complete Guide", type: "Article", link: "#" },
                { title: "Flexbox Froggy", type: "Interactive", link: "#" },
                { title: "CSS Animation Masterclass", type: "Course", link: "#" }
              ],
              notes: "Practice with real projects to solidify concepts and build muscle memory"
            }
          ]
        },
        {
          title: "Modern CSS Frameworks",
          topics: [
            {
              title: "Tailwind CSS",
              subtopics: ["Utility Classes", "Component Patterns", "Responsive Design", "Dark Mode"],
              resources: [
                { title: "Tailwind Documentation", type: "Documentation", link: "#" },
                { title: "Tailwind UI Components", type: "Interactive", link: "#" }
              ],
              notes: "Learn utility-first approach for rapid UI development"
            }
          ]
        }
      ]
    },
    {
      title: "JavaScript & React",
      duration: "10-14 weeks",
      goal: "Build dynamic, interactive web applications",
      steps: [
        {
          title: "JavaScript Fundamentals",
          topics: [
            {
              title: "Core JavaScript",
              subtopics: ["ES6+ Features", "Async/Await", "DOM Manipulation", "Event Handling", "Error Handling"],
              resources: [
                { title: "JavaScript.info", type: "Documentation", link: "#" },
                { title: "JS30 Challenge", type: "Course", link: "#" },
                { title: "You Don't Know JS", type: "Article", link: "#" }
              ],
              notes: "Build small projects to practice each concept before moving to frameworks"
            }
          ]
        },
        {
          title: "React Development",
          topics: [
            {
              title: "React Fundamentals",
              subtopics: ["Components", "Props & State", "Hooks", "Context API", "Testing"],
              resources: [
                { title: "React Official Docs", type: "Documentation", link: "#" },
                { title: "React Hooks Deep Dive", type: "Video", link: "#" },
                { title: "Testing React Components", type: "Course", link: "#" }
              ],
              notes: "Focus on functional components and hooks - they're the modern way"
            }
          ]
        }
      ]
    }
  ]
};

const RoadmapView = () => {
  return (
    <div className="min-h-screen text-white relative">
      <AnimatedBackground />
      
      {/* Header */}
      <header className="relative z-10 px-6 py-8">
        <nav className="max-w-7xl mx-auto flex items-center justify-between">
          <Link 
            to="/" 
            className="group flex items-center gap-3 px-4 py-2 rounded-xl bg-gray-800/40 border border-gray-700/50 text-gray-300 hover:text-white hover:bg-gray-800/60 hover:border-gray-600/60 transition-all duration-300 backdrop-blur-sm"
          >
            <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-0.5" />
            <span className="font-medium">Back to Portfolio</span>
          </Link>
          
          <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-gradient-to-r from-gray-800/40 to-gray-700/30 border border-gray-700/50 backdrop-blur-sm">
            <div className="relative">
              <div className="w-8 h-8 bg-gradient-to-br from-white to-gray-300 rounded-xl flex items-center justify-center">
                <Brain className="w-5 h-5 text-gray-900" />
              </div>
              <Sparkles className="w-3 h-3 text-yellow-400 absolute -top-1 -right-1 animate-pulse" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              RoadmapAI
            </span>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="relative z-10 px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <RoadmapDisplay roadmap={sampleRoadmap} />
        </div>
      </main>
    </div>
  );
};

export default RoadmapView;
