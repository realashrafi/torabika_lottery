"use client";

import { motion } from "framer-motion";
import { Participant } from "@/types";
import { useLotteryStore } from "@/store/lottery-store";
import Image from "next/image";
import { useEffect, useRef } from "react";

export default function WinnerCard({ winner }: { winner: Participant }) {
    const { reset } = useLotteryStore();
    const particleRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const cleanup = createParticles();
        return () => cleanup?.();
    }, []);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-black">

            {/* background cinematic glow */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.25),transparent_70%)]" />

            {/* particle layer */}
            <div
                ref={particleRef}
                className="absolute inset-0 pointer-events-none overflow-hidden z-10"
            />

            {/* logo */}
            <motion.div
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-5 z-30 flex flex-col items-center"
            >
                <img
                    src="/Poster-head.png"
                    alt="Company Logo"
                    width={400}
                    height={150}
                    className="opacity-90"
                />
            </motion.div>

            {/* spotlight */}
            <div className="absolute w-[700px] h-[700px] rounded-full bg-red-600/20 blur-[160px] pointer-events-none z-5" />

            {/* main panel */}
            <motion.div
                initial={{ scale: 0.7, opacity: 0, y: 40 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ type: "spring", damping: 14 }}
                className="
                    relative z-40
                    w-[760px]
                    p-[3px]
                    rounded-[40px]
                    bg-gradient-to-br from-yellow-400 via-red-500 to-red-900
                    shadow-[0_0_140px_rgba(220,38,38,0.7)]
                "
            >
                <div
                    className="
                    relative
                    bg-white/80
                    rounded-[38px]
                    px-20 py-20
                    text-center
                    border border-red-500/30
                    overflow-hidden
                    z-50
                    "
                >
                    <img src="/Logo.png" className={'absolute bottom-10 right-1'} width={150} alt="logo"/>
                    <img src="/cup.png" className={'absolute bottom-10 left-1'} width={150} alt="logo"/>

                    {/* subtle glow inside */}
                    <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top,rgba(255,215,0,0.15),transparent_60%)]" />

                    {/* winner badge */}
                    <div className="
                        inline-block
                        px-6 py-2
                        mb-8
                        rounded-full
                        text-sm font-bold
                        tracking-[0.35em]
                        text-black
                        border border-yellow-500/40
                        bg-yellow-500/10
                        backdrop-blur
                    ">
                        🏆 WINNER
                    </div>

                    {/* winner name */}
                    <motion.h1
                        initial={{ scale: 0.9 }}
                        animate={{ scale: [0.95, 1.02, 1] }}
                        transition={{ duration: 0.8 }}
                        className="
                            text-7xl
                            font-black
                            text-red-500
                            leading-tight
                            mb-10
                            tracking-tight
                            drop-shadow-[0_0_25px_rgba(255,215,0,0.6)]
                        "
                    >
                        {winner.firstName} {winner.lastName}
                    </motion.h1>

                    {/* divider */}
                    <div className="
                        w-40 h-[2px]
                        mx-auto mb-10
                        bg-gradient-to-r
                        from-transparent via-red-500 to-transparent
                    " />

                    {/* info section */}
                    <div className="space-y-3 mb-12">

                        <p className="text-3xl text-gray-800 tracking-wide">
                            {maskPhone(winner.phone)}
                        </p>

                        <p className="text-xl text-red-400 font-semibold tracking-wide">
                            {winner.province}
                        </p>

                    </div>

                    {/* action */}
                    <button
                        onClick={reset}
                        className="
                            px-14 py-4
                            rounded-full
                            font-bold
                            text-white
                            bg-gradient-to-b from-red-500 to-red-700
                            border border-red-400/40
                            shadow-[0_0_40px_rgba(220,38,38,0.8)]
                            hover:shadow-[0_0_80px_rgba(220,38,38,1)]
                            transition-all
                            cursor-pointer
                            z-50
                        "
                    >
                        START NEW DRAW
                    </button>
                </div>
            </motion.div>
        </div>
    );


    /* BARISHI GOLD PARTICLES */
    function createParticles(): () => void {
        const container = particleRef.current;
        if (!container) return () => {};

        const spawn = () => {
            const p = document.createElement("div");
            const size = Math.random() * 6 + 3;

            p.style.position = "absolute";
            p.style.width = `${size}px`;
            p.style.height = `${size}px`;
            p.style.borderRadius = "50%";
            p.style.background =
                "radial-gradient(circle,#fff6b0,#ffd700,#ffb300)";
            p.style.boxShadow = "0 0 8px #ffd700";

            p.style.left = Math.random() * 100 + "%";
            p.style.top = "-20px";

            container.appendChild(p);

            const drift = (Math.random() - 0.5) * 200;
            const duration = 3200 + Math.random() * 2800;
            const rotate = Math.random() * 360;

            p.animate(
                [
                    { transform: "translateY(0) translateX(0) rotate(0deg)", opacity: 0 },
                    { opacity: 1, offset: 0.1 },
                    {
                        transform: `translateY(110vh) translateX(${drift}px) rotate(${rotate}deg)`,
                        opacity: 0
                    }
                ],
                {
                    duration,
                    easing: "linear"
                }
            );

            setTimeout(() => p.remove(), duration);
        };

        const interval = setInterval(spawn, 70);

        return () => clearInterval(interval);
    }
}

function maskPhone(phone: string) {
    if (!phone) return "";
    const p = phone.toString();
    return p.slice(0, 4) + "***" + p.slice(-4);
}
