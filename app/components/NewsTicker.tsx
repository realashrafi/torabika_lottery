"use client";

import { useLotteryStore } from "@/store/lottery-store";

export default function NewsTicker() {
    const allRows = useLotteryStore((s) => s.allRows);
    const availableRows = useLotteryStore((s) => s.availableRows);
    const winnerHistory = useLotteryStore((s) => s.winnerHistory);

    const lastWinners = winnerHistory.slice(-10).reverse();

    return (
        <div className="fixed bottom-0 left-0 w-full z-50 bg-black/80 border-t border-red-500/30 overflow-hidden">

            <div className="whitespace-nowrap animate-[ticker_40s_linear_infinite] flex items-center gap-16 px-6 py-2 text-sm">

                <span className="text-white font-semibold">
                    Total Participants: {allRows.length.toLocaleString()}
                </span>

                <span className="text-red-400 font-semibold">
                    Remaining Chances: {availableRows.length.toLocaleString()}
                </span>

                <span className="text-yellow-400 font-semibold">
                    Total Winners: {winnerHistory.length.toLocaleString()}
                </span>

                {lastWinners.map((record, i) => (
                    <span
                        key={`${record.participant.row}-${record.date}-${i}`}
                        className="text-white"
                    >
                        🏆 {record.prizeTitle} → {record.participant.firstName}{" "}
                        {record.participant.lastName} (Row {record.participant.row})
                    </span>
                ))}

            </div>

        </div>
    );
}
