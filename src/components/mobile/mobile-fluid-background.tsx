"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere, Float } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function MobileAnimatedSphere() {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            // Slower rotation for mobile
            meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.05;
            meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.08;
        }
    });

    return (
        <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.8}>
            {/* Reduced segments for performance (32 vs 64) */}
            <Sphere args={[1.4, 32, 32]} ref={meshRef} scale={1.5}>
                <MeshDistortMaterial
                    color="#5a4535"
                    attach="material"
                    distort={0.3} // Less distortion
                    speed={1.2}
                    roughness={0.6}
                    metalness={0.6}
                />
            </Sphere>
        </Float>
    );
}

export default function MobileFluidBackground() {
    return (
        <div className="absolute inset-0 z-0 opacity-80 pointer-events-none">
            {/* dpr prop helps performance on high-res mobile screens */}
            <Canvas camera={{ position: [0, 0, 5] }} dpr={[1, 1.5]}>
                <ambientLight intensity={1.2} />
                <pointLight position={[10, 10, 10]} intensity={2} color="#ffeeb0" />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ffffff" />
                <MobileAnimatedSphere />
            </Canvas>
        </div>
    );
}
