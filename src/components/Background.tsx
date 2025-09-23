/* eslint-disable react/no-unescaped-entities */

import React from 'react';
import { motion } from 'framer-motion';

interface BackgroundProps {
  currentSection: number;
}

const Background: React.FC<BackgroundProps> = ({ currentSection }) => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20"
        animate={{ opacity: currentSection === 0 ? 0.7 : 0.2 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-green-900/20 via-teal-900/20 to-cyan-900/20"
        animate={{ opacity: currentSection === 1 ? 0.7 : 0.2 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-orange-900/20 via-red-900/20 to-pink-900/20"
        animate={{ opacity: currentSection === 2 ? 0.7 : 0.2 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-blue-900/20 to-purple-900/20"
        animate={{ opacity: currentSection === 3 ? 0.7 : 0.2 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      />
      {/* Sticky notes with quotes/tags/stats - hidden on small screens */}
      <div className="sticky-note absolute top-20 left-10 w-40 h-32 p-3 opacity-60 text-xs font-medium hidden md:block">
        "Design is not just what it looks like and feels like. Design is how it works." – Steve Jobs
      </div>
      <div className="sticky-note absolute top-40 right-20 w-36 h-28 p-3 opacity-50 text-xs hidden lg:block">
        <div className="font-bold text-sm mb-1">#UX #Product</div>
        <div>5+ years experience</div>
        <div>40% user growth</div>
      </div>
      <div className="sticky-note absolute bottom-32 left-1/4 w-32 h-24 p-3 opacity-70 text-xs hidden sm:block">
        Vision<br/>
        Strategy<br/>
        Impact
      </div>
      <div className="sticky-note absolute bottom-20 right-1/3 w-44 h-36 p-3 opacity-55 text-xs hidden md:block">
        <div className="font-bold text-sm mb-2">Quick Stats</div>
        <div>• 10+ projects launched</div>
        <div>• 50k+ users impacted</div>
        <div>• 3 awards won</div>
      </div>
      <div className="sticky-note absolute top-1/2 left-1/2 w-28 h-20 p-3 opacity-65 text-xs transform -translate-x-1/2 -translate-y-1/2 hidden xl:block">
        "Less is more"
      </div>
      <div className="sticky-note absolute top-10 right-1/4 w-38 h-30 p-3 opacity-45 text-xs hidden lg:block">
        <div className="font-bold text-sm mb-1">Skills</div>
        <div>Figma • Sketch</div>
        <div>React • Node.js</div>
        <div>Data Analysis</div>
      </div>
      <div className="sticky-note absolute bottom-40 left-20 w-42 h-34 p-3 opacity-50 text-xs hidden md:block">
        "The best way to predict the future is to create it." – Peter Drucker
      </div>

      {/* UI Sketches */}
      <svg className="absolute top-10 right-10 w-40 h-40 opacity-20" viewBox="0 0 100 100">
        <rect x="10" y="10" width="80" height="60" fill="none" stroke="currentColor" strokeWidth="1"/>
        <rect x="15" y="15" width="70" height="10" fill="none" stroke="currentColor" strokeWidth="1"/>
        <circle cx="20" cy="25" r="2" fill="currentColor"/>
        <circle cx="25" cy="25" r="2" fill="currentColor"/>
        <circle cx="30" cy="25" r="2" fill="currentColor"/>
      </svg>

      <svg className="absolute bottom-40 right-20 w-32 h-32 opacity-15" viewBox="0 0 100 100">
        <rect x="5" y="5" width="90" height="90" fill="none" stroke="currentColor" strokeWidth="1" rx="5"/>
        <rect x="10" y="10" width="80" height="20" fill="none" stroke="currentColor" strokeWidth="1"/>
        <rect x="10" y="35" width="80" height="5" fill="none" stroke="currentColor" strokeWidth="1"/>
        <rect x="10" y="45" width="80" height="5" fill="none" stroke="currentColor" strokeWidth="1"/>
        <rect x="10" y="55" width="80" height="5" fill="none" stroke="currentColor" strokeWidth="1"/>
      </svg>
    </div>
  );
};

export default Background;