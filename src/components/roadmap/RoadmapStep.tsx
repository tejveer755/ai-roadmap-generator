
import React, { useState } from 'react';
import { Book, ChevronDown, ChevronRight, Hash } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import TopicCard from './TopicCard';

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

interface RoadmapStepProps {
  step: Step;
  stepNumber: number;
}

const RoadmapStep = ({ step, stepNumber }: RoadmapStepProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger className="w-full group">
        <div className="flex items-center gap-6 p-6 rounded-2xl bg-gradient-to-r from-gray-800/40 to-gray-700/20 border border-gray-700/40 hover:border-gray-600/60 hover:from-gray-800/60 hover:to-gray-700/40 transition-all duration-500 backdrop-blur-sm shadow-lg">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gray-700 to-gray-800 border border-gray-600/50 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
              <Hash className="w-4 h-4 text-gray-300" />
            </div>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30 flex items-center justify-center">
              <Book className="w-4 h-4 text-blue-400" />
            </div>
          </div>
          
          <div className="flex-1 text-left">
            <h3 className="text-lg font-semibold text-white group-hover:text-gray-100 transition-colors duration-300">
              {step.title}
            </h3>
            <p className="text-sm text-gray-400 mt-1">
              {step.topics.length} {step.topics.length === 1 ? 'topic' : 'topics'} to master
            </p>
          </div>
          
          <div className="transition-transform duration-300 group-hover:scale-110">
            {isOpen ? (
              <ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-gray-300" />
            ) : (
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-300" />
            )}
          </div>
        </div>
      </CollapsibleTrigger>

      <CollapsibleContent className="mt-6">
        <div className="ml-6 space-y-6">
          {step.topics.map((topic, topicIndex) => (
            <div 
              key={topicIndex}
              className="animate-slide-up"
              style={{ animationDelay: `${topicIndex * 100}ms` }}
            >
              <TopicCard topic={topic} />
            </div>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default RoadmapStep;
