// Crowd.tsx – Foule animée inspirée du Frequency Festival
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

  const dummyObject = useMemo(() => new THREE.Object3D(), []);

  const positions = useMemo(() => {
    return Array.from({ length: count }, () => {
      let x, z;
      if (scattered) {
        x = (Math.random() - 0.5) * width;
        z = (Math.random() - 0.5) * depth;
      } else {
        const distance = Math.random() * 0.9;
        const angle = Math.random() * Math.PI;
        x = Math.sin(angle) * distance * (width / 2);
        z = Math.cos(angle) * distance * (depth / 2);
      }
      const y = 0.9 + Math.random() * 0.2;
      return [x, y, z];
    });
  }, [count, width, depth, scattered]);

  const animationOffsets = useMemo(() => (
    Array.from({ length: count }, () => Math.random() * Math.PI * 2)
  ), [count]);

  useFrame(({ clock }) => {
    if (!crowdRef.current) return;
    const time = clock.getElapsedTime();
    for (let i = 0; i < count; i++) {
      const [x, y, z] = positions[i];
      const offset = animationOffsets[i];
      const bobbingY = y + Math.sin(time * 3 + offset) * 0.08;
      const swayX = x + Math.sin(time + offset) * 0.04;
      dummyObject.position.set(swayX, bobbingY, z);
      dummyObject.rotation.y = Math.sin(time * 0.6 + offset) * 0.4;
      dummyObject.updateMatrix();
      crowdRef.current.setMatrixAt(i, dummyObject.matrix);
    }
    crowdRef.current.instanceMatrix.needsUpdate = true;
  });

  const colors = useMemo(() => {
    const array = new Float32Array(count * 3);
    const color = new THREE.Color();
    const palette = [
      '#f72585', '#b5179e', '#7209b7', '#560bad', '#480ca8', '#3a0ca3', '#3f37c9', '#4895ef', '#4cc9f0'
    ];
    for (let i = 0; i < count; i++) {
      color.set(palette[Math.floor(Math.random() * palette.length)]);
      color.toArray(array, i * 3);
    }
    return array;
  }, [count]);

  return (
    <group position={position}>
      <instancedMesh ref={crowdRef} args={[undefined, undefined, count]} castShadow>
        <cylinderGeometry args={[0.25, 0.25, 1.2, 8]} />
        <meshStandardMaterial vertexColors={true} />
      </instancedMesh>
      <instancedMesh args={[undefined, undefined, count]} castShadow>
        <sphereGeometry args={[0.22, 16, 16]} />
        <meshStandardMaterial color="#ffe0bd" />
      </instancedMesh>
    </group>
  );
};

export default Crowd;
