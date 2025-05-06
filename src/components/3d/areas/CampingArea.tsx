// CampingArea.tsx
import React from 'react';
import { useFestival } from '../../../context/FestivalContext';
import * as THREE from 'three';

interface CampingAreaProps {
  position: [number, number, number];
  scale: number;
}

const CampingArea: React.FC<CampingAreaProps> = ({ position, scale }) => {
  const { isDayMode } = useFestival();

  // Grid-based tent positions
  const rows = 5;
  const cols = 6;
  const spacing = 5;
  const tentPositions: [number, number, number][] = [];

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      tentPositions.push([i * spacing, 0, j * spacing]);
    }
  }

  const campfirePosition: [number, number, number] = [12, 0.2, 8];

  const foodCourtPositions: [number, number, number][] = [
    [5, 0, 30],
    [10, 0, 30],
    [15, 0, 30]
  ];

  const treePositions: [number, number, number][] = [
    [0, 0, 0],
    [25, 0, 0],
    [0, 0, 25],
    [25, 0, 25]
  ];

  return (
    <group position={position} scale={[scale, scale, scale]}>
      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[60, 64]} />
        <meshStandardMaterial color="#4caf50" />
      </mesh>

      {/* Tents */}
      {tentPositions.map((pos, i) => (
        <Tent
          key={i}
          position={pos}
          rotation={[0, Math.random() * Math.PI * 2, 0]}
          color={i % 2 === 0 ? '#ff2d9f' : '#00D0FF'}
        />
      ))}

      {/* Campfire */}
      <CampFire position={campfirePosition} isDayMode={isDayMode} />

      {/* Food trucks */}
      {foodCourtPositions.map((pos, i) => (
        <FoodTruck key={i} position={pos} rotation={[0, Math.PI / 2, 0]} />
      ))}

      {/* Trees */}
      {treePositions.map((pos, i) => (
        <Tree key={i} position={pos} />
      ))}
    </group>
  );
};

interface TentProps {
  position: [number, number, number];
  rotation: [number, number, number];
  color: string;
}

const Tent: React.FC<TentProps> = ({ position, rotation, color }) => (
  <group position={position} rotation={rotation}>
    <mesh position={[0, 1, 0]} castShadow>
      <coneGeometry args={[1.5, 2, 6]} />
      <meshStandardMaterial color={color} />
    </mesh>
    <mesh position={[0, 0.5, 0.8]} rotation={[0, 0, Math.PI / 2]} castShadow>
      <cylinderGeometry args={[0.5, 0.5, 1, 8, 1, true, 0, Math.PI]} />
      <meshStandardMaterial color="#424242" side={THREE.DoubleSide} />
    </mesh>
  </group>
);

interface CampFireProps {
  position: [number, number, number];
  isDayMode: boolean;
}

const CampFire: React.FC<CampFireProps> = ({ position, isDayMode }) => (
  <group position={position}>
    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <ringGeometry args={[1.5, 2, 16]} />
      <meshStandardMaterial color="#424242" />
    </mesh>
    {[0, Math.PI / 2, Math.PI, Math.PI * 1.5].map((angle, i) => (
      <mesh
        key={i}
        position={[Math.sin(angle) * 3, 0.4, Math.cos(angle) * 3]}
        rotation={[0, angle + Math.PI / 2, 0]}
        castShadow
      >
        <cylinderGeometry args={[0.4, 0.4, 2, 8]} />
        <meshStandardMaterial color="#8d6e63" />
      </mesh>
    ))}
    {!isDayMode && (
      <pointLight position={[0, 1, 0]} intensity={5} color="#ff9800" distance={20} decay={2} />
    )}
  </group>
);

interface FoodTruckProps {
  position: [number, number, number];
  rotation: [number, number, number];
}

const FoodTruck: React.FC<FoodTruckProps> = ({ position, rotation }) => (
  <group position={position} rotation={rotation}>
    <mesh position={[0, 1.5, 0]} castShadow>
      <boxGeometry args={[4, 3, 8]} />
      <meshStandardMaterial color="#90caf9" />
    </mesh>
    <mesh position={[0, 1.5, 5]} castShadow>
      <boxGeometry args={[4, 2, 2]} />
      <meshStandardMaterial color="#42a5f5" />
    </mesh>
    {[-2, 2].map(x => [-3, 3].map(z => (
      <mesh key={`${x}-${z}`} position={[x, 0.5, z]} castShadow>
        <cylinderGeometry args={[0.5, 0.5, 0.5, 16]} rotation={[Math.PI / 2, 0, 0]} />
        <meshStandardMaterial color="#212121" />
      </mesh>
    )))}
    <mesh position={[-2.01, 2, -1]} castShadow>
      <planeGeometry args={[3, 1.5]} />
      <meshStandardMaterial color="#e1f5fe" />
    </mesh>
    <mesh position={[-2.5, 3, -1]} rotation={[0.3, 0, 0]} castShadow>
      <boxGeometry args={[0.1, 0.1, 3]} />
      <meshStandardMaterial color="#ffeb3b" />
    </mesh>
    <mesh position={[-2.5, 2.8, -1]} rotation={[0.3, 0, 0]} castShadow>
      <planeGeometry args={[2, 1.5]} />
      <meshStandardMaterial color="#ffeb3b" side={THREE.DoubleSide} />
    </mesh>
  </group>
);

interface TreeProps {
  position: [number, number, number];
}

const Tree: React.FC<TreeProps> = ({ position }) => (
  <group position={position}>
    <mesh position={[0, 1, 0]} castShadow>
      <cylinderGeometry args={[0.3, 0.3, 2]} />
      <meshStandardMaterial color="#5d4037" />
    </mesh>
    <mesh position={[0, 3, 0]} castShadow>
      <coneGeometry args={[1.5, 3, 8]} />
      <meshStandardMaterial color="#2e7d32" />
    </mesh>
  </group>
);

export default CampingArea;