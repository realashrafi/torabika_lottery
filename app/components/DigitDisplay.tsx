"use client";
import { motion } from "framer-motion";

export default function DigitDisplay({ digits }: { digits: string }) {
    // همیشه ۵ جایگاه را نشان می‌دهیم
    const displayArray = Array.from({ length: 5 }, (_, i) => digits[i] || "0");

    return (
        <div className="flex gap-4 p-6 bg-red-900/20 rounded-3xl border border-red-500/20 backdrop-blur-sm">
            {displayArray.map((digit, i) => (
                <motion.div
                    key={i}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3, delay: i * 0.1 }}
                    className={`
            w-32 h-44 rounded-2xl flex items-center justify-center
            border-4 border-red-500/50
            bg-gradient-to-b from-red-600 to-red-900
            shadow-[0_0_50px_rgba(220,38,38,0.4),inset_0_0_20px_rgba(0,0,0,0.5)]
            relative
          `}
                >
                    {/* افکت شیشه‌ای روی هر عدد */}
                    <div className="absolute inset-2 border border-white/10 rounded-xl" />

                    <span className="text-8xl font-mono font-black text-white digit-glow">
            {digit}
          </span>
                </motion.div>
            ))}
        </div>
    );
}
