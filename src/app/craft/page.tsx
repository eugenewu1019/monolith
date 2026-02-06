"use client";

import { motion, useScroll, MotionValue } from "framer-motion";
import { ShieldCheck, Thermometer, Wind } from "lucide-react";
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, ContactShadows, Float, OrthographicCamera } from "@react-three/drei";
import * as THREE from "three";
import BehindScenesSection from "@/components/sections/behind-scenes-section";
import { useTranslation } from "@/lib/i18n";

// --- Deterministic pseudo-random (pure) ---
// Avoid Math.random() in render to satisfy react-hooks/purity.
function prand(seed: number) {
    const x = Math.sin(seed * 9999) * 10000;
    return x - Math.floor(x);
}

// --- R3F Components ---

function CakeLayer({
    position,
    args,
    color,
    materialProps,
    progress,
    index
}: {
    position: [number, number, number],
    args: [number, number, number, number],
    color: string,
    materialProps?: Partial<THREE.MeshPhysicalMaterialParameters>,
    progress: MotionValue<number>,
    index: number
}) {
    const meshRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (!meshRef.current) return;
        const currentProgress = progress.get();

        const finalY = position[1];
        // Reduced spread to ensure visibility
        const startY = finalY + 2.5 + (index * 1.5);

        const startP = index * 0.22;
        const endP = startP + 0.2;

        let localP = (currentProgress - startP) / (endP - startP);
        localP = Math.max(0, Math.min(1, localP));

        const eased = 1 - Math.pow(1 - localP, 3);

        const currentY = THREE.MathUtils.lerp(startY, finalY, eased);

        meshRef.current.position.y = currentY;

        // Float animation when not yet assembled
        if (localP < 0.99) {
            meshRef.current.position.y += Math.sin(state.clock.elapsedTime + index) * 0.05;
        }

        meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    });

    return (
        <group ref={meshRef} position={[position[0], 0, position[2]]}>
            <mesh castShadow receiveShadow>
                <cylinderGeometry args={args} />
                <meshPhysicalMaterial
                    color={color}
                    roughness={0.2}
                    metalness={0.1}
                    clearcoat={0.5}
                    clearcoatRoughness={0.1}
                    {...materialProps}
                />
            </mesh>
            <mesh>
                <cylinderGeometry args={[args[0] + 0.02, args[1] + 0.02, args[2], args[3], 1, true]} />
                <meshBasicMaterial color="white" wireframe transparent opacity={0.1} />
            </mesh>
        </group>
    );
}

function AssemblyScene({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
    return (
        <>
            {/* Adjusted Camera to look at center */}
            <OrthographicCamera
                makeDefault
                position={[20, 20, 20]}
                zoom={40}
                near={-50}
                far={200}
                onUpdate={c => c.lookAt(0, 0, 0)}
            />
            <Environment preset="city" />

            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 20, 10]} intensity={1} castShadow />
            <pointLight position={[-10, 0, -10]} intensity={0.5} color="#d4af37" />

            <group position={[0, -2, 0]}>
                <CakeLayer
                    index={0}
                    progress={scrollYProgress}
                    position={[0, 0, 0]}
                    args={[2.2, 2.0, 0.5, 32]}
                    color="#1a1a1a"
                    materialProps={{ roughness: 0.9, metalness: 0 }}
                />
                <CakeLayer
                    index={1}
                    progress={scrollYProgress}
                    position={[0, 0.6, 0]}
                    args={[2.0, 2.0, 0.6, 32]}
                    color="#2a1f1a"
                    materialProps={{ roughness: 0.1, clearcoat: 1 }}
                />
                <CakeLayer
                    index={2}
                    progress={scrollYProgress}
                    position={[0, 1.4, 0]}
                    args={[2.0, 2.0, 1.0, 32]}
                    color="#f0f0f0"
                    materialProps={{ transmission: 0.1, thickness: 2, roughness: 0.4 }}
                />
                <CakeLayer
                    index={3}
                    progress={scrollYProgress}
                    position={[0, 2.2, 0]}
                    args={[0.3, 0.0, 0.4, 32]}
                    color="#d4af37"
                    materialProps={{ metalness: 1, roughness: 0.1, color: "#d4af37", emissive: "#8a6d1c", emissiveIntensity: 0.2 }}
                />
            </group>

            <ContactShadows position={[0, -2, 0]} opacity={0.4} scale={10} blur={2.5} far={4} />

            <Float speed={2} rotationIntensity={1} floatIntensity={1}>
                {[...Array(5)].map((_, i) => {
                    const x = prand(i * 3 + 1) * 6 - 3;
                    const y = prand(i * 3 + 2) * 6 - 2;
                    const z = prand(i * 3 + 3) * 6 - 3;
                    return (
                        <mesh key={i} position={[x, y, z]}>
                            <dodecahedronGeometry args={[0.1]} />
                            <meshBasicMaterial color="#d4af37" transparent opacity={0.4} wireframe />
                        </mesh>
                    );
                })}
            </Float>
        </>
    );
}

