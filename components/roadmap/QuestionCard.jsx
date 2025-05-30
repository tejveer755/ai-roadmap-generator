import { useState, useEffect } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Progress } from '@/components/ui/progress';

export default function QuestionCard({
  step,
  responses,
  onRespond,
  onNext,
  onBack,
  isLast,
  isGenerating,
  progress,
}) {
  const questions = [
    {
      id: 1,
      title: 'What do you want to become?',
      description: 'Select your career goal or enter a custom one.',
      options: ['Data Scientist', 'ML Engineer', 'AI Researcher', 'Software Developer', 'Product Manager'],
      field: 'careerGoal',
    },
    {
      id: 2,
      title: 'What is your purpose?',
      description: 'Why are you interested in this career path?',
      options: ['Better Jobs', 'Personal Interest', 'Research', 'Entrepreneurship', 'Industry Demand'],
      field: 'purpose',
    },
    {
      id: 3,
      title: 'Current skill level?',
      description: 'Rate your knowledge level.',
      options: ['Beginner', 'Intermediate', 'Advanced', 'Expert'],
      field: 'skillLevel',
    },
    {
      id: 4,
      title: 'Academic background?',
      description: 'Select your major/field.',
      options: ['CS', 'Engineering', 'Mathematics', 'Business', 'Other STEM', 'Non-STEM'],
      field: 'background',
    },
    {
      id: 5,
      title: 'Weekly time commitment?',
      description: 'Select your learning hours.',
      options: ['5-10h', '10-20h', '20-30h', '30+h'],
      field: 'timeCommitment',
    },
  ];

  const q = questions[step - 1];
  const value = responses[q.field] || '';
  const selected = value ? [value.trim()] : [];
  const [error, setError] = useState('');

  useEffect(() => {
    if (value.trim()) setError('');
  }, [value]);

  const handleTag = (tag) => {
    const newValue = selected.includes(tag) ? '' : tag;
    onRespond(q.field, newValue);
  };

  const handleInputChange = (e) => onRespond(q.field, e.target.value);

  const handleNext = () => {
    if (!value.trim()) {
      setError('Please select or enter a response.');
      return;
    }
    onNext();
  };

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    enter: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
    exit: { opacity: 0, y: -30, transition: { duration: 0.3, ease: 'easeIn' } },
  };

  const badgeVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  return (
    <AnimatePresence mode="wait">
      {isLast && isGenerating ? (
        <motion.div
          key="loader"
          className="flex flex-col items-center justify-center min-h-[300px] p-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.4 }}
        >
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.8, 1, 0.9], y: 0 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent mb-6 text-center"
          >
            Crafting Your Personalized Roadmap...
          </motion.h2>
          <Progress value={progress} className="w-full max-w-lg mt-4 h-3 bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-600"
              style={{ width: `${progress}%` }}
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1 }}
            />
          </Progress>
          <p className="text-gray-400 text-sm mt-3 animate-pulse">This might take a moment...</p>
        </motion.div>
      ) : (
        <motion.div
          key={step}
          variants={cardVariants}
          initial="hidden"
          animate="enter"
          exit="exit"
          className="w-full max-w-2xl mx-auto"
        >
          <Card className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-gray-700 rounded-2xl shadow-2xl overflow-hidden">
            <CardHeader className="p-8 border-b border-gray-700">
              <CardTitle className="text-3xl font-extrabold text-white mb-2 tracking-tight">
                {q.title}
              </CardTitle>
              <CardDescription className="text-gray-300 text-lg">
                {q.description}
              </CardDescription>
            </CardHeader>

            <CardContent className="p-8">
              <div className="flex flex-wrap gap-4 mb-8">
                {q.options.map((opt) => (
                  <motion.div
                    key={opt}
                    variants={badgeVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <Badge
                      variant="outline"
                      className={`
                        cursor-pointer text-base font-medium px-5 py-3 rounded-full shadow-md transition-all duration-200 ease-in-out
                        ${selected.includes(opt)
                          ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-transparent shadow-lg'
                          : 'bg-gray-700/40 border-gray-600 text-gray-200 hover:bg-gray-700/60 hover:border-indigo-500'}
                      `}
                      onClick={() => handleTag(opt)}
                    >
                      {opt}
                    </Badge>
                  </motion.div>
                ))}
              </div>

              <Input
                placeholder="Or type your own..."
                value={value}
                onChange={handleInputChange}
                className="bg-gray-700/50 border border-gray-600 text-gray-100 placeholder-gray-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-lg p-4 text-base transition-shadow duration-200 ease-in-out shadow-inner focus:shadow-outline"
              />
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </CardContent>

            <CardFooter className="flex justify-between p-8 border-t border-gray-700">
              <Button
                variant="ghost"
                onClick={onBack}
                disabled={step === 1}
                className="flex items-center gap-2 px-6 py-3 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-200"
              >
                <ChevronLeft className="h-5 w-5" /> Back
              </Button>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Button
                  onClick={handleNext}
                  disabled={isGenerating}
                  className="flex items-center gap-2 px-8 py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-700 text-white font-semibold shadow-lg hover:from-indigo-700 hover:to-purple-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLast ? 'Generate Roadmap' : 'Next'} <ChevronRight className="h-5 w-5" />
                </Button>
              </motion.div>
            </CardFooter>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
