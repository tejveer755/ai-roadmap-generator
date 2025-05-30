
import React from 'react';
import { Clock, Target, BookOpen, Award } from 'lucide-react';
import RoadmapPhase from './RoadmapPhase';

interface Resource {
  title: string;
  type: string;
  link: string;
}

interface Topic {
  title: string;
  subtopics: string[];
  resources: Resource[];
  notes: string;
}

interface Step {
  title: string;
  topics: Topic[];
}

interface Phase {
  title: string;
  duration: string;
  goal: string;
  steps: Step[];
}

interface Roadmap {
  title: string;
  description: string;
  phases: Phase[];
}

interface RoadmapDisplayProps {
  roadmap: Roadmap;
}

const RoadmapDisplay = ({ roadmap }: RoadmapDisplayProps) => {
  const totalSteps = roadmap.phases.reduce((total, phase) => total + phase.steps.length, 0);
  const totalTopics = roadmap.phases.reduce((total, phase) => 
    total + phase.steps.reduce((stepTotal, step) => stepTotal + step.topics.length, 0), 0);

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="text-center mb-16">
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-800/40 border border-gray-700/50 backdrop-blur-sm mb-6">
            <BookOpen className="w-4 h-4 text-emerald-400" />
            <span className="text-sm text-gray-300">Learning Roadmap</span>
          </div>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
          <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            {roadmap.title}
          </span>
        </h1>
        <p className="text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed font-light">
          {roadmap.description}
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
        <div className="group p-6 rounded-2xl bg-gradient-to-br from-gray-900/80 to-gray-800/40 border border-gray-700/30 backdrop-blur-sm hover:border-gray-600/50 transition-all duration-500">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
              <Clock className="w-5 h-5 text-blue-400" />
            </div>
            <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider">Duration</h3>
          </div>
          <p className="text-2xl font-bold text-white group-hover:text-gray-100 transition-colors">
            {roadmap.phases.reduce((total, phase) => {
              const weeks = parseInt(phase.duration.split('-')[1] || phase.duration.split(' ')[0]);
              return total + weeks;
            }, 0)} weeks
          </p>
        </div>

        <div className="group p-6 rounded-2xl bg-gradient-to-br from-gray-900/80 to-gray-800/40 border border-gray-700/30 backdrop-blur-sm hover:border-gray-600/50 transition-all duration-500">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
              <Target className="w-5 h-5 text-emerald-400" />
            </div>
            <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider">Phases</h3>
          </div>
          <p className="text-2xl font-bold text-white group-hover:text-gray-100 transition-colors">
            {roadmap.phases.length}
          </p>
        </div>

        <div className="group p-6 rounded-2xl bg-gradient-to-br from-gray-900/80 to-gray-800/40 border border-gray-700/30 backdrop-blur-sm hover:border-gray-600/50 transition-all duration-500">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/20">
              <BookOpen className="w-5 h-5 text-purple-400" />
            </div>
            <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider">Steps</h3>
          </div>
          <p className="text-2xl font-bold text-white group-hover:text-gray-100 transition-colors">
            {totalSteps}
          </p>
        </div>

        <div className="group p-6 rounded-2xl bg-gradient-to-br from-gray-900/80 to-gray-800/40 border border-gray-700/30 backdrop-blur-sm hover:border-gray-600/50 transition-all duration-500">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20">
              <Award className="w-5 h-5 text-amber-400" />
            </div>
            <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider">Topics</h3>
          </div>
          <p className="text-2xl font-bold text-white group-hover:text-gray-100 transition-colors">
            {totalTopics}
          </p>
        </div>
      </div>

      {/* Phases */}
      <div className="space-y-10">
        {roadmap.phases.map((phase, index) => (
          <div 
            key={index}
            className="animate-slide-up"
            style={{ animationDelay: `${index * 200}ms` }}
          >
            <RoadmapPhase 
              phase={phase} 
              phaseNumber={index + 1}
              isLast={index === roadmap.phases.length - 1}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoadmapDisplay;
