"use client"



import {useLotteryStore} from "@/store/lottery-store";

export default function ResetAllButton() {
    const resetAll = useLotteryStore((s) => s.resetAll)

    const handleReset = () => {
        const confirmed = window.confirm(
            "Are you sure you want to reset the entire lottery? All winners will be cleared."
        )

        if (!confirmed) return

        resetAll()
    }

    return (
        <button
            onClick={handleReset}
            className="
        fixed top-6 left-6 z-50
        px-2 py-1
        bg-red-600 hover:bg-red-700
        text-white
        rounded-lg
        shadow-lg
        text-sm
        transition
      "
        >
            R
        </button>
    )
}
