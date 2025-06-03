import { Environment, Float, OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useEffect } from "react";
import * as THREE from "three";

const TechIconCardExperience = ({ model }) => {
  const scene = useGLTF(model.modelPath);

  useEffect(() => {
    scene.scene.traverse((child) => {
      if (child.isMesh) {
        // 💡 Cas spécifique : Interactive Developer → blanc
        if (model.name === "Interactive Developer" && child.name === "Object_5") {
          child.material = new THREE.MeshStandardMaterial({ color: "white" });
        }

        // 💡 Cas spécifique : PHP Elephant → bleu PHP
        if (model.name === "Php Developer") {
          child.material.color.set("#8892BF"); // Couleur officielle du logo PHP
        }
      }
    });
  }, [scene, model.name]);

  return (
    <Canvas>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <spotLight position={[10, 15, 10]} angle={0.3} penumbra={1} intensity={2} />
      <Environment preset="city" />

      <Float speed={5.5} rotationIntensity={0.5} floatIntensity={0.9}>
        <group scale={model.scale} rotation={model.rotation}>
          <primitive object={scene.scene} />
        </group>
      </Float>

      <OrbitControls enableZoom={false} />
    </Canvas>
  );
};

export default TechIconCardExperience;
