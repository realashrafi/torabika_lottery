"use client"

import { motion } from "framer-motion"

export default function DigitDisplay({ digits }: { digits: string[] }) {
    const slots = 5

    const padded = [...digits]

    while (padded.length < slots) {
        padded.unshift("-")
    }

    return (
        <div className="flex gap-6">

            {padded.map((d, i) => (
                <motion.div
                    key={i}
                    initial={{ scale: 0.7, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-24 h-28 bg-red-600 text-white text-6xl flex items-center justify-center rounded-xl shadow-lg"
                >
                    {d}
                </motion.div>
            ))}

        </div>
    )
}
