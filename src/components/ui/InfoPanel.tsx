import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Info, X, ExternalLink } from 'lucide-react';

const InfoPanel: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="absolute bottom-4 right-4">
      {isOpen ? (
        <motion.div
          className="info-panel p-4 w-80 max-h-96 overflow-y-auto interactive"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-white text-lg font-semibold">About Frequency Festival</h3>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white/60 hover:text-white transition-colors"
            >
              <X size={18} />
            </button>
          </div>
          
          <div className="space-y-4 text-white/80 text-sm">
            <p>
              Frequency Festival is one of Austria's most popular music festivals, taking place in St. Pölten.
              It features a diverse range of music genres including electronic, rock, hip hop, and pop.
            </p>
            
            <div>
              <h4 className="text-white font-medium mb-1">Festival Highlights:</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Multiple stages with different music themes</li>
                <li>International lineup of artists and DJs</li>
                <li>Camping areas for festival-goers</li>
                <li>Food and drink villages</li>
                <li>Art installations and activities</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-medium mb-1">3D Mockup Navigation:</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Use the controls in the top right to change views</li>
                <li>Click on stage markers to view stage information</li>
                <li>Switch between day and night modes</li>
                <li>Explore different camera angles of the festival grounds</li>
              </ul>
            </div>
            
            <a 
              href="https://www.frequency.at" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-festival-blue hover:text-festival-pink transition-colors"
            >
              Visit Official Website <ExternalLink size={14} />
            </a>
          </div>
        </motion.div>
      ) : (
        <motion.button
          onClick={() => setIsOpen(true)}
          className="w-12 h-12 rounded-full bg-festival-purple/80 text-white flex items-center justify-center 
                   hover:bg-festival-purple transition-colors shadow-lg interactive"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Info />
        </motion.button>
      )}
    </div>
  );
};

export default InfoPanel;