"use client"

import { parseExcel } from "@/lib/excel"
import { useLotteryStore } from "@/store/lottery-store"
import DigitDisplay from "@/app/components/DigitDisplay";
import NumberPad from "@/app/components/NumberPad";
import WinnerCard from "@/app/components/WinnerCard";
import ResetButton from "@/app/components/ResetButton";
import DataTable from "@/app/components/DataTable";





export default function Home() {
    const setRows = useLotteryStore((s) => s.setRows)
    const digits = useLotteryStore((s) => s.digits)
    const visibleRows = useLotteryStore((s) => s.visibleRows)
    const winner = useLotteryStore((s) => s.winner)

    const handleUpload = async (e: any) => {
        const file = e.target.files[0]

        const buffer = await file.arrayBuffer()

        const rows = parseExcel(buffer)

        setRows(rows)
    }

    return (
        <main className="p-10 bg-gray-50 min-h-screen">

            <h1 className="text-4xl font-bold text-center mb-10">
                Lottery Studio
            </h1>

            <div className="text-center mb-6">
                <input
                    type="file"
                    accept=".xlsx"
                    onChange={handleUpload}
                />
            </div>

            <DigitDisplay digits={digits} />

            <p className="text-center mb-10 text-gray-600">
                Remaining: {visibleRows.length}
            </p>

            <div className="flex justify-center mb-6">
                <ResetButton />
            </div>

            <NumberPad />

            {winner && <WinnerCard winner={winner} />}

            <DataTable />

        </main>
    )
}
