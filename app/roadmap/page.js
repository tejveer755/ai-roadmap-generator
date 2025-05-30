'use client'

import { useState, useEffect, useRef } from 'react'
import QuestionCard from '@/components/roadmap/QuestionCard'
import { RoadmapHeader } from '@/components/roadmap/Header'
import { motion, AnimatePresence } from 'framer-motion'
import RoadmapUI from '@/components/RoadmapUI'

export default function RoadmapGenerator() {
  const [step, setStep] = useState(1)
  const [responses, setResponses] = useState({
    careerGoal: '',
    motivation: '',                // renamed from “purpose”
    skillLevel: '',
    academicBackground: '',         // renamed from “background”
    weeklyTimeCommitment: '',       // renamed from “timeCommitment”
    learningStyle: '',
    availableResources: '',
    assessmentMethods: '',
    potentialChallenges: ''
  });
  const [showRoadmap, setShowRoadmap] = useState(false)
  const [roadmapData, setRoadmapData] = useState(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [progress, setProgress] = useState(0)
  const progressRef = useRef(null)
  const totalSteps = 5

  useEffect(() => { }, [step])

  const handleResponse = (field, value) => {
    setResponses(prev => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    // If not last question, go to next
    if (step < totalSteps) {
      setStep(s => s + 1)
    } else {
      // Last question: generate roadmap
      generateRoadmap()
    }
  }
  const handleBack = () => step > 1 && setStep(s => s - 1)

  const generateRoadmap = async () => {
    setIsGenerating(true)
    progressRef.current = setInterval(() => setProgress(p => Math.min(p + 10, 90)), 300)
    try {
      const payload = {
        goal: responses.careerGoal,
        purpose: responses.purpose,
        level: responses.skillLevel,
        experience: responses.background,
        timeframe: responses.timeCommitment,
      }
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      console.log("AI data ", data);
      setRoadmapData(data)
      console.log(data);
      
      setShowRoadmap(true)
      setProgress(100)
    } catch (e) {
      console.error('Fetch error:', e)
    } finally {
      clearInterval(progressRef.current)
      setIsGenerating(false)
    }
  }

  return (
    <main className="min-h-screen  text-stone-100 p-6">
      <AnimatePresence mode="wait">
        {!showRoadmap ? (
          step <= totalSteps && (
            <div className='max-w-3xl mx-auto'>
              <RoadmapHeader step={Math.min(step, totalSteps)} total={totalSteps} />

              <QuestionCard
                key={step}
                step={step}
                responses={responses}
                onRespond={handleResponse}
                onNext={handleNext}
                onBack={handleBack}
                isLast={step === totalSteps}
                isGenerating={isGenerating}
                progress={progress}
              />
            </div>
          )
        ) : (
          <RoadmapUI data={roadmapData} />
        )}
      </AnimatePresence>
    </main>
  )
}
