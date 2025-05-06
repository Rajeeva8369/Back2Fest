import React, { useState, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { Html } from '@react-three/drei';

interface StageMarkersProps {
  onStageClick: (stageName: string) => void;
}

const StageMarkers: React.FC<StageMarkersProps> = ({ onStageClick }) => {
  const { camera } = useThree();
  
  const markers = [
    { id: 'mainstage', position: [0, 5, -40], label: 'Main Stage' },
    { id: 'electronic', position: [-60, 5, 20], label: 'Electronic Stage' },
    { id: 'indie', position: [40, 5, 30], label: 'Indie Stage' },
    { id: 'camping', position: [0, 2, 80], label: 'Camping Area' }
  ];
  
  return (
    <group>
      {markers.map((marker) => (
        <StageMarker 
          key={marker.id}
          position={marker.position} 
          label={marker.label}
          onClick={() => onStageClick(marker.id)}
        />
      ))}
    </group>
  );
};

interface StageMarkerProps {
  position: [number, number, number];
  label: string;
  onClick: () => void;
}

const StageMarker: React.FC<StageMarkerProps> = ({ position, label, onClick }) => {
  const [hover, setHover] = useState(false);
  const markerRef = useRef<THREE.Mesh>(null);
  const { camera } = useThree();
  
  useFrame(() => {
    if (markerRef.current) {
      // Make marker always face the camera
      markerRef.current.quaternion.copy(camera.quaternion);
    }
  });
  
  return (
    <group position={position}>
      {/* Floating marker */}
      <mesh
        ref={markerRef}
        position={[0, 2, 0]}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
        onClick={onClick}
      >
        <Html distanceFactor={15}>
          <div
            className="stage-marker"
            style={{
              transform: hover ? 'translateX(-50%) translateY(-50%) scale(1.2)' : 'translateX(-50%) translateY(-50%)'
            }}
          />
        </Html>
      </mesh>
      
      {/* Marker Label */}
      <mesh position={[0, 2, 0]}>
        <Html distanceFactor={15} center transform occlude>
          <div 
            className={`
              px-3 py-1.5 rounded-full font-medium text-white text-sm text-center
              transition-all duration-300
              ${hover ? 'bg-festival-pink scale-110' : 'bg-black/70'}
            `}
            style={{
              transform: 'translateY(25px)',
              width: 'max-content',
              boxShadow: hover ? '0 0 15px rgba(255, 45, 159, 0.5)' : 'none',
              whiteSpace: 'nowrap'
            }}
          >
            {label}
          </div>
        </Html>
      </mesh>
    </group>
  );
};

export default StageMarkers;