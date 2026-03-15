"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useRef } from "react";

function Scene() {
  const orbRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    const mx = state.mouse.x; // -1..1
    const my = state.mouse.y;

    // Whole scene parallax
    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        mx * 0.25,
        0.06
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        -my * 0.18,
        0.06
      );
    }

    // Orb micro-rotation + wobble follow
    if (orbRef.current) {
      orbRef.current.rotation.y += delta * 0.25;
      orbRef.current.rotation.x += delta * 0.10;

      orbRef.current.position.x = THREE.MathUtils.lerp(
        orbRef.current.position.x,
        mx * 0.35,
        0.06
      );
      orbRef.current.position.y = THREE.MathUtils.lerp(
        orbRef.current.position.y,
        my * 0.25,
        0.06
      );
    }

    // Camera subtle parallax (feels 3D expensive)
    state.camera.position.x = THREE.MathUtils.lerp(
      state.camera.position.x,
      mx * 0.55,
      0.05
    );
    state.camera.position.y = THREE.MathUtils.lerp(
      state.camera.position.y,
      my * 0.25,
      0.05
    );
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <group ref={groupRef}>
      <Float speed={2.2} rotationIntensity={1.8} floatIntensity={2.2}>
        <mesh ref={orbRef} scale={2.35}>
          <sphereGeometry args={[1, 128, 128]} />
          <MeshDistortMaterial
            color="#7c7cff"
            distort={0.55}
            speed={2.8}
            roughness={0.12}
            metalness={0.9}
          />
        </mesh>
      </Float>

      {/* A subtle “aura” ring behind the orb */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -0.9]}>
        <ringGeometry args={[1.55, 2.25, 128]} />
        <meshStandardMaterial
          color="#00e5ff"
          transparent
          opacity={0.12}
          roughness={0.8}
          metalness={0.2}
        />
      </mesh>
    </group>
  );
}

export default function HeroCanvas() {
  return (
    <div className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[2, 2, 2]} intensity={1.2} />
        <pointLight position={[-3, -2, -2]} intensity={0.7} />
        <Scene />
      </Canvas>

      {/* cinematic overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(124,124,255,0.18),rgba(0,0,0,0.92)_65%)]" />
    </div>
  );
}
