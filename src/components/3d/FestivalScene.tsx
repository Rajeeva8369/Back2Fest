import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { useFestival } from '../../context/FestivalContext';
import Ground from './Ground';
import MainStage from './stages/MainStage';
import ElectronicStage from './stages/ElectronicStage';
import IndieStage from './stages/IndieStage';
import CampingArea from './areas/CampingArea';
import StageMarkers from './StageMarkers';
import Crowd from './Crowd';
import Lighting from './Lighting';

interface FestivalSceneProps {
  onStageClick: (stageName: string) => void;
}

const FestivalScene: React.FC<FestivalSceneProps> = ({ onStageClick }) => {
  const { isDayMode, cameraPosition } = useFestival();
  
  return (
    <Canvas shadows>
      <SceneCamera position={cameraPosition} />
      <Environment preset={isDayMode ? "sunset" : "night"} />
      <fog attach="fog" args={[isDayMode ? '#f8e8c1' : '#090113', 10, 500]} />
      
      <Lighting isDayMode={isDayMode} />
      
      <SceneContent onStageClick={onStageClick} />
      
      <OrbitControls 
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minPolarAngle={0.2}
        maxPolarAngle={Math.PI / 2.05}
        minDistance={15}
        maxDistance={200}
      />
    </Canvas>
  );
};

interface SceneContentProps {
  onStageClick: (stageName: string) => void;
}

const SceneContent: React.FC<SceneContentProps> = ({ onStageClick }) => {
  const { showCrowd, showLabels } = useFestival();
  
  return (
    <group>
      <Ground />
      
      <MainStage position={[0, 0, -40]} rotation={[0, 0, 0]} scale={1} />
      <ElectronicStage position={[-60, 0, 20]} rotation={[0, Math.PI / 4, 0]} scale={0.8} />
      <IndieStage position={[40, 0, 30]} rotation={[0, -Math.PI / 6, 0]} scale={0.7} />
      <CampingArea position={[0, 0, 80]} scale={1.2} />
      
      {showCrowd && (
        <>
          <Crowd position={[0, 0, -20]} count={200} area={[80, 40]} /> {/* Main stage */}
          <Crowd position={[-60, 0, 40]} count={100} area={[40, 40]} /> {/* Electronic */}
          <Crowd position={[40, 0, 50]} count={80} area={[30, 30]} /> {/* Indie */}
          <Crowd position={[0, 0, 100]} count={120} area={[100, 60]} scattered={true} /> {/* Camping */}
        </>
      )}
      
      {showLabels && <StageMarkers onStageClick={onStageClick} />}
    </group>
  );
};

interface SceneCameraProps {
  position: string;
}

const SceneCamera: React.FC<SceneCameraProps> = ({ position }) => {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const { camera } = useThree();
  
  const cameraPositions = {
    overview: { position: [0, 100, 100], target: [0, 0, 0] },
    mainstage: { position: [0, 15, 0], target: [0, 5, -40] },
    electronic: { position: [-40, 15, 30], target: [-60, 5, 20] },
    camping: { position: [20, 20, 130], target: [0, 0, 80] }
  };
  
  useEffect(() => {
    const targetPosition = cameraPositions[position as keyof typeof cameraPositions] || cameraPositions.overview;
    
    if (cameraRef.current) {
      // Set initial camera position
      cameraRef.current.position.set(
        targetPosition.position[0],
        targetPosition.position[1],
        targetPosition.position[2]
      );
      
      // Update lookAt target
      cameraRef.current.lookAt(
        targetPosition.target[0],
        targetPosition.target[1],
        targetPosition.target[2]
      );
      
      // Update the OrbitControls target
      if (camera instanceof THREE.PerspectiveCamera) {
        const controls = camera.userData.controls;
        if (controls) {
          controls.target.set(
            targetPosition.target[0],
            targetPosition.target[1],
            targetPosition.target[2]
          );
        }
      }
    }
  }, [position, camera]);
  
  return <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 100, 100]} fov={50} />;
};

export default FestivalScene;