"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere, Float } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function AnimatedSphere() {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            // Subtle rotation
            meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.1;
            meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
        }
    });

    return (
        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
            <Sphere args={[1.5, 64, 64]} ref={meshRef} scale={1.8}>
                <MeshDistortMaterial
                    color="#5a4535" // Earthy bronze/stone base
                    attach="material"
                    distort={0.4}
                    speed={1.5}
                    roughness={0.5}
                    metalness={0.7}
                />
            </Sphere>
        </Float>
    );
}

export default function FluidBackground() {
    return (
        <div className="absolute inset-0 z-0 opacity-100 pointer-events-none">
            <Canvas camera={{ position: [0, 0, 5] }}>
                <ambientLight intensity={1.5} />
                <pointLight position={[10, 10, 10]} intensity={3} color="#ffeeb0" />
                <pointLight position={[-10, -10, -10]} intensity={1} color="#ffffff" />
                <AnimatedSphere />
            </Canvas>
        </div>
    );
}
