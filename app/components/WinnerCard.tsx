"use client";
import { motion } from "framer-motion";
import { Participant } from "@/types";
import {useLotteryStore} from "@/store/lottery-store";

export default function WinnerCard({ winner }: { winner: Participant }) {
    const {reset } = useLotteryStore();
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl"
        >
            <motion.div
                initial={{ scale: 0.5, y: 100 }}
                animate={{ scale: 1, y: 0 }}
                className="bg-gradient-to-br from-red-600 to-red-900 p-1 rounded-[3rem] shadow-[0_0_100px_rgba(220,38,38,0.8)]"
            >
                <div className="bg-black p-16 rounded-[2.8rem] text-center flex flex-col items-center">
                    <div className="text-red-500 text-sm font-bold tracking-[0.3em] uppercase mb-4">Winner Found</div>
                    <h2 className="text-7xl font-black text-white mb-8 digit-glow">🎉 {winner.firstName} {winner.lastName} 🎉</h2>
                    <div className="h-1 w-32 bg-red-600 mb-8" />
                    <p className="text-3xl text-gray-300 font-light">{maskPhone(winner.phone)}</p>
                    <p className="text-2xl text-red-500 mt-2 font-bold">{winner.province}</p>

                    <button
                        onClick={reset}
                        className="mt-12 px-10 py-4 bg-red-600 hover:bg-red-700 text-white rounded-full font-bold transition-all shadow-lg hover:shadow-red-500/50"
                    >
                        START NEW DRAW
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
}

function maskPhone(phone: string) {
    if (!phone) return "";

    const p = phone.toString();

    return p.slice(0, 4) + "***" + p.slice(-4);
}