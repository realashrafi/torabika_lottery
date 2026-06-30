"use client";

import { motion } from "framer-motion";
import { Participant } from "@/types";

export default function RandomWinnerCard({
                                             winner,
                                             index,
                                         }: {
    winner: Participant;
    index?: number;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
                duration: 0.45,
                delay: index ? index * 0.05 : 0,
                ease: "easeOut",
            }}
            className="
                relative overflow-hidden rounded-3xl
                border border-red-500/20
                bg-black/70 backdrop-blur-md
                shadow-[0_0_30px_rgba(220,38,38,0.12)]
                p-5
                min-h-[220px]
                flex flex-col justify-between
            "
        >
            {/* glow */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top,rgba(220,38,38,0.18),transparent_60%)]" />

            {/* badge */}
            <div className="relative z-10 flex items-center justify-between mb-5">
                <span
                    className="
                        inline-flex items-center gap-2
                        px-3 py-1 rounded-full
                        text-[10px] font-bold tracking-[0.25em]
                        text-yellow-300
                        border border-yellow-500/30
                        bg-yellow-500/10
                    "
                >
                    🏆 WINNER
                </span>

                {typeof index === "number" && (
                    <span className="text-xs text-red-300/70 font-semibold">
                        #{index + 1}
                    </span>
                )}
            </div>

            {/* content */}
            <div className="relative z-10">
                <h3 className="text-2xl font-black text-white leading-snug mb-3">
                    {winner.firstName} {winner.lastName}
                </h3>

                <div className="w-16 h-px bg-gradient-to-r from-red-500 to-transparent mb-4" />

                <div className="space-y-2">
                    <p className="text-sm text-gray-300">
                        {maskPhone(winner.phone)}
                    </p>

                    <p className="text-sm font-semibold text-red-400">
                        {winner.province}
                    </p>

                    {winner.row && (
                        <p className="text-xs text-gray-500">
                            Row: {winner.row}
                        </p>
                    )}
                </div>
            </div>
        </motion.div>
    );
}

function maskPhone(phone: string) {
    if (!phone) return "";
    const p = phone.toString();
    return p.slice(0, 4) + "***" + p.slice(-4);
}
