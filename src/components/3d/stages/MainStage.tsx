import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useFestival } from '../../../context/FestivalContext';
import * as THREE from 'three';

interface MainStageProps {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
}

const MainStage: React.FC<MainStageProps> = ({ position, rotation, scale }) => {
  const { isDayMode } = useFestival();
  const stageRef = useRef<THREE.Group>(null);
  const lightRef1 = useRef<THREE.PointLight>(null);
  const lightRef2 = useRef<THREE.PointLight>(null);
  
  // Animate stage lights
  useFrame(({ clock }) => {
    if (!isDayMode && lightRef1.current && lightRef2.current) {
      const time = clock.getElapsedTime();
      
      // Pulsating intensity
      const pulseIntensity = 5 + Math.sin(time * 2) * 3;
      lightRef1.current.intensity = pulseIntensity;
      lightRef2.current.intensity = pulseIntensity;
      
      // Color cycling for light 1
      const hue1 = (time * 0.1) % 1;
      const color1 = new THREE.Color().setHSL(hue1, 1, 0.5);
      lightRef1.current.color = color1;
      
      // Color cycling for light 2 (offset)
      const hue2 = ((time * 0.1) + 0.5) % 1;
      const color2 = new THREE.Color().setHSL(hue2, 1, 0.5);
      lightRef2.current.color = color2;
    }
  });
  
  return (
    <group 
      ref={stageRef} 
      position={position}
      rotation={rotation}
      scale={[scale, scale, scale]}
    >
      {/* Main platform */}
      <mesh position={[0, 1, 0]} castShadow receiveShadow>
        <boxGeometry args={[30, 2, 15]} />
        <meshStandardMaterial color="#333333" />
      </mesh>
      
      {/* Stage backdrop */}
      <mesh position={[0, 8, -6]} castShadow>
        <boxGeometry args={[30, 14, 1]} />
        <meshStandardMaterial color="#222222" />
      </mesh>
      
      {/* Side towers - left */}
      <mesh position={[-15, 10, -2]} castShadow>
        <boxGeometry args={[2, 20, 10]} />
        <meshStandardMaterial color="#222222" />
      </mesh>
      
      {/* Side towers - right */}
      <mesh position={[15, 10, -2]} castShadow>
        <boxGeometry args={[2, 20, 10]} />
        <meshStandardMaterial color="#222222" />
      </mesh>
      
      {/* Roof structure */}
      <mesh position={[0, 17, 0]} castShadow>
        <boxGeometry args={[34, 1, 16]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      
      {/* DJ Booth */}
      <mesh position={[0, 2.5, -2]} castShadow>
        <boxGeometry args={[8, 1, 4]} />
        <meshStandardMaterial color="#444444" />
      </mesh>
      
      {/* LED Screens */}
      <mesh position={[0, 10, -5.5]} castShadow>
        <boxGeometry args={[20, 8, 0.5]} />
        <meshStandardMaterial 
          color={isDayMode ? "#555555" : "#0088ff"} 
          emissive={isDayMode ? "#000000" : "#0044ff"}
          emissiveIntensity={isDayMode ? 0 : 2}
        />
      </mesh>
      
      {/* Stage front lighting bars */}
      <mesh position={[0, 16, 4]} castShadow>
        <boxGeometry args={[28, 0.5, 0.5]} />
        <meshStandardMaterial color="#555555" />
      </mesh>
      
      {/* Stage lights - only visible at night */}
      {!isDayMode && (
        <>
          <pointLight 
            ref={lightRef1}
            position={[-10, 16, 4]} 
            intensity={5}
            color="#ff00ff"
            distance={50}
            decay={2}
          />
          
          <pointLight 
            ref={lightRef2}
            position={[10, 16, 4]} 
            intensity={5}
            color="#00ffff"
            distance={50}
            decay={2}
          />
        </>
      )}
    </group>
  );
};

export default MainStage;