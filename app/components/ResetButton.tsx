"use client"

import { useLotteryStore } from "@/store/lottery-store"

export default function ResetButton() {
    const reset = useLotteryStore((s) => s.reset)

    return (
        <button
            onClick={reset}
            className="bg-gray-800 text-white px-6 py-3 rounded-lg"
        >
            Reset
        </button>
    )
}
