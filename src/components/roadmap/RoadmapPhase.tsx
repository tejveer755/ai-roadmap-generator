
import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Clock, Target, CheckCircle } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import RoadmapStep from './RoadmapStep';

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

interface RoadmapPhaseProps {
  phase: Phase;
  phaseNumber: number;
  isLast: boolean;
}

const RoadmapPhase = ({ phase, phaseNumber, isLast }: RoadmapPhaseProps) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="relative">
      {/* Connection Line */}
      {!isLast && (
        <div className="absolute left-8 top-32 w-px h-full bg-gradient-to-b from-gray-600/50 via-gray-700/30 to-transparent z-0" />
      )}
      
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <div className="relative z-10">
          {/* Phase Header */}
          <CollapsibleTrigger className="w-full group">
            <div className="flex items-start gap-8 p-8 rounded-3xl bg-gradient-to-br from-gray-900/60 to-gray-800/30 border border-gray-700/40 backdrop-blur-sm hover:border-gray-600/60 hover:from-gray-900/80 hover:to-gray-800/50 transition-all duration-500 shadow-2xl">
              {/* Phase Number */}
              <div className="flex-shrink-0 relative">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-white to-gray-300 flex items-center justify-center font-bold text-xl text-gray-900 shadow-lg group-hover:scale-105 transition-transform duration-300">
                  {phaseNumber}
                </div>
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-white/20 to-gray-300/20 blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              {/* Phase Info */}
              <div className="flex-1 text-left">
                <div className="flex items-center gap-4 mb-4">
                  <h2 className="text-3xl font-bold text-white group-hover:text-gray-100 transition-colors duration-300">
                    {phase.title}
                  </h2>
                  <div className="transition-transform duration-300 group-hover:scale-110">
                    {isOpen ? (
                      <ChevronDown className="w-6 h-6 text-gray-400 group-hover:text-gray-300" />
                    ) : (
                      <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-gray-300" />
                    )}
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6 text-sm">
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-800/40 border border-gray-700/30 backdrop-blur-sm">
                    <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
                      <Clock className="w-4 h-4 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Duration</p>
                      <p className="text-white font-medium">{phase.duration}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-800/40 border border-gray-700/30 backdrop-blur-sm">
                    <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                      <Target className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Goal</p>
                      <p className="text-white font-medium">{phase.goal}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CollapsibleTrigger>

          {/* Phase Content */}
          <CollapsibleContent className="mt-8">
            <div className="ml-8 pl-8 space-y-8 border-l border-gray-700/30">
              {phase.steps.map((step, stepIndex) => (
                <div 
                  key={stepIndex}
                  className="animate-fade-in"
                  style={{ animationDelay: `${stepIndex * 100}ms` }}
                >
                  <RoadmapStep 
                    step={step} 
                    stepNumber={stepIndex + 1}
                  />
                </div>
              ))}
            </div>
          </CollapsibleContent>
        </div>
      </Collapsible>
    </div>
  );
};

export default RoadmapPhase;
