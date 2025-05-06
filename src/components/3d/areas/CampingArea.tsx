import React from 'react';
import { useFestival } from '../../../context/FestivalContext';
import * as THREE from 'three';

interface CampingAreaProps {
  position: [number, number, number];
  scale: number;
}

const CampingArea: React.FC<CampingAreaProps> = ({ position, scale }) => {
  const { isDayMode } = useFestival();
  
  // Define tent positions
  const tentPositions = [
    [-20, 0, -10], [10, 0, -15], [-5, 0, -5], 
    [15, 0, 5], [-15, 0, 10], [0, 0, 15],
    [-25, 0, 20], [20, 0, 25], [30, 0, 0],
    [-10, 0, 25], [5, 0, -25], [-30, 0, -20],
    [25, 0, -25], [-20, 0, -30], [15, 0, -35],
    [0, 0, -20], [-35, 0, 5], [35, 0, 15]
  ];
  
  // Create a common tent mesh that will be instanced
  const tentGeometry = new THREE.ConeGeometry(1.5, 2, 6);
  const tentMaterial = new THREE.MeshStandardMaterial({ color: "#ff2d9f" });
  
  // Create a campfire mesh
  const campfirePosition: [number, number, number] = [0, 0.2, 0];
  
  return (
    <group position={position} scale={[scale, scale, scale]}>
      {/* Ground circle for camping area */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <circleGeometry args={[40, 32]} />
        <meshStandardMaterial color="#2e7d32" roughness={0.9} />
      </mesh>
      
      {/* Tents */}
      {tentPositions.map((pos, index) => (
        <Tent 
          key={index} 
          position={pos as [number, number, number]} 
          rotation={[0, Math.random() * Math.PI * 2, 0]}
          color={index % 3 === 0 ? "#ff2d9f" : index % 3 === 1 ? "#6937FF" : "#00D0FF"}
        />
      ))}
      
      {/* Campfire */}
      <CampFire position={campfirePosition} isDayMode={isDayMode} />
      
      {/* Food truck */}
      <FoodTruck position={[-15, 0, -15]} rotation={[0, Math.PI / 4, 0]} />
    </group>
  );
};

interface TentProps {
  position: [number, number, number];
  rotation: [number, number, number];
  color: string;
}

const Tent: React.FC<TentProps> = ({ position, rotation, color }) => {
  return (
    <group position={position} rotation={rotation}>
      {/* Tent body */}
      <mesh position={[0, 1, 0]} castShadow>
        <coneGeometry args={[1.5, 2, 6]} />
        <meshStandardMaterial color={color} />
      </mesh>
      
      {/* Tent entrance (partial cylinder) */}
      <mesh position={[0, 0.5, 0.8]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.5, 0.5, 1, 8, 1, true, 0, Math.PI]} />
        <meshStandardMaterial color="#424242" side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
};

interface CampFireProps {
  position: [number, number, number];
  isDayMode: boolean;
}

const CampFire: React.FC<CampFireProps> = ({ position, isDayMode }) => {
  return (
    <group position={position}>
      {/* Fire pit circle */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <ringGeometry args={[1.5, 2, 16]} />
        <meshStandardMaterial color="#424242" />
      </mesh>
      
      {/* Logs */}
      <mesh position={[0, 0.2, 0]} rotation={[0, Math.PI / 4, 0]} castShadow>
        <cylinderGeometry args={[0.2, 0.2, 2, 8]} />
        <meshStandardMaterial color="#5d4037" />
      </mesh>
      
      <mesh position={[0, 0.2, 0]} rotation={[0, -Math.PI / 4, 0]} castShadow>
        <cylinderGeometry args={[0.2, 0.2, 2, 8]} />
        <meshStandardMaterial color="#5d4037" />
      </mesh>
      
      {/* Fire light - only at night */}
      {!isDayMode && (
        <pointLight 
          position={[0, 1, 0]} 
          intensity={5}
          color="#ff9800"
          distance={20}
          decay={2}
        />
      )}
      
      {/* Sitting logs around fire */}
      {[0, Math.PI / 2, Math.PI, Math.PI * 1.5].map((angle, index) => (
        <mesh 
          key={index}
          position={[
            Math.sin(angle) * 3, 
            0.4, 
            Math.cos(angle) * 3
          ]} 
          rotation={[0, angle + Math.PI / 2, 0]}
          castShadow
        >
          <cylinderGeometry args={[0.4, 0.4, 2, 8]} />
          <meshStandardMaterial color="#8d6e63" />
        </mesh>
      ))}
    </group>
  );
};

interface FoodTruckProps {
  position: [number, number, number];
  rotation: [number, number, number];
}

const FoodTruck: React.FC<FoodTruckProps> = ({ position, rotation }) => {
  return (
    <group position={position} rotation={rotation}>
      {/* Truck body */}
      <mesh position={[0, 1.5, 0]} castShadow>
        <boxGeometry args={[4, 3, 8]} />
        <meshStandardMaterial color="#90caf9" />
      </mesh>
      
      {/* Truck cab */}
      <mesh position={[0, 1.5, 5]} castShadow>
        <boxGeometry args={[4, 2, 2]} />
        <meshStandardMaterial color="#42a5f5" />
      </mesh>
      
      {/* Wheels */}
      <mesh position={[-2, 0.5, 3]} castShadow>
        <cylinderGeometry args={[0.5, 0.5, 0.5, 16]} rotation={[Math.PI / 2, 0, 0]} />
        <meshStandardMaterial color="#212121" />
      </mesh>
      
      <mesh position={[2, 0.5, 3]} castShadow>
        <cylinderGeometry args={[0.5, 0.5, 0.5, 16]} rotation={[Math.PI / 2, 0, 0]} />
        <meshStandardMaterial color="#212121" />
      </mesh>
      
      <mesh position={[-2, 0.5, -3]} castShadow>
        <cylinderGeometry args={[0.5, 0.5, 0.5, 16]} rotation={[Math.PI / 2, 0, 0]} />
        <meshStandardMaterial color="#212121" />
      </mesh>
      
      <mesh position={[2, 0.5, -3]} castShadow>
        <cylinderGeometry args={[0.5, 0.5, 0.5, 16]} rotation={[Math.PI / 2, 0, 0]} />
        <meshStandardMaterial color="#212121" />
      </mesh>
      
      {/* Service window */}
      <mesh position={[-2.01, 2, -1]} castShadow>
        <planeGeometry args={[3, 1.5]} />
        <meshStandardMaterial color="#e1f5fe" />
      </mesh>
      
      {/* Awning */}
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
};

export default CampingArea;