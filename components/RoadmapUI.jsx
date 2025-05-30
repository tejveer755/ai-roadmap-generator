import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, BookOpen, PlayCircle, FileText, Globe } from 'lucide-react'; // Icons for resources
import AnimatedBackground from './AnimatedBackground'; // Assuming this component provides a suitable background

// Helper component for individual topics with accordion functionality
const TopicAccordion = ({ topic }) => {
    const [isOpen, setIsOpen] = useState(false);

    // Function to determine the appropriate icon based on resource type
    const getResourceIcon = (type) => {
        switch (type.toLowerCase()) {
            case 'video': return <PlayCircle className="inline-block mr-2 h-4 w-4 text-purple-400" />;
            case 'course': return <BookOpen className="inline-block mr-2 h-4 w-4 text-blue-400" />;
            case 'article': return <FileText className="inline-block mr-2 h-4 w-4 text-green-400" />;
            case 'tutorial': return <Globe className="inline-block mr-2 h-4 w-4 text-yellow-400" />;
            default: return <Globe className="inline-block mr-2 h-4 w-4 text-stone-400" />;
        }
    };

    return (
        <motion.div
            className="bg-stone-500/5 border border-stone-700 rounded-xl mb-4 overflow-hidden shadow-lg backdrop-blur-sm"
            initial={false}
            // animate={{ backgroundColor: isOpen ? 'rgba(38, 38, 38, 0.7)' : 'rgba(28, 28, 28, 0.5)' }}
            transition={{ duration: 0.3 }}
        >
            <button
                className="w-full flex justify-between items-center p-5 text-left text-stone-100 font-semibold text-lg md:text-xl hover:bg-stone-500/20 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                onClick={() => setIsOpen(!isOpen)}
            >
                {topic.title}
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <ChevronDown className="h-6 w-6 text-stone-400" />
                </motion.div>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="px-5 pb-5 pt-2"
                    >
                        {topic.notes && (
                            <p className="text-stone-300 text-base mb-4 italic border-l-2 border-blue-500 pl-3">
                                {topic.notes}
                            </p>
                        )}

                        <h5 className="text-md font-medium text-stone-200 mb-2">Key Subtopics:</h5>
                        <ul className="list-disc list-inside text-stone-400 ml-4 mb-5 space-y-1">
                            {topic.subtopics.map((sub, idx) => (
                                <li key={idx} className="text-sm md:text-base">{sub}</li>
                            ))}
                        </ul>

                        <h5 className="text-md font-medium text-stone-200 mb-2">Recommended Resources:</h5>
                        <div className="space-y-3">
                            {topic.resources.map((res, ridx) => (
                                <a
                                    key={ridx}
                                    href={res.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center text-blue-400 hover:text-blue-300 hover:underline text-sm md:text-base transition-colors duration-200 group"
                                >
                                    {getResourceIcon(res.type)}
                                    <span className="group-hover:text-blue-300">{res.title}</span>
                                    <span className="ml-2 text-xs text-stone-500">({res.type})</span>
                                    <span className="ml-auto text-stone-500 group-hover:text-stone-400 transition-colors duration-200">
                                        &rarr;
                                    </span>
                                </a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

// Main Roadmap UI Component
function RoadmapUI({ data }) {
    // Animation variants for staggered appearance
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    };

    return (
        <motion.div
            key="roadmap-container"
            initial="hidden"
            animate="show"
            variants={containerVariants}
            className="relative min-h-screen  text-stone-100 overflow-hidden py-12"
        >
            <AnimatedBackground /> {/* This should provide the dynamic background */}

            <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
                <motion.h1
                    variants={itemVariants}
                    className="text-4xl md:text-5xl font-extrabold mb-4 text-center bg-gradient-to-r from-blue-300 via-purple-300 to-blue-300 bg-clip-text text-transparent leading-tight"
                >
                    {data.title}
                </motion.h1>
                <motion.p
                    variants={itemVariants}
                    className="text-lg md:text-xl text-stone-300 mb-12 text-center max-w-3xl mx-auto"
                >
                    {data.description}
                </motion.p>

                <div className="relative space-y-16 md:space-y-20">
                    {data.phases.map((phase, i) => (
                        <motion.div
                            key={i}
                            variants={itemVariants}
                            className="flex flex-col md:flex-row items-start md:items-stretch gap-6 md:gap-10"
                        >
                            {/* Phase Indicator */}
                            {/* <div className="flex flex-col items-center md:items-end md:w-1/6 lg:w-1/12 text-right relative pt-2">
                                <div className="relative z-10 w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-purple-700 text-white font-bold text-xl shadow-xl ring-2 ring-blue-500 ring-opacity-50">
                                    {i + 1}
                                </div>
                                {i < data.phases.length - 1 && (
                                    <div className="absolute top-20 left-18 transform -translate-x-1/2   h-full w-0.5 bg-gradient-to-b from-blue-500 to-purple-600 animate-pulse-line"></div>
                                )}
                            </div> */}

                            {/* Phase Content */}
                            <div className="flex-1 bg-stone-500/10 border border-stone-700 rounded-2xl p-6 md:p-8 shadow-2xl backdrop-blur-md relative overflow-hidden group">
                                {/* Subtle glowing border on hover */}
                                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-blue-500 transition-all duration-300 ease-out pointer-events-none"></div>

                                <h2 className="text-2xl md:text-3xl font-bold text-stone-50 mb-2">
                                    {phase.title}{' '}
                                    <span className="text-base text-stone-400 font-normal">
                                        ({phase.duration})
                                    </span>
                                </h2>
                                <p className="text-stone-300 text-base md:text-lg mb-6">
                                    {phase.goal}
                                </p>

                                <div className="space-y-6">
                                    {phase.steps.map((step, j) => (
                                        <motion.div
                                            key={j}
                                            variants={itemVariants}
                                            className="relative pl-6 md:pl-8 before:content-[''] before:absolute before:left-0 before:top-2 before:h-4 before:w-4 before:rounded-full before:bg-blue-500 before:shadow-lg before:shadow-blue-500/30"
                                        >
                                            <h3 className="text-xl md:text-2xl font-semibold text-stone-100 mb-3">
                                                {step.title}
                                            </h3>

                                            <div className="space-y-3">
                                                {step.topics.map((topic, k) => (
                                                    <TopicAccordion key={k} topic={topic} />
                                                ))}
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
           
        </motion.div>
    );
}

export default RoadmapUI;
