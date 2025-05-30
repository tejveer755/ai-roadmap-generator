
import React from 'react';
import { ArrowRight, Brain, Target, Zap, Users, CheckCircle, Star, Github, ExternalLink } from 'lucide-react';
import AnimatedBackground from '@/components/AnimatedBackground';
import FeatureCard from '@/components/FeatureCard';
import CTAButton from '@/components/CTAButton';

const Index = () => {
  return (
    <div className="min-h-screen text-white">
      <AnimatedBackground />

      {/* Header */}
      <header className="relative z-10 px-6 py-6">
        <nav className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              RoadmapAI
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#project"
              className="text-gray-300 hover:text-white transition-colors duration-200"
            >
              About Project
            </a>
            <a
              href="#features"
              className="text-gray-300 hover:text-white transition-colors duration-200"
            >
              Features
            </a>
            <a
              href="#tech-stack"
              className="text-gray-300 hover:text-white transition-colors duration-200"
            >
              Tech Stack
            </a>
            <CTAButton variant="secondary" size="sm">
              <Github className="w-4 h-4" />
              View Code
            </CTAButton>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-800/50 border border-gray-700/50 backdrop-blur-sm mb-8">
              <Star className="w-4 h-4 text-yellow-400" />
              <span className="text-sm text-gray-300">
                Personal Portfolio Project
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              AI-Powered{" "}
              <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent animate-gradient-shift bg-300%">
                Learning
              </span>
              <br />
              Roadmap Generator
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              A full-stack web application that creates personalized learning
              paths using AI. Built to showcase modern web development skills
              and AI integration.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <CTAButton variant="primary" size="lg">
                <ExternalLink className="w-5 h-5 mr-2" />
                Generate Roadmap
              </CTAButton>
              <CTAButton variant="secondary" size="lg">
                <Github className="w-5 h-5 mr-2" />
                View on GitHub
              </CTAButton>
            </div>
          </div>
        </div>
      </section>

      {/* Project Overview */}
      <section id="project" className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              About This{" "}
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Project
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              A showcase of modern web development techniques, AI integration,
              and user experience design
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Brain className="w-8 h-8" />}
              title="AI Integration"
              description="Demonstrates integration with modern AI APIs to generate intelligent, personalized learning recommendations"
              delay="animate-delay-200"
            />
            <FeatureCard
              icon={<Target className="w-8 h-8" />}
              title="Full-Stack Development"
              description="Complete web application with frontend, backend, database design, and API development"
              delay="animate-delay-400"
            />
            <FeatureCard
              icon={<Zap className="w-8 h-8" />}
              title="Modern Tech Stack"
              description="Built with React, TypeScript, Tailwind CSS, and other cutting-edge technologies"
              delay="animate-delay-600"
            />
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section id="features" className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Key Features Implemented
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Technical capabilities and features that demonstrate development
              expertise
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "User Input Processing",
                description:
                  "Dynamic form handling with validation, data processing, and user preference storage",
              },
              {
                step: "02",
                title: "AI API Integration",
                description:
                  "Seamless integration with AI services to generate contextual learning roadmaps",
              },
              {
                step: "03",
                title: "Interactive UI/UX",
                description:
                  "Responsive design with smooth animations, real-time updates, and intuitive navigation",
              },
            ].map((item, index) => (
              <div
                key={index}
                className={`text-center animate-slide-up animate-delay-${
                  (index + 1) * 200
                }`}
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">
                    {item.step}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-4">{item.title}</h3>
                <p className="text-gray-300">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section id="tech-stack" className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-slide-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-12">
              Technologies Used
            </h2>
            <div className="grid md:grid-cols-4 gap-8 mb-12">
              {[
                { tech: "Next JS", category: "Framework" },
                { tech: "Tailwind CSS", category: "Styling & Design" },
                { tech: "Google Gemini API", category: "AI-api" },
                { tech: "Modern Deployment", category: "DevOps & Hosting" },
              ].map((item, index) => (
                <div
                  key={index}
                  className={`animate-slide-up animate-delay-${
                    (index + 1) * 200
                  }`}
                >
                  <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                    {item.tech}
                  </div>
                  <div className="text-gray-300">{item.category}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-r from-gray-900/80 to-gray-800/80 border border-gray-700/50 backdrop-blur-sm animate-slide-up">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Interested in This Project?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Explore the code, try the live demo, or get in touch to discuss
              the development process
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <CTAButton variant="primary" size="lg">
                <ExternalLink className="w-5 h-5 mr-2" />
                Live Demo
              </CTAButton>
              <CTAButton variant="secondary" size="lg">
                <Github className="w-5 h-5 mr-2" />
                Source Code
              </CTAButton>
            </div>
            <p className="text-sm text-gray-400 mt-6">
              Open source • Fully documented • Portfolio showcase
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-12 border-t border-gray-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">
                RoadmapAI Portfolio Project
              </span>
            </div>
            <div className="flex items-center gap-6 text-gray-400">
              <a
                href="#"
                className="hover:text-white transition-colors duration-200"
              >
                Documentation
              </a>
              <a
                href="#"
                className="hover:text-white transition-colors duration-200"
              >
                Contact
              </a>
              <a
                href="#"
                className="hover:text-white transition-colors duration-200"
              >
                Portfolio
              </a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800/50 text-center text-gray-400">
            <p>
              &copy; 2024 Personal Portfolio Project. Built to showcase
              development skills.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
