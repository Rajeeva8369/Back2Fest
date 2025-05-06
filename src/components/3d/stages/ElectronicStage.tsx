import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useFestival } from '../../../context/FestivalContext';
import * as THREE from 'three';

interface ElectronicStageProps {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
}

const ElectronicStage: React.FC<ElectronicStageProps> = ({ position, rotation, scale }) => {
  const { isDayMode } = useFestival();
  const tentRef = useRef<THREE.Group>(null);
  const lightsRef = useRef<THREE.Group>(null);
  
  // Animate lights
  useFrame(({ clock }) => {
    if (!isDayMode && lightsRef.current) {
      const time = clock.getElapsedTime();
      
      // Rotate the light rig
      lightsRef.current.rotation.y = Math.sin(time * 0.5) * 0.2;
      
      // Update each light in the rig
      lightsRef.current.children.forEach((light, i) => {
        if (light instanceof THREE.PointLight) {
          // Pulsating intensity
          const pulseIntensity = 3 + Math.sin(time * 3 + i) * 2;
          light.intensity = pulseIntensity;
          
          // Color cycling
          const hue = ((time * 0.2) + (i * 0.2)) % 1;
          const color = new THREE.Color().setHSL(hue, 1, 0.5);
          light.color = color;
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
        <boxGeometry args={[20, 1, 20]} />
        <meshStandardMaterial color="#444444" />
      </mesh>
      
      {/* Tent structure */}
      <group ref={tentRef}>
        {/* Tent center pole */}
        <mesh position={[0, 12, 0]} castShadow>
          <cylinderGeometry args={[0.5, 0.5, 24, 8]} />
          <meshStandardMaterial color="#777777" />
        </mesh>
        
        {/* Tent fabric - simplified as a cone */}
        <mesh position={[0, 12, 0]} castShadow>
          <coneGeometry args={[15, 12, 16, 1, true]} />
          <meshStandardMaterial 
            color="#6937FF" 
            side={THREE.DoubleSide}
            transparent={true}
            opacity={0.9}
          />
        </mesh>
        
        {/* DJ booth */}
        <mesh position={[0, 2, -6]} castShadow>
          <boxGeometry args={[8, 2, 4]} />
          <meshStandardMaterial color="#222222" />
        </mesh>
        
        {/* DJ equipment */}
        <mesh position={[0, 3, -6]} castShadow>
          <boxGeometry args={[6, 0.5, 2]} />
          <meshStandardMaterial color="#111111" />
        </mesh>
        
        {/* Speaker left */}
        <mesh position={[-5, 3, -6]} castShadow>
          <boxGeometry args={[2, 4, 2]} />
          <meshStandardMaterial color="#333333" />
        </mesh>
        
        {/* Speaker right */}
        <mesh position={[5, 3, -6]} castShadow>
          <boxGeometry args={[2, 4, 2]} />
          <meshStandardMaterial color="#333333" />
        </mesh>
        
        {/* Light rig */}
        <group ref={lightsRef} position={[0, 12, 0]}>
          {/* Light fixture - horizontal bar */}
          <mesh castShadow>
            <boxGeometry args={[16, 0.5, 0.5]} />
            <meshStandardMaterial color="#555555" />
          </mesh>
          
          {/* Light sources - only visible at night */}
          {!isDayMode && (
            <>
              <pointLight position={[-6, 0, 0]} intensity={3} color="#ff00ff" distance={30} decay={2} />
              <pointLight position={[-2, 0, 0]} intensity={3} color="#00ffff" distance={30} decay={2} />
              <pointLight position={[2, 0, 0]} intensity={3} color="#ffff00" distance={30} decay={2} />
              <pointLight position={[6, 0, 0]} intensity={3} color="#00ff00" distance={30} decay={2} />
            </>
          )}
        </group>
      </group>
    </group>
  );
};

export default ElectronicStage;