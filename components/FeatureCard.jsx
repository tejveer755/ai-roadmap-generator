
import React from 'react';


const FeatureCard = ({ icon, title, description, delay = '' }) => {
  return (
    <div className={`group relative p-6 rounded-2xl bg-gray-900/50 border border-gray-800/50 backdrop-blur-sm hover:bg-gray-800/50 transition-all duration-500 animate-slide-up ${delay}`}>
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-10">
        <div className="mb-4 text-gray-300 group-hover:text-white transition-colors duration-300">
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-gray-100 transition-colors duration-300">
          {title}
        </h3>
        <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
          {description}
        </p>
      </div>
    </div>
  );
};

export default FeatureCard;
