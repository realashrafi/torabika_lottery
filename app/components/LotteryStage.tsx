"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Text, Float, MeshReflectorMaterial, Environment, Stars } from "@react-three/drei"
import { Suspense } from "react"
import { useLotteryStore } from "@/store/lottery-store"

function DigitSlot({ char, position }: { char: string, position: [number, number, number] }) {
    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <mesh position={position}>
                {/* قاب عدد */}
                <boxGeometry args={[1.2, 1.8, 0.2]} />
                <meshStandardMaterial color="#111" roughness={0.1} metalness={0.8} />

                {/* خودِ عدد با افکت نئون قرمز */}
                <Text
                    position={[0, 0, 0.15]}
                    fontSize={1.2}
                    color="#ff0000"
                    font="/fonts/Geist-Bold.ttf" // اگر فونت نداری فعلاً پیش‌فرض می‌ماند
                    anchorX="center"
                    anchorY="middle"
                >
                    {char}
                    <meshBasicMaterial color={[5, 0, 0]} toneMapped={false} />
                </Text>
            </mesh>
        </Float>
    )
}

export default function LotteryStage() {
    const digits = useLotteryStore((state) => state.digits)

    // پد کردن اعداد تا ۵ رقم (مثلاً ۱۲ می‌شود ۰۰۰۱۲)
    const displayDigits = [...Array(5)].map((_, i) => {
        const reversedDigits = [...digits].reverse()
        return reversedDigits[i] || "0"
    }).reverse()

    return (
        <div className="w-full h-[60vh] bg-black">
            <Canvas shadows camera={{ position: [0, 0, 10], fov: 45 }}>
                <color attach="background" args={["#050505"]} />
                <fog attach="fog" args={["#050505", 10, 25]} />

                <Suspense fallback={null}>
                    {/* نورپردازی استودیویی */}
                    <ambientLight intensity={0.2} />
                    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} color="#ff0000" castShadow />
                    <pointLight position={[-10, -10, -10]} color="#ff0000" intensity={1} />

                    {/* نمایش ۵ اسلات اعداد */}
                    {displayDigits.map((d, i) => (
                        <DigitSlot key={i} char={d} position={[(i - 2) * 1.5, 1, 0]} />
                    ))}

                    {/* کف استیج با بازتاب (مثل عکس) */}
                    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
                        <planeGeometry args={[50, 50]} />
                        <MeshReflectorMaterial
                            blur={[300, 100]}
                            resolution={2048}
                            mixBlur={1}
                            mixStrength={40}
                            roughness={1}
                            depthScale={1.2}
                            minDepthThreshold={0.4}
                            maxDepthThreshold={1.4}
                            color="#101010"
                            metalness={0.5}
                        />
                    </mesh>

                    {/* ستاره‌های پس‌زمینه برای عمق بیشتر */}
                    <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

                    <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 2.5} />
                </Suspense>
            </Canvas>
        </div>
    )
}
