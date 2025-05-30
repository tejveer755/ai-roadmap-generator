
import React, { useState } from 'react';
import { ExternalLink, FileText, Play, BookOpen, Globe, ChevronDown, ChevronRight, Lightbulb } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

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

interface TopicCardProps {
  topic: Topic;
}

const getResourceIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case 'video':
      return <Play className="w-4 h-4" />;
    case 'article':
      return <FileText className="w-4 h-4" />;
    case 'course':
      return <BookOpen className="w-4 h-4" />;
    case 'interactive':
      return <Globe className="w-4 h-4" />;
    default:
      return <ExternalLink className="w-4 h-4" />;
  }
};

const getResourceColor = (type: string) => {
  switch (type.toLowerCase()) {
    case 'video':
      return 'text-red-400 bg-red-500/10 border-red-500/20 hover:bg-red-500/20';
    case 'article':
      return 'text-blue-400 bg-blue-500/10 border-blue-500/20 hover:bg-blue-500/20';
    case 'course':
      return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20 hover:bg-emerald-500/20';
    case 'interactive':
      return 'text-purple-400 bg-purple-500/10 border-purple-500/20 hover:bg-purple-500/20';
    default:
      return 'text-gray-400 bg-gray-500/10 border-gray-500/20 hover:bg-gray-500/20';
  }
};

const TopicCard = ({ topic }: TopicCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className="bg-gradient-to-br from-gray-900/40 to-gray-800/20 border-gray-700/40 hover:border-gray-600/60 transition-all duration-500 backdrop-blur-sm shadow-xl group">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl text-white group-hover:text-gray-100 transition-colors duration-300 flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-emerald-400 to-blue-400"></div>
            {topic.title}
          </CardTitle>
          <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
            <CollapsibleTrigger className="p-2 rounded-lg hover:bg-gray-700/30 transition-colors duration-300">
              {isExpanded ? (
                <ChevronDown className="w-4 h-4 text-gray-400 hover:text-gray-300 transition-colors" />
              ) : (
                <ChevronRight className="w-4 h-4 text-gray-400 hover:text-gray-300 transition-colors" />
              )}
            </CollapsibleTrigger>
          </Collapsible>
        </div>
        
        {/* Subtopics */}
        <div className="flex flex-wrap gap-2 mt-4">
          {topic.subtopics.map((subtopic, index) => (
            <span 
              key={index}
              className="px-3 py-1.5 text-xs rounded-full bg-gray-800/60 border border-gray-700/60 text-gray-300 hover:bg-gray-700/60 hover:text-gray-200 transition-all duration-300 backdrop-blur-sm"
            >
              {subtopic}
            </span>
          ))}
        </div>
      </CardHeader>

      <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
        <CollapsibleContent>
          <CardContent className="pt-0 space-y-6">
            {/* Notes */}
            {topic.notes && (
              <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/5 to-orange-500/5 border border-amber-500/20 backdrop-blur-sm">
                <div className="flex items-start gap-3">
                  <div className="p-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 mt-0.5">
                    <Lightbulb className="w-4 h-4 text-amber-400" />
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-amber-200 mb-1">Learning Note</h5>
                    <p className="text-sm text-amber-200/80 leading-relaxed">
                      {topic.notes}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Resources */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wider flex items-center gap-2">
                <div className="w-1 h-4 bg-gradient-to-b from-blue-400 to-purple-400 rounded-full"></div>
                Learning Resources
              </h4>
              <div className="grid gap-3">
                {topic.resources.map((resource, index) => (
                  <a
                    key={index}
                    href={resource.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/resource flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-gray-800/40 to-gray-700/20 border border-gray-700/40 hover:border-gray-600/60 hover:from-gray-800/60 hover:to-gray-700/40 transition-all duration-500 backdrop-blur-sm"
                  >
                    <div className={`p-3 rounded-xl border transition-all duration-300 ${getResourceColor(resource.type)}`}>
                      {getResourceIcon(resource.type)}
                    </div>
                    <div className="flex-1">
                      <h5 className="font-medium text-white group-hover/resource:text-gray-100 transition-colors duration-300">
                        {resource.title}
                      </h5>
                      <p className="text-sm text-gray-400 capitalize">{resource.type}</p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-gray-400 group-hover/resource:text-gray-300 transition-all duration-300 group-hover/resource:scale-110" />
                  </a>
                ))}
              </div>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};

export default TopicCard;
