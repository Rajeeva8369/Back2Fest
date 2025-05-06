// IndieStage.tsx – Scène Indie inspirée de Frequency Festival (style nature & bois)
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

  useFrame(({ clock }) => {
    if (!isDayMode && lightsRef.current) {
      const time = clock.getElapsedTime();
      lightsRef.current.children.forEach((light, i) => {
        if (light instanceof THREE.SpotLight) {
          light.position.y = 8 + Math.sin(time * 0.5 + i) * 0.5;
          light.intensity = 4 + Math.sin(time + i * 0.5);
        }
      });
    }
  });

  return (
    <group position={position} rotation={rotation} scale={[scale, scale, scale]}>
      {/* Scène boisée en plein air */}
      <mesh position={[0, 0.5, 0]} receiveShadow castShadow>
        <boxGeometry args={[18, 1, 14]} />
        <meshStandardMaterial color="#6d4c41" />
      </mesh>

      {/* Fond de scène en bois */}
      <mesh position={[0, 6, -6.5]} castShadow>
        <boxGeometry args={[18, 12, 0.5]} />
        <meshStandardMaterial color="#5d4037" />
      </mesh>

      {/* Poteaux bois gauche/droite */}
      {[-8, 8].map((x, i) => (
        <mesh key={i} position={[x, 6, -3]} castShadow>
          <boxGeometry args={[1, 12, 1]} />
          <meshStandardMaterial color="#3e2723" />
        </mesh>
      ))}

      {/* Poutre supérieure */}
      <mesh position={[0, 12, -3]} castShadow>
        <boxGeometry args={[18, 1, 1]} />
        <meshStandardMaterial color="#3e2723" />
      </mesh>

      {/* Instruments / matos */}
      <mesh position={[0, 2, -3]} castShadow>
        <cylinderGeometry args={[1.2, 1.2, 1.5, 16]} />
        <meshStandardMaterial color="#37474f" />
      </mesh>

      {[[-5, '#212121'], [5, '#212121']].map(([x, color], i) => (
        <mesh key={i} position={[x, 2, -4]} castShadow>
          <boxGeometry args={[2, 2, 1]} />
          <meshStandardMaterial color={color} />
        </mesh>
      ))}

      <mesh position={[0, 2, 0]} castShadow>
        <cylinderGeometry args={[0.1, 0.1, 3, 8]} />
        <meshStandardMaterial color="#9e9e9e" />
      </mesh>

      {/* Bannière INDIE lumineuse */}
      <mesh position={[0, 9, -6.3]} castShadow>
        <planeGeometry args={[12, 2]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive={isDayMode ? '#000000' : '#07FF5E'}
          emissiveIntensity={isDayMode ? 0 : 0.7}
        />
      </mesh>

      {/* Lumières hautes */}
      <group ref={lightsRef}>
        {[-5, 0, 5].map((x, i) => (
          <>
            <mesh key={`fixture-${i}`} position={[x, 12, 0]} castShadow>
              <cylinderGeometry args={[0.3, 0.5, 0.5, 8]} />
              <meshStandardMaterial color="#424242" />
            </mesh>
            {!isDayMode && (
              <spotLight
                key={`spot-${i}`}
                position={[x, 12, 0]}
                angle={0.5}
                penumbra={0.5}
                intensity={4}
                color={['#07FF5E', '#FFEB3B', '#00D0FF'][i]}
                castShadow
                target={new THREE.Object3D()}
              />
            )}
          </>
        ))}
      </group>
    </group>
  );
};

export default IndieStage;
