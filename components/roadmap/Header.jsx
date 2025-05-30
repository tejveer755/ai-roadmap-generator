// components/roadmap/Header.jsx
import { Progress } from '@/components/ui/progress';
import { ChevronRight, ChevronLeft } from 'lucide-react';

export function RoadmapHeader({ step, total }) {
  return (
    <header className="mb-8 flex items-center justify-between text-stone-200">
      <div className="text-lg font-medium">
        Step {step} of {total}
      </div>
      <div className="flex gap-1">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className={`h-2 w-8 rounded-full ${
              i < step ? 'bg-stone-300' : 'bg-stone-700'
            }`}
          />
        ))}
      </div>
    </header>
  );
}
