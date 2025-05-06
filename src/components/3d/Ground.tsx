import React from 'react';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

const Ground: React.FC = () => {
  // We'll create a simple ground plane with a grass texture
  const repeatX = 10;
  const repeatY = 10;
  
  // Create material that simulates grass
  const groundMaterial = new THREE.MeshStandardMaterial({
    color: '#3a8c34', 
    roughness: 0.8,
    metalness: 0.1,
  });
  
  return (
    <mesh 
      rotation={[-Math.PI / 2, 0, 0]} 
      position={[0, -0.1, 0]} 
      receiveShadow
    >
      <planeGeometry args={[500, 500, 32, 32]} />
      <primitive object={groundMaterial} />
    </mesh>
  );
};

export default Ground;