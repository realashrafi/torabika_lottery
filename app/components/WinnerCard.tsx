"use client"

import { motion } from "framer-motion"
import { Participant } from "@/types"

export default function WinnerCard({ winner }: { winner: Participant }) {
    return (
        <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center"
        >
            <div className="bg-white p-16 rounded-3xl text-center shadow-2xl">

                <h1 className="text-5xl font-bold text-red-600 mb-8">
                    🎉 برنده 🎉
                </h1>

                <p className="text-3xl">
                    {winner.firstName} {winner.lastName}
                </p>

                <p className="text-xl mt-4">
                    {winner.phone}
                </p>

                <p className="text-lg mt-2 text-gray-600">
                    {winner.province}
                </p>

            </div>
        </motion.div>
    )
}
