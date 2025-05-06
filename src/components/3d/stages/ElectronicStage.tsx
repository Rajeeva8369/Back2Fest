// ElectronicStage.tsx – Version immersive inspirée du Frequency Festival
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
  const lightsRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!isDayMode && lightsRef.current) {
      const time = clock.getElapsedTime();
      lightsRef.current.rotation.y = Math.sin(time * 0.6) * 0.4;
      lightsRef.current.children.forEach((light, i) => {
        if (light instanceof THREE.PointLight) {
          const intensity = 2.5 + Math.sin(time * 4 + i) * 1.5;
          light.intensity = intensity;
          const hue = ((time * 0.3) + (i * 0.2)) % 1;
          light.color = new THREE.Color().setHSL(hue, 1, 0.5);
        }
      });
    }
  });

  return (
    <group position={position} rotation={rotation} scale={[scale, scale, scale]}>
      {/* Sol de la scène */}
      <mesh position={[0, 0.5, 0]} receiveShadow castShadow>
        <boxGeometry args={[40, 1, 25]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>

      {/* Structure métallique en arc */}
      {[...Array(6)].map((_, i) => (
        <mesh key={i} position={[-15 + i * 6, 7, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.3, 0.3, 14, 8]} />
          <meshStandardMaterial color="#888" />
        </mesh>
      ))}

      {/* Tente conique transparente */}
      <mesh position={[0, 12, 0]} castShadow>
        <coneGeometry args={[25, 16, 32, 1, true]} />
        <meshStandardMaterial color="#5A00FF" transparent opacity={0.7} side={THREE.DoubleSide} />
      </mesh>

      {/* DJ Booth */}
      <mesh position={[0, 2, -10]} castShadow>
        <boxGeometry args={[10, 2, 4]} />
        <meshStandardMaterial color="#000" />
      </mesh>
      <mesh position={[0, 3, -10]} castShadow>
        <boxGeometry args={[7, 0.5, 2]} />
        <meshStandardMaterial color="#222" />
      </mesh>

      {/* Mur LED */}
      <mesh position={[0, 6, -12]} castShadow>
        <planeGeometry args={[12, 6]} />
        <meshStandardMaterial emissive="#ffffff" emissiveIntensity={0.3} color="#111" />
      </mesh>

      {/* Enceintes gauche/droite */}
      {[-8, 8].map((x, i) => (
        <mesh key={i} position={[x, 3, -10]} castShadow>
          <boxGeometry args={[2, 5, 2]} />
          <meshStandardMaterial color="#2e2e2e" />
        </mesh>
      ))}

      {/* Rig de lumières */}
      <group ref={lightsRef} position={[0, 12, 0]}>
        <mesh castShadow>
          <boxGeometry args={[20, 0.4, 0.4]} />
          <meshStandardMaterial color="#888" />
        </mesh>
        {!isDayMode && (
          <>
            {[-8, -4, 0, 4, 8].map((x, i) => (
              <pointLight
                key={i}
                position={[x, 0, 0]}
                intensity={3}
                distance={40}
                decay={2}
                color={new THREE.Color().setHSL((i * 0.2) % 1, 1, 0.5)}
              />
            ))}
          </>
        )}
      </group>
    </group>
  );
};

export default ElectronicStage;
