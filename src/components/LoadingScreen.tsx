import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Music } from 'lucide-react';

interface LoadingScreenProps {
  onLoaded: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoaded }) => {
  const [progress, setProgress] = useState(0);
  const loadingTexts = [
    "Setting up festival grounds...",
    "Placing stages...",
    "Adding lighting effects...",
    "Inviting virtual crowds...",
    "Tuning sound systems...",
    "Preparing for an unforgettable experience..."
  ];
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 10;
        return newProgress > 100 ? 100 : newProgress;
      });
    }, 300);

    const textInterval = setInterval(() => {
      setCurrentTextIndex(prev => (prev + 1) % loadingTexts.length);
    }, 2000);

    return () => {
      clearInterval(interval);
      clearInterval(textInterval);
    };
  }, []);

  useEffect(() => {
    if (progress === 100) {
      const timeout = setTimeout(() => {
        onLoaded();
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [progress, onLoaded]);

  return (
    <motion.div 
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#090420] text-white"
      initial={{ opacity: 1 }}
      animate={{ opacity: progress === 100 ? 0 : 1 }}
      transition={{ duration: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="relative">
          <Music size={80} className="text-festival-pink" />
          <motion.div
            className="absolute inset-0"
            animate={{ 
              boxShadow: ["0 0 0 0px rgba(255, 45, 159, 0)", "0 0 0 20px rgba(255, 45, 159, 0)"]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatType: "loop"
            }}
          />
        </div>
      </motion.div>
      
      <h1 className="text-5xl font-extrabold gradient-text glow mb-2">FREQUENCY</h1>
      <p className="text-lg text-white/70 mb-8">FESTIVAL 3D EXPERIENCE</p>
      
      <div className="w-80 md:w-96 mb-6">
        <div className="loading-bar rounded-full" style={{ width: `${progress}%` }}></div>
      </div>
      
      <motion.p 
        key={currentTextIndex}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.5 }}
        className="text-white/60 text-center"
      >
        {loadingTexts[currentTextIndex]}
      </motion.p>
      
      <p className="absolute bottom-6 text-sm text-white/40">
        {Math.floor(progress)}% loaded
      </p>
    </motion.div>
  );
};

export default LoadingScreen;