"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Float, Sparkles } from "@react-three/drei";
import { useReducedMotion } from "framer-motion";
import { useRef } from "react";
import * as THREE from "three";
import { getHeroMode, type HeroMode } from "./hero-modes";

type Vector3Tuple = [number, number, number];

const DEPTH_RINGS: Array<{
  position: Vector3Tuple;
  rotation: Vector3Tuple;
  scale: Vector3Tuple;
  opacity: number;
}> = [
  {
    position: [0, 0.08, -0.68],
    rotation: [1.48, 0.06, 0.04],
    scale: [2.62, 1.24, 1],
    opacity: 0.16,
  },
  {
    position: [0.08, 0.16, -0.18],
    rotation: [1.36, -0.16, 0.16],
    scale: [2.08, 0.98, 1],
    opacity: 0.2,
  },
  {
    position: [-0.12, 0.28, 0.42],
    rotation: [1.24, 0.18, -0.2],
    scale: [1.55, 0.74, 1],
    opacity: 0.15,
  },
];

const STAGE_BEAMS: Array<{
  position: Vector3Tuple;
  rotation: Vector3Tuple;
  scale: Vector3Tuple;
  opacity: number;
}> = [
  {
    position: [-2.15, -1.06, -1.2],
    rotation: [0.02, 0.18, 0],
    scale: [0.008, 0.008, 2.7],
    opacity: 0.12,
  },
  {
    position: [2.15, -1.06, -1.2],
    rotation: [0.02, -0.18, 0],
    scale: [0.008, 0.008, 2.7],
    opacity: 0.12,
  },
  {
    position: [-2.26, 1.24, -1.58],
    rotation: [0, 0.18, 0.04],
    scale: [0.008, 0.008, 2.2],
    opacity: 0.08,
  },
  {
    position: [2.26, 1.24, -1.58],
    rotation: [0, -0.18, -0.04],
    scale: [0.008, 0.008, 2.2],
    opacity: 0.08,
  },
  {
    position: [0, -1.1, -2.16],
    rotation: [0, 0, 0.01],
    scale: [2.8, 0.008, 0.008],
    opacity: 0.1,
  },
  {
    position: [0, 1.28, -2.16],
    rotation: [0, 0, -0.01],
    scale: [2.55, 0.008, 0.008],
    opacity: 0.07,
  },
];

const MATERIAL_HOTSPOTS: Array<{
  position: Vector3Tuple;
  label: string;
  zhLabel: string;
}> = [
  {
    position: [-1.1, 0.58, 0.46],
    label: "Obsidian glaze",
    zhLabel: "黑曜釉面",
  },
  {
    position: [0.58, 0.9, 0.3],
    label: "Gold fracture",
    zhLabel: "金箔裂層",
  },
  {
    position: [1.16, -0.12, -0.08],
    label: "Stone crust",
    zhLabel: "礦石塔殼",
  },
];

function CameraRig() {
  useFrame((state) => {
    const { camera, pointer } = state;
    const elapsed = state.clock.getElapsedTime();

    camera.position.x = THREE.MathUtils.lerp(
      camera.position.x,
      pointer.x * 0.48 + Math.sin(elapsed * 0.18) * 0.08,
      0.035,
    );
    camera.position.y = THREE.MathUtils.lerp(
      camera.position.y,
      0.16 + pointer.y * 0.2 + Math.cos(elapsed * 0.14) * 0.05,
      0.035,
    );
    camera.position.z = THREE.MathUtils.lerp(
      camera.position.z,
      5.25 + pointer.y * 0.12,
      0.03,
    );
    camera.lookAt(0, 0.12, 0);
  });

  return null;
}

function StrataSlab({
  position,
  scale,
  color,
}: {
  position: Vector3Tuple;
  scale: Vector3Tuple;
  color: string;
}) {
  return (
    <mesh position={position} scale={scale}>
      <boxGeometry args={[1, 0.18, 1]} />
      <meshStandardMaterial
        color={color}
        roughness={0.82}
        metalness={0.18}
        emissive={color}
        emissiveIntensity={0.035}
      />
    </mesh>
  );
}

function MineralShard({
  position,
  rotation,
  scale,
}: {
  position: Vector3Tuple;
  rotation: Vector3Tuple;
  scale: Vector3Tuple;
}) {
  return (
    <mesh position={position} rotation={rotation} scale={scale}>
      <coneGeometry args={[0.14, 0.64, 5]} />
      <meshStandardMaterial
        color="#bfa17a"
        roughness={0.36}
        metalness={0.74}
        emissive="#6f5537"
        emissiveIntensity={0.18}
      />
    </mesh>
  );
}

