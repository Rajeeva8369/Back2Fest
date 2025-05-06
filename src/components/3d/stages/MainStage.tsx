// MainStage.tsx – Scène principale inspirée du Frequency Festival
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

  useFrame(({ clock }) => {
    if (!isDayMode && lightRef1.current && lightRef2.current) {
      const time = clock.getElapsedTime();
      const pulse = 5 + Math.sin(time * 2) * 3;
      lightRef1.current.intensity = pulse;
      lightRef2.current.intensity = pulse;

      lightRef1.current.color.setHSL((time * 0.1) % 1, 1, 0.5);
      lightRef2.current.color.setHSL(((time * 0.1) + 0.5) % 1, 1, 0.5);
    }
  });

  return (
    <group ref={stageRef} position={position} rotation={rotation} scale={[scale, scale, scale]}>
      {/* Plateau principal */}
      <mesh position={[0, 1, 0]} castShadow receiveShadow>
        <boxGeometry args={[40, 2, 20]} />
        <meshStandardMaterial color="#2b2b2b" />
      </mesh>

      {/* Mur de fond */}
      <mesh position={[0, 10, -7]} castShadow>
        <boxGeometry args={[40, 16, 1]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>

      {/* Tours latérales */}
      {[-20, 20].map((x, i) => (
        <mesh key={i} position={[x, 10, -3]} castShadow>
          <boxGeometry args={[2.5, 20, 10]} />
          <meshStandardMaterial color="#111" />
        </mesh>
      ))}

      {/* Toit de scène */}
      <mesh position={[0, 20, 0]} castShadow>
        <boxGeometry args={[44, 1, 22]} />
        <meshStandardMaterial color="#111" />
      </mesh>

      {/* Booth du DJ */}
      <mesh position={[0, 3, -2]} castShadow>
        <boxGeometry args={[10, 1.5, 5]} />
        <meshStandardMaterial color="#444" />
      </mesh>

      {/* Écran LED central */}
      <mesh position={[0, 12, -6.4]} castShadow>
        <planeGeometry args={[24, 10]} />
        <meshStandardMaterial
          color={isDayMode ? '#555' : '#00bfff'}
          emissive={isDayMode ? '#000' : '#0088ff'}
          emissiveIntensity={isDayMode ? 0 : 2.5}
        />
      </mesh>

      {/* Barres frontales lumineuses */}
      <mesh position={[0, 18, 5]} castShadow>
        <boxGeometry args={[36, 0.6, 0.6]} />
        <meshStandardMaterial color="#555" />
      </mesh>

      {/* Lumières actives de nuit */}
      {!isDayMode && (
        <>
          <pointLight
            ref={lightRef1}
            position={[-12, 18, 5]}
            intensity={5}
            color="#ff00ff"
            distance={60}
            decay={2}
          />
          <pointLight
            ref={lightRef2}
            position={[12, 18, 5]}
            intensity={5}
            color="#00ffff"
            distance={60}
            decay={2}
          />
        </>
      )}
    </group>
  );
};

export default MainStage;
