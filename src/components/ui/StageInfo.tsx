import React from 'react';
import { motion } from 'framer-motion';
import { X, Calendar, Clock, Music, Users } from 'lucide-react';

interface StageInfoProps {
  stage: string;
  onClose: () => void;
}

const stageData: Record<string, {
  name: string;
  description: string;
  genre: string;
  capacity: string;
  schedule: Array<{time: string, artist: string}>;
  image: string;
}> = {
  mainstage: {
    name: "Main Stage",
    description: "The heart of Frequency Festival featuring headline acts and spectacular production.",
    genre: "Pop, Rock, Hip Hop",
    capacity: "35,000+",
    schedule: [
      { time: "18:00 - 19:00", artist: "The Strokes" },
      { time: "19:30 - 20:30", artist: "Billie Eilish" },
      { time: "21:00 - 22:30", artist: "Arctic Monkeys" },
      { time: "23:00 - 00:30", artist: "Kendrick Lamar" }
    ],
    image: "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  electronic: {
    name: "Electronic Stage",
    description: "Pulsating beats and electronic music in a tent setting with immersive light shows.",
    genre: "Techno, House, EDM",
    capacity: "15,000",
    schedule: [
      { time: "18:00 - 19:30", artist: "Disclosure" },
      { time: "20:00 - 21:30", artist: "Honey Dijon" },
      { time: "22:00 - 23:30", artist: "Bonobo" },
      { time: "00:00 - 02:00", artist: "Four Tet" }
    ],
    image: "https://images.pexels.com/photos/2147029/pexels-photo-2147029.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  indie: {
    name: "Indie Stage",
    description: "A more intimate setting showcasing emerging talent and alternative music.",
    genre: "Indie Rock, Alternative",
    capacity: "8,000",
    schedule: [
      { time: "17:30 - 18:15", artist: "Wet Leg" },
      { time: "18:45 - 19:30", artist: "Girl in Red" },
      { time: "20:00 - 21:00", artist: "Fontaines D.C." },
      { time: "21:30 - 22:30", artist: "Mitski" }
    ],
    image: "https://images.pexels.com/photos/1154189/pexels-photo-1154189.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  camping: {
    name: "Camping Area",
    description: "Home away from home for festival attendees with facilities and smaller events.",
    genre: "Various",
    capacity: "20,000 campers",
    schedule: [
      { time: "10:00 - 12:00", artist: "Morning Yoga" },
      { time: "14:00 - 16:00", artist: "DJ Workshops" },
      { time: "16:30 - 18:00", artist: "Acoustic Sessions" },
      { time: "22:00 - 00:00", artist: "Silent Disco" }
    ],
    image: "https://images.pexels.com/photos/2662816/pexels-photo-2662816.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  }
};

const StageInfo: React.FC<StageInfoProps> = ({ stage, onClose }) => {
  const stageInfo = stageData[stage] || stageData.mainstage;

  return (
    <motion.div 
      className="info-panel p-4 md:p-5 max-w-2xl w-full mx-auto interactive"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-white text-xl md:text-2xl font-bold">{stageInfo.name}</h3>
        <button 
          onClick={onClose}
          className="text-white/60 hover:text-white transition-colors bg-black/30 rounded-full p-1"
        >
          <X size={20} />
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-4">
          <p className="text-white/80">{stageInfo.description}</p>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2">
              <Music size={18} className="text-festival-pink" />
              <div>
                <p className="text-white/60 text-xs">Genre</p>
                <p className="text-white text-sm">{stageInfo.genre}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Users size={18} className="text-festival-blue" />
              <div>
                <p className="text-white/60 text-xs">Capacity</p>
                <p className="text-white text-sm">{stageInfo.capacity}</p>
              </div>
            </div>
          </div>
          
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Calendar size={18} className="text-festival-green" />
              <p className="text-white/80 text-sm font-medium">Schedule</p>
            </div>
            
            <div className="space-y-2">
              {stageInfo.schedule.map((slot, index) => (
                <div key={index} className="flex items-center gap-3 text-sm">
                  <div className="flex items-center gap-1 min-w-[115px]">
                    <Clock size={14} className="text-white/40" />
                    <span className="text-white/60">{slot.time}</span>
                  </div>
                  <span className="text-white font-medium">{slot.artist}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="h-48 md:h-full overflow-hidden rounded-lg">
          <img 
            src={stageInfo.image} 
            alt={stageInfo.name} 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default StageInfo;