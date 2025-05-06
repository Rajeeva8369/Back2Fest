import React, { Suspense, useState } from 'react';
import { motion } from 'framer-motion';
import Layout from './components/Layout';
import LoadingScreen from './components/LoadingScreen';
import FestivalScene from './components/3d/FestivalScene';
import Controls from './components/ui/Controls';
import InfoPanel from './components/ui/InfoPanel';
import StageInfo from './components/ui/StageInfo';
import { FestivalProvider } from './context/FestivalContext';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedStage, setSelectedStage] = useState<string | null>(null);

  const handleStageClick = (stageName: string) => {
    setSelectedStage(stageName === selectedStage ? null : stageName);
  };

  return (
    <FestivalProvider>
      <Layout>
        {!isLoaded && <LoadingScreen onLoaded={() => setIsLoaded(true)} />}
        
        <motion.div 
          className="relative w-full h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        >
          <div className="canvas-container">
            <Suspense fallback={null}>
              <FestivalScene onStageClick={handleStageClick} />
            </Suspense>
          </div>
          
          <div className="ui-container w-full h-full p-4 md:p-6 flex flex-col">
            <div className="flex justify-between items-start">
              <motion.div 
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, delay: 1.2 }}
              >
                <h1 className="text-4xl md:text-6xl font-extrabold gradient-text glow">
                  FREQUENCY
                </h1>
                <p className="text-white/80 ml-1">FESTIVAL 3D EXPERIENCE</p>
              </motion.div>
              
              <Controls />
            </div>
            
            <div className="flex-grow"></div>
            
            {selectedStage && (
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-4"
              >
                <StageInfo stage={selectedStage} onClose={() => setSelectedStage(null)} />
              </motion.div>
            )}
            
            <InfoPanel />
          </div>
        </motion.div>
      </Layout>
    </FestivalProvider>
  );
}

export default App;