function MaterialHotspots({ activeMode }: { activeMode: HeroMode }) {
  const activeIndex =
    activeMode === "structure" ? 0 : activeMode === "texture" ? 1 : 2;

  return (
    <group>
      {MATERIAL_HOTSPOTS.map((hotspot, index) => (
        <group key={hotspot.label} position={hotspot.position}>
          <mesh scale={index === activeIndex ? 0.07 : 0.045}>
            <sphereGeometry args={[1, 18, 18]} />
            <meshBasicMaterial
              color={index === activeIndex ? "#f2d39b" : "#d0ad7a"}
              transparent
              opacity={index === activeIndex ? 0.95 : 0.62}
            />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]} scale={0.13}>
            <torusGeometry args={[1, 0.035, 8, 36]} />
            <meshBasicMaterial
              color={index === activeIndex ? "#f2d39b" : "#d0ad7a"}
              transparent
              opacity={index === activeIndex ? 0.56 : 0.24}
              depthWrite={false}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function GeologicalPastry({ activeMode }: { activeMode: HeroMode }) {
  const groupRef = useRef<THREE.Group>(null);
  const mode = getHeroMode(activeMode);
  const isTexture = activeMode === "texture";
  const isTime = activeMode === "time";

  useFrame((state) => {
    if (groupRef.current) {
      const elapsed = state.clock.getElapsedTime();
      const modeLift =
        activeMode === "structure" ? 0 : isTexture ? 0.05 : -0.03;
      const tempo = isTime ? 0.34 : 0.18;
      groupRef.current.rotation.y = Math.sin(elapsed * tempo) * 0.24;
      groupRef.current.rotation.x = -0.18 + Math.cos(elapsed * 0.12) * 0.055;
      groupRef.current.rotation.z = 0.08 + Math.sin(elapsed * 0.1) * 0.03;
      groupRef.current.position.y = modeLift + Math.sin(elapsed * 0.55) * 0.09;
      groupRef.current.position.z = Math.cos(elapsed * 0.22) * 0.09;
    }
  });

  return (
    <Float speed={0.75} rotationIntensity={0.16} floatIntensity={0.35}>
      <group ref={groupRef} rotation={[-0.18, -0.24, 0.08]} scale={1.34}>
        <StrataSlab
          position={[0, -0.32, 0]}
          scale={[2.7, 1, 1.58]}
          color="#1f1c1a"
        />
        <StrataSlab
          position={[0.08, -0.1, 0.02]}
          scale={[2.42, 1, 1.42]}
          color="#4b3729"
        />
        <StrataSlab
          position={[-0.04, 0.12, -0.02]}
          scale={[2.2, 1, 1.26]}
          color="#0f0f0f"
        />
        <StrataSlab
          position={[0.1, 0.35, 0.03]}
          scale={[1.86, 1, 1.02]}
          color="#70583d"
        />

        <mesh position={[0, 0.63, 0]} scale={[1.12, 0.3, 0.82]}>
          <sphereGeometry args={[1, 48, 24]} />
          <MeshDistortMaterial
            color="#15120f"
            distort={isTexture ? 0.36 : isTime ? 0.16 : 0.22}
            speed={isTime ? 0.35 : 0.65}
            roughness={isTexture ? 0.42 : 0.58}
            metalness={isTexture ? 0.72 : 0.58}
            emissive={mode.accent}
            emissiveIntensity={isTexture ? 0.18 : 0.1}
          />
        </mesh>

        <mesh
          position={[0.36, 0.82, 0.12]}
          rotation={[0.14, 0.22, -0.1]}
          scale={[0.48, 0.06, 0.26]}
        >
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial
            color={mode.accent}
            roughness={0.2}
            metalness={0.86}
            emissive={mode.accent}
            emissiveIntensity={isTime ? 0.38 : 0.24}
          />
        </mesh>

        <MineralShard
          position={[-0.72, 0.62, 0.14]}
          rotation={[0.2, 0.48, -0.28]}
          scale={[0.88, 1.12, 0.88]}
        />
        <MineralShard
          position={[0.86, 0.46, -0.2]}
          rotation={[-0.22, -0.35, 0.3]}
          scale={[0.58, 0.86, 0.58]}
        />
        <MineralShard
          position={[0.04, 0.92, -0.32]}
          rotation={[0.44, -0.18, 0.12]}
          scale={[0.42, 0.62, 0.42]}
        />

        <mesh position={[-0.52, 0.76, 0.36]} scale={[0.08, 0.08, 0.08]}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshStandardMaterial
            color="#f2d39b"
            emissive="#8b6437"
            emissiveIntensity={0.34}
            roughness={0.3}
          />
        </mesh>
        <mesh position={[0.74, 0.72, 0.34]} scale={[0.055, 0.055, 0.055]}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshStandardMaterial
            color="#f2d39b"
            emissive="#8b6437"
            emissiveIntensity={0.34}
            roughness={0.3}
          />
        </mesh>
      </group>
    </Float>
  );
}

function DepthArchitecture({ activeMode }: { activeMode: HeroMode }) {
  const groupRef = useRef<THREE.Group>(null);
  const mode = getHeroMode(activeMode);

  useFrame((state) => {
    if (groupRef.current) {
      const elapsed = state.clock.getElapsedTime();
      const speed = activeMode === "time" ? 0.22 : 0.11;
      groupRef.current.rotation.y = Math.sin(elapsed * speed) * 0.04;
      groupRef.current.position.z = Math.sin(elapsed * 0.16) * 0.08;
    }
  });

  return (
    <group ref={groupRef}>
      {DEPTH_RINGS.map((ring, index) => (
        <mesh
          key={`depth-ring-${index}`}
          position={ring.position}
          rotation={ring.rotation}
          scale={ring.scale}
        >
          <torusGeometry args={[1, 0.0035, 8, 128]} />
          <meshBasicMaterial
            color={mode.accent}
            transparent
            opacity={activeMode === "time" ? ring.opacity + 0.08 : ring.opacity}
            depthWrite={false}
          />
        </mesh>
      ))}
      {STAGE_BEAMS.map((beam, index) => (
        <mesh
          key={`stage-beam-${index}`}
          position={beam.position}
          rotation={beam.rotation}
          scale={beam.scale}
        >
          <boxGeometry args={[1, 1, 1]} />
          <meshBasicMaterial
            color={mode.accent}
            transparent
            opacity={beam.opacity}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}

function OrbitingMass({ activeMode }: { activeMode: HeroMode }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const mode = getHeroMode(activeMode);

  useFrame((state) => {
    if (meshRef.current) {
      const elapsed = state.clock.getElapsedTime();
      const speed = activeMode === "time" ? 0.18 : 0.08;
      meshRef.current.rotation.x = elapsed * speed;
      meshRef.current.rotation.y = elapsed * (speed + 0.03);
      meshRef.current.position.x = Math.sin(elapsed * 0.28) * 0.16;
      meshRef.current.position.y =
        activeMode === "texture"
          ? -0.18 + Math.sin(elapsed * 0.4) * 0.04
          : -0.3;
    }
  });

  return (
    <Float speed={0.9} rotationIntensity={0.24} floatIntensity={0.5}>
      <mesh ref={meshRef} position={[-1.45, -0.3, -1.1]} scale={1.24}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial
          color={activeMode === "texture" ? "#242a21" : "#3a2d24"}
          attach="material"
          distort={activeMode === "texture" ? 0.38 : 0.26}
          speed={activeMode === "time" ? 0.42 : 0.85}
          roughness={0.72}
          metalness={0.42}
          emissive={mode.accent}
          emissiveIntensity={activeMode === "time" ? 0.16 : 0.08}
        />
      </mesh>
    </Float>
  );
}

function StaticFallback({ activeMode }: { activeMode: HeroMode }) {
  const mode = getHeroMode(activeMode);

  return (
    <div
      className="absolute inset-0"
      style={{
        background: `radial-gradient(ellipse at 52% 45%, ${mode.glow}, transparent 35%), radial-gradient(ellipse at 35% 60%, rgba(74,82,64,0.2), transparent 32%)`,
      }}
    >
      <div
        className="absolute left-1/2 top-1/2 h-[38vmin] w-[58vmin] -translate-x-1/2 -translate-y-1/2 rotate-[-8deg] border bg-black/30"
        style={{
          borderColor: `${mode.accent}55`,
          boxShadow: `0 0 80px ${mode.glow}`,
        }}
      />
    </div>
  );
}

export default function FluidBackground({
  activeMode = "structure",
}: {
  activeMode?: HeroMode;
}) {
  const prefersReducedMotion = useReducedMotion();
  const mode = getHeroMode(activeMode);

  if (prefersReducedMotion) {
    return (
      <div className="absolute inset-0 z-0 opacity-100 pointer-events-none">
        <StaticFallback activeMode={activeMode} />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 z-0 opacity-100 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0.15, 5.2], fov: 38 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        performance={{ min: 0.55 }}
        onCreated={({ gl }) => {
          gl.domElement.setAttribute("role", "img");
          gl.domElement.setAttribute(
            "aria-label",
            "Animated three-dimensional geological pastry sculpture with obsidian glaze, gold fracture, stone crust, orbiting mineral mass, and depth guide rings.",
          );
        }}
      >
        <CameraRig />
        <color attach="background" args={["#0a0a0a"]} />
        <ambientLight intensity={activeMode === "texture" ? 0.74 : 0.62} />
        <pointLight position={[3, 4, 4]} intensity={5.5} color={mode.accent} />
        <pointLight position={[-4, -2, 3]} intensity={1.4} color="#8ba18f" />
        <spotLight
          position={[0, 3.2, 2.4]}
          angle={0.32}
          penumbra={0.8}
          intensity={activeMode === "time" ? 3.4 : 2.8}
          color="#f5e6c8"
        />
        <DepthArchitecture activeMode={activeMode} />
        <GeologicalPastry activeMode={activeMode} />
        <MaterialHotspots activeMode={activeMode} />
        <OrbitingMass activeMode={activeMode} />
        <Sparkles
          count={activeMode === "texture" ? 92 : 58}
          speed={activeMode === "time" ? 0.36 : 0.22}
          opacity={activeMode === "texture" ? 0.58 : 0.4}
          color={mode.accent}
          size={activeMode === "texture" ? 1.18 : 1.05}
          scale={[4.8, 3, 3.2]}
        />
      </Canvas>
    </div>
  );
}
