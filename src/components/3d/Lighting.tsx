import React from 'react';
import { SpotLight } from '@react-three/drei';
import * as THREE from 'three';

interface LightingProps {
  isDayMode: boolean;
}

const Lighting: React.FC<LightingProps> = ({ isDayMode }) => {
  return (
    <>
      {/* Ambient light - overall scene illumination */}
      <ambientLight 
        intensity={isDayMode ? 1 : 0.2} 
        color={isDayMode ? '#f9f9f9' : '#0a0a20'} 
      />
      
      {/* Directional light - simulates sun/moon */}
      <directionalLight
        position={isDayMode ? [50, 100, 50] : [20, 50, 20]}
        intensity={isDayMode ? 2 : 0.1}
        color={isDayMode ? '#fff6e5' : '#2c2c70'}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={500}
        shadow-camera-left={-100}
        shadow-camera-right={100}
        shadow-camera-top={100}
        shadow-camera-bottom={-100}
      />
      
      {/* Stage lights */}
      {!isDayMode && (
        <>
          {/* Main stage lights */}
          <SpotLight
            position={[-20, 30, -30]}
            angle={0.5}
            penumbra={0.5}
            intensity={10}
            color="#ff2d9f"
            castShadow
            target-position={[0, 0, -40]}
          />
          
          <SpotLight
            position={[20, 30, -30]}
            angle={0.5}
            penumbra={0.5}
            intensity={10}
            color="#00d0ff"
            castShadow
            target-position={[0, 0, -40]}
          />
          
          {/* Electronic stage light */}
          <SpotLight
            position={[-60, 20, 30]}
            angle={0.6}
            penumbra={0.5}
            intensity={8}
            color="#6937ff"
            castShadow
            target-position={[-60, 0, 20]}
          />
          
          {/* Indie stage light */}
          <SpotLight
            position={[40, 20, 40]}
            angle={0.6}
            penumbra={0.5}
            intensity={8}
            color="#07ff5e"
            castShadow
            target-position={[40, 0, 30]}
          />
          
          {/* Camping area lights - more ambient */}
          <pointLight
            position={[0, 15, 80]}
            intensity={5}
            color="#ffeb3b"
            distance={120}
            decay={2}
          />
        </>
      )}
    </>
  );
};

export default Lighting;