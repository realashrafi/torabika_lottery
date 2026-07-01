"use client";

import { useLotteryStore } from "@/store/lottery-store";

export const PRIZES = [
    { id: "ps5", name: "PS5", image: "PS5.png" },
    { id: "a56", name: "گوشی موبایل samsung A56", image: "A56.png" },
    { id: "a16", name: "گوشی موبایل samsung A16", image: "A16.png" },
    { id: "flip7", name: "اسپیکر FLIP7 JBL", image: "flip7.png" },
    { id: "charge6", name: "اسپیکرCHARGE6 JBL", image: "CHARGE6.png" },
    { id: "handsfree", name: "هندزفریJBL", image: "WaveBeam.png" },
    { id: "tune720", name: "هدفون TUNE 720JBL", image: "tune720.png" },
    { id: "blackshark", name: "هدست BLACK SHARCK", image: "BLACKSHARCK.png" },
    { id: "torabika", name: "اشتراک یک ساله کاپوچینو ترابیکا", image: "oneyear.png" },
];

interface PrizeSelectorProps {
    className?: string;
    shadow?: boolean;
}

export default function PrizeSelector({
                                          className = "mb-10",
                                          shadow = true,
                                      }: PrizeSelectorProps) {
    const { prizeTitle, setPrizeTitle } = useLotteryStore();

    // پیدا کردن جایزه انتخاب‌شده فعلی
    const selectedPrize = PRIZES.find((p) => p.name === prizeTitle);

    return (
        <div className={`p-3 font-bold rounded-3xl bg-red-900/20 border border-red-500/20 backdrop-blur-sm ${className}`}>
            {/* کانتینر relative برای قرار دادن عکس روی Select */}
            <div className="relative w-[500px] h-24">
                <select

                    value={prizeTitle}
                    onChange={(e) => setPrizeTitle(e.target.value)}
                    className={` w-full h-full rounded-xl text-white text-2xl font-black border-2 border-red-500/50 bg-gradient-to-b from-red-600 to-red-900 cursor-pointer px-4 appearance-none focus:outline-none ${
                        shadow ? "shadow-[0_0_20px_rgba(220,38,38,0.35)]" : ""
                    } ${
                        // اگر جایزه‌ای انتخاب شده متن را سمت چپ می‌بریم تا با عکس تداخل نکند
                        selectedPrize ? "text-right pr-14" : "text-center"
                    }`}
                >
                    <option value="" className="bg-red-950  text-gray-400">
                        انتخاب جایزه / Select Prize
                    </option>
                    {PRIZES.map((prize) => (
                        <option
                            key={prize.id}
                            value={prize.name}
                            className="bg-red-950 text-white text-lg"
                        >
                            {prize.name}
                        </option>
                    ))}
                </select>

                {/* عکس جایزه داخل اینپوت  */}
                {selectedPrize && (
                    <div className="absolute top-1/2 left-3 -translate-y-1/2 w-20 h-20 flex items-center justify-center bg-black/30 rounded-xl p-1 border border-red-500/30">
                        <img
                            src={selectedPrize.image}
                            alt={selectedPrize.name}
                            className="max-w-full max-h-full object-contain"
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