// --- Regular Components ---

function BlueprintHero() {
    const { t } = useTranslation();
    return (
        <section className="h-[40vh] flex flex-col items-center justify-center relative overflow-hidden border-b border-white/10">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none" />

            <div className="relative z-10 text-center mix-blend-difference">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.5, ease: "circOut" }}
                >
                    <h1 className="text-5xl md:text-7xl font-mono font-bold tracking-tighter text-white mb-2">{t("craftPage.blueprint")}</h1>
                    <p className="text-lg md:text-xl font-zh-serif text-zodiac-gold tracking-[0.5em] uppercase">{t("craftPage.structureDeconstruction")}</p>
                </motion.div>
            </div>

            <div className="absolute inset-0 pointer-events-none">
                <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] border border-white/5 rounded-full"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />
            </div>
        </section>
    );
}

function AssemblySection() {
    const { t } = useTranslation();
    const STEPS = [
        { id: "01", phaseKey: "foundation", titleKey: "loadBearingCrust", descKey: "loadBearingCrustDesc" },
        { id: "02", phaseKey: "core", titleKey: "viscosityControl", descKey: "viscosityControlDesc" },
        { id: "03", phaseKey: "elevation", titleKey: "aeratedMousse", descKey: "aeratedMousseDesc" },
        { id: "04", phaseKey: "finish", titleKey: "surfaceTension", descKey: "surfaceTension" }
    ];
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    return (
        <section ref={containerRef} className="relative h-[400vh] bg-zodiac-black text-white">
            <div className="sticky top-0 h-screen flex">
                <div className="w-1/2 h-full bg-neutral-900 relative border-r border-white/10">
                    <div className="absolute inset-0">
                        <Canvas shadows dpr={[1, 2]}>
                            <AssemblyScene scrollYProgress={scrollYProgress} />
                        </Canvas>
                    </div>

                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
                    <div className="absolute bottom-8 left-8 p-4 font-mono text-xs opacity-50 bg-black/50 backdrop-blur border border-white/10">
                        MODEL: TART_V2<br />
                        RENDER: REALTIME_R3F<br />
                        STATUS: ASSEMBLING
                    </div>
                </div>

                <div className="w-1/2 h-full z-[-1]" />
            </div>

            <div className="absolute top-0 right-0 w-1/2">
                {STEPS.map((step) => (
                    <div key={step.id} className="h-[100vh] flex flex-col justify-center px-12 md:px-24 border-b border-white/5 bg-zodiac-black/90 backdrop-blur-sm">
                        <div className="mb-4 flex items-center gap-4">
                            <span className="font-mono text-zodiac-gold border border-zodiac-gold px-2 text-xs">{t("craftPage.step")} {step.id}</span>
                            <span className="text-xs uppercase tracking-widest opacity-50">{t(`craftPage.${step.phaseKey}`)}</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-serif mb-2">{t(`craftPage.${step.titleKey}`)}</h2>
                        <h3 className="text-xl font-zh-serif opacity-50 mb-8">{t(`craftPage.${step.phaseKey}`)}</h3>
                        <p className="text-lg text-white/60 font-light leading-relaxed max-w-md">
                            {t(`craftPage.${step.descKey}`)}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}

const MATERIALS = [
    { id: "V", num: 23, name: "Vanilla", zh: "香草", origin: "Madagascar", mass: "195.2" },
    { id: "Na", num: 11, name: "Sea Salt", zh: "海鹽", origin: "Brittany", mass: "58.4" },
    { id: "Ma", num: 15, name: "Matcha", zh: "抹茶", origin: "Kyoto", mass: "312.5" },
    { id: "C", num: 6, name: "Cacao", zh: "可可", origin: "Ecuador", mass: "12.0" },
    { id: "Au", num: 79, name: "Gold", zh: "金箔", origin: "Kanazawa", mass: "196.9" },
    { id: "N", num: 7, name: "Nitro", zh: "氮氣", origin: "Atmosphere", mass: "14.0" },
];

function IngredientsGrid() {
    const { t } = useTranslation();
    return (
        <section className="py-32 px-8 bg-black border-t border-white/10">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-end justify-between mb-16">
                    <div>
                        <h2 className="text-4xl font-serif mb-2">{t("craftPage.molecularComponents")}</h2>
                        <p className="font-zh-serif text-white/50">{t("craftPage.molecularOrigin")}</p>
                    </div>
                    <div className="font-mono text-xs opacity-30 text-right hidden md:block">
                        <p>{t("craftPage.periodicTable")}</p>
                        <p>{t("craftPage.sourceVerified")}</p>
                    </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {MATERIALS.map((mat, i) => (
                        <motion.div
                            key={mat.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="aspect-[4/5] bg-white/5 border border-white/10 p-4 flex flex-col justify-between hover:bg-white/10 hover:border-zodiac-gold/50 transition-all group cursor-crosshair relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-zodiac-gold/10 scale-y-0 group-hover:scale-y-100 transition-transform origin-bottom duration-500 ease-out" />
                            <div className="relative z-10 flex justify-between items-start text-xs opacity-50 font-mono">
                                <span>{mat.num}</span>
                                <span>{mat.mass}</span>
                            </div>
                            <div className="relative z-10 text-center">
                                <h3 className="text-4xl font-bold font-serif mb-1 group-hover:text-zodiac-gold transition-colors">{mat.id}</h3>
                                <p className="text-[10px] uppercase tracking-widest opacity-70">{mat.name}</p>
                            </div>
                            <div className="relative z-10 text-xs font-zh-serif opacity-50 text-center group-hover:opacity-100">
                                {mat.origin}<br />{mat.zh}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function LabHUD() {
    const { t } = useTranslation();
    return (
        <section className="py-24 bg-black border-t border-white/10 relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[size:100%_4px] opacity-20 pointer-events-none" />
            <div className="max-w-7xl mx-auto px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 font-mono">
                    <div className="col-span-1 border-l-2 border-green-500 pl-4">
                        <h4 className="text-xs text-green-500 mb-2 flex items-center gap-2">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" /> {t("craftPage.systemStatus")}
                        </h4>
                        <p className="text-2xl text-white">{t("craftPage.optimal")}</p>
                    </div>
                    <div className="col-span-1 md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white/5 p-6 border border-white/10">
                            <div className="flex justify-between mb-4 text-xs opacity-50"><span>{t("craftPage.temp")}</span><Thermometer className="w-4 h-4" /></div>
                            <div className="text-4xl text-white mb-1">18.0°C</div>
                            <div className="text-[10px] text-white/30">{t("craftPage.constant")}</div>
                        </div>
                        <div className="bg-white/5 p-6 border border-white/10">
                            <div className="flex justify-between mb-4 text-xs opacity-50"><span>{t("craftPage.air")}</span><Wind className="w-4 h-4" /></div>
                            <div className="text-4xl text-white mb-1">HEPA</div>
                            <div className="text-[10px] text-white/30">ISO CLASS 5</div>
                        </div>
                        <div className="bg-white/5 p-6 border border-white/10">
                            <div className="flex justify-between mb-4 text-xs opacity-50"><span>{t("craftPage.hygiene")}</span><ShieldCheck className="w-4 h-4" /></div>
                            <div className="text-4xl text-white mb-1">100%</div>
                            <div className="text-[10px] text-white/30">HACCP CERTIFIED</div>
                        </div>
                    </div>
                </div>
                <div className="mt-16 overflow-hidden flex opacity-20 text-[10vw] font-mono leading-none whitespace-nowrap">
                    <motion.div animate={{ x: "-50%" }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>
                        PRECISION ENGINEERING / STRUCTURAL INTEGRITY / TASTE ARCHITECTURE / PRECISION ENGINEERING / STRUCTURAL INTEGRITY / TASTE ARCHITECTURE /
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

export default function CraftPage() {
    return (
        <main className="bg-zodiac-black min-h-screen">
            <BlueprintHero />
            <AssemblySection />
            <IngredientsGrid />
            <LabHUD />
            <BehindScenesSection />
        </main>
    );
}
