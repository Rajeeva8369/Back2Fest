import React, { createContext, useContext, useState, ReactNode } from 'react';

interface FestivalContextType {
  isDayMode: boolean;
  setIsDayMode: (mode: boolean) => void;
  showLabels: boolean;
  setShowLabels: (show: boolean) => void;
  showCrowd: boolean;
  setShowCrowd: (show: boolean) => void;
  cameraPosition: string;
  setCameraPosition: (position: string) => void;
}

const FestivalContext = createContext<FestivalContextType | undefined>(undefined);

export const useFestival = () => {
  const context = useContext(FestivalContext);
  if (!context) {
    throw new Error('useFestival must be used within a FestivalProvider');
  }
  return context;
};

interface FestivalProviderProps {
  children: ReactNode;
}

export const FestivalProvider: React.FC<FestivalProviderProps> = ({ children }) => {
  const [isDayMode, setIsDayMode] = useState(true);
  const [showLabels, setShowLabels] = useState(true);
  const [showCrowd, setShowCrowd] = useState(true);
  const [cameraPosition, setCameraPosition] = useState('overview');

  return (
    <FestivalContext.Provider 
      value={{
        isDayMode,
        setIsDayMode,
        showLabels,
        setShowLabels,
        showCrowd,
        setShowCrowd,
        cameraPosition,
        setCameraPosition
      }}
    >
      {children}
    </FestivalContext.Provider>
  );
};