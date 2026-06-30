"use client"

import { useLotteryStore } from "@/store/lottery-store"

export default function NumberPad() {
    const addDigit = useLotteryStore((s) => s.addDigit)

    return (
        <div className="grid grid-cols-5 gap-5">

            {[0,1,2,3,4,5,6,7,8,9].map((n) => (
                <button
                    key={n}
                    onClick={() => addDigit(String(n))}
                    className="w-20 h-20 bg-red-600 text-white text-3xl rounded-xl hover:scale-110 transition"
                >
                    {n}
                </button>
            ))}

        </div>
    )
}
