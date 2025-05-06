import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useFestival } from '../../../context/FestivalContext';
import * as THREE from 'three';

interface IndieStageProps {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
}

const IndieStage: React.FC<IndieStageProps> = ({ position, rotation, scale }) => {
  const { isDayMode } = useFestival();
  const lightsRef = useRef<THREE.Group>(null);
  
  // Animate lights
  useFrame(({ clock }) => {
    if (!isDayMode && lightsRef.current) {
      const time = clock.getElapsedTime();
      
      // Update each light
      lightsRef.current.children.forEach((light, i) => {
        if (light instanceof THREE.SpotLight) {
          // Gentle movement
          light.position.y = 8 + Math.sin(time * 0.5 + i) * 0.5;
          
          // Subtle intensity changes
          const pulseIntensity = 4 + Math.sin(time + i * 0.5) * 1;
          light.intensity = pulseIntensity;
        }
      });
    }
  });
  
  return (
    <group 
      position={position}
      rotation={rotation}
      scale={[scale, scale, scale]}
    >
      {/* Base platform */}
      <mesh position={[0, 0.5, 0]} receiveShadow castShadow>
        <boxGeometry args={[15, 1, 12]} />
        <meshStandardMaterial color="#5d4037" /> {/* Wood color */}
      </mesh>
      
      {/* Stage backdrop - rustic style */}
      <mesh position={[0, 6, -5]} castShadow>
        <boxGeometry args={[15, 10, 0.5]} />
        <meshStandardMaterial color="#795548" /> {/* Wood color */}
      </mesh>
      
      {/* Left support */}
      <mesh position={[-7, 5, -2]} castShadow>
        <boxGeometry args={[1, 10, 1]} />
        <meshStandardMaterial color="#3e2723" /> {/* Dark wood */}
      </mesh>
      
      {/* Right support */}
      <mesh position={[7, 5, -2]} castShadow>
        <boxGeometry args={[1, 10, 1]} />
        <meshStandardMaterial color="#3e2723" /> {/* Dark wood */}
      </mesh>
      
      {/* Top beam */}
      <mesh position={[0, 10, -2]} castShadow>
        <boxGeometry args={[15, 1, 1]} />
        <meshStandardMaterial color="#3e2723" /> {/* Dark wood */}
      </mesh>
      
      {/* Band equipment */}
      {/* Drum set */}
      <mesh position={[0, 2, -3]} castShadow>
        <cylinderGeometry args={[1.5, 1.5, 1.5, 16]} />
        <meshStandardMaterial color="#263238" />
      </mesh>
      
      {/* Guitar amp left */}
      <mesh position={[-4, 2, -4]} castShadow>
        <boxGeometry args={[2, 2, 1]} />
        <meshStandardMaterial color="#212121" />
      </mesh>
      
      {/* Guitar amp right */}
      <mesh position={[4, 2, -4]} castShadow>
        <boxGeometry args={[2, 2, 1]} />
        <meshStandardMaterial color="#212121" />
      </mesh>
      
      {/* Microphone stand */}
      <mesh position={[0, 2, 0]} castShadow>
        <cylinderGeometry args={[0.1, 0.1, 3, 8]} />
        <meshStandardMaterial color="#9e9e9e" />
      </mesh>
      
      {/* Stage banner */}
      <mesh position={[0, 8, -4.7]} castShadow>
        <planeGeometry args={[10, 2]} />
        <meshStandardMaterial 
          color="#07FF5E" 
          emissive={isDayMode ? "#000000" : "#07FF5E"}
          emissiveIntensity={isDayMode ? 0 : 0.5}
        />
      </mesh>
      
      {/* Lights group */}
      <group ref={lightsRef}>
        {/* Light fixtures */}
        <mesh position={[-5, 10, 0]} castShadow>
          <cylinderGeometry args={[0.3, 0.5, 0.5, 8]} />
          <meshStandardMaterial color="#424242" />
        </mesh>
        
        <mesh position={[0, 10, 0]} castShadow>
          <cylinderGeometry args={[0.3, 0.5, 0.5, 8]} />
          <meshStandardMaterial color="#424242" />
        </mesh>
        
        <mesh position={[5, 10, 0]} castShadow>
          <cylinderGeometry args={[0.3, 0.5, 0.5, 8]} />
          <meshStandardMaterial color="#424242" />
        </mesh>
        
        {/* Stage lights - only visible at night */}
        {!isDayMode && (
          <>
            <spotLight 
              position={[-5, 10, 0]} 
              angle={0.5}
              penumbra={0.5}
              intensity={4}
              color="#07FF5E"
              castShadow
              target-position={[-2, 0, 0]}
            />
            
            <spotLight 
              position={[0, 10, 0]} 
              angle={0.5}
              penumbra={0.5}
              intensity={4}
              color="#FFEB3B"
              castShadow
              target-position={[0, 0, 0]}
            />
            
            <spotLight 
              position={[5, 10, 0]} 
              angle={0.5}
              penumbra={0.5}
              intensity={4}
              color="#00D0FF"
              castShadow
              target-position={[2, 0, 0]}
            />
          </>
        )}
      </group>
    </group>
  );
};

export default IndieStage;