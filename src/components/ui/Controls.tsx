import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, MapPin, Users, Eye, Camera } from 'lucide-react';
import { useFestival } from '../../context/FestivalContext';

const Controls: React.FC = () => {
  const { 
    isDayMode, 
    setIsDayMode, 
    showLabels, 
    setShowLabels, 
    showCrowd, 
    setShowCrowd,
    cameraPosition,
    setCameraPosition
  } = useFestival();

  const positions = [
    { id: 'overview', label: 'Overview' },
    { id: 'mainstage', label: 'Main Stage' },
    { id: 'electronic', label: 'Electronic' },
    { id: 'camping', label: 'Camping' }
  ];

  return (
    <motion.div 
      className="info-panel p-3 interactive"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 1.5 }}
    >
      <div className="flex flex-col gap-3 mb-3">
        <button 
          onClick={() => setIsDayMode(!isDayMode)} 
          className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
            isDayMode 
              ? 'bg-festival-blue/20 text-white' 
              : 'bg-festival-purple/20 text-white'
          }`}
        >
          {isDayMode ? (
            <>
              <Sun size={18} className="text-festival-blue" />
              <span>Day Mode</span>
            </>
          ) : (
            <>
              <Moon size={18} className="text-festival-purple" />
              <span>Night Mode</span>
            </>
          )}
        </button>

        <button 
          onClick={() => setShowLabels(!showLabels)} 
          className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
            showLabels 
              ? 'bg-festival-pink/20 text-white' 
              : 'bg-gray-800/50 text-gray-300'
          }`}
        >
          <MapPin size={18} className={showLabels ? "text-festival-pink" : "text-gray-400"} />
          <span>Show Labels</span>
        </button>

        <button 
          onClick={() => setShowCrowd(!showCrowd)} 
          className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
            showCrowd 
              ? 'bg-festival-green/20 text-white' 
              : 'bg-gray-800/50 text-gray-300'
          }`}
        >
          <Users size={18} className={showCrowd ? "text-festival-green" : "text-gray-400"} />
          <span>Show Crowd</span>
        </button>
      </div>

      <div className="border-t border-white/10 pt-3">
        <div className="flex items-center gap-2 mb-2">
          <Camera size={16} className="text-festival-yellow" />
          <span className="text-sm text-white/70">Camera Views</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {positions.map(pos => (
            <button
              key={pos.id}
              onClick={() => setCameraPosition(pos.id)}
              className={`px-2 py-1 text-xs rounded transition-all ${
                cameraPosition === pos.id
                  ? 'bg-festival-yellow/30 text-white'
                  : 'bg-gray-800/30 text-gray-300 hover:bg-gray-700/30'
              }`}
            >
              {pos.label}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Controls;