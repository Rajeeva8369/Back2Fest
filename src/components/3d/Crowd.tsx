import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

interface CrowdProps {
  position: [number, number, number];
  count: number;
  area: [number, number];
  scattered?: boolean;
}

const Crowd: React.FC<CrowdProps> = ({ position, count, area, scattered = false }) => {
  const [width, depth] = area;
  const crowdRef = useRef<THREE.InstancedMesh>(null);
  
  // Create a simple person shape - a cylinder with a sphere on top
  const dummyObject = useMemo(() => {
    const dummy = new THREE.Object3D();
    return dummy;
  }, []);
  
  // Generate random positions for each instance
  const positions = useMemo(() => {
    return Array.from({ length: count }, () => {
      // Create more natural crowd patterns
      let x, z;
      
      if (scattered) {
        // For scattered areas like camping - fully random
        x = (Math.random() - 0.5) * width;
        z = (Math.random() - 0.5) * depth;
      } else {
        // For stage areas - clustered towards the stage
        const distanceFromCenter = Math.random() * 0.8; // 0-0.8 to keep people more centered
        const angle = Math.random() * Math.PI; // Semi-circle in front of stage
        
        x = Math.sin(angle) * distanceFromCenter * (width / 2);
        z = Math.cos(angle) * distanceFromCenter * (depth / 2);
      }
      
      const y = 0.9 + Math.random() * 0.3; // Slight height variation
      return [x, y, z];
    });
  }, [count, width, depth, scattered]);
  
  // Animation timing offsets to make crowd movement look more natural
  const animationOffsets = useMemo(() => {
    return Array.from({ length: count }, () => Math.random() * Math.PI * 2);
  }, [count]);
  
  // Animate the crowd
  useFrame(({ clock }) => {
    if (!crowdRef.current) return;
    
    const time = clock.getElapsedTime();
    
    // Update each instance
    for (let i = 0; i < count; i++) {
      const [x, y, z] = positions[i];
      const offset = animationOffsets[i];
      
      // Add subtle movement for each person - "dancing"
      const bobbingY = y + Math.sin(time * 2 + offset) * 0.1;
      const swayX = x + Math.sin(time + offset) * 0.05;
      
      // Position and slight rotation
      dummyObject.position.set(swayX, bobbingY, z);
      dummyObject.rotation.y = Math.sin(time * 0.5 + offset) * 0.5;
      dummyObject.updateMatrix();
      
      // Update the instance matrix
      crowdRef.current.setMatrixAt(i, dummyObject.matrix);
    }
    
    crowdRef.current.instanceMatrix.needsUpdate = true;
  });
  
  // Colors for the crowd
  const colors = useMemo(() => {
    const colorArray = new Float32Array(count * 3);
    const color = new THREE.Color();
    
    // Generate random colors for each person (clothing)
    for (let i = 0; i < count; i++) {
      // Pick from a festival-appropriate palette
      const colorOptions = [
        '#e63946', // red
        '#f1faee', // white
        '#a8dadc', // light blue
        '#457b9d', // dark blue
        '#1d3557', // navy
        '#ff8c00', // orange
        '#4a4e69', // slate
        '#9d4edd', // purple
      ];
      
      const randomColor = colorOptions[Math.floor(Math.random() * colorOptions.length)];
      color.set(randomColor);
      color.toArray(colorArray, i * 3);
    }
    
    return colorArray;
  }, [count]);
  
  return (
    <group position={position}>
      {/* Body */}
      <instancedMesh
        ref={crowdRef}
        args={[undefined, undefined, count]}
        castShadow
      >
        <cylinderGeometry args={[0.2, 0.2, 1.2, 8]} />
        <meshStandardMaterial vertexColors={true} />
      </instancedMesh>
      
      {/* Heads */}
      <instancedMesh args={[undefined, undefined, count]} castShadow>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color="#f5d0c5" />
      </instancedMesh>
    </group>
  );
};

export default Crowd;