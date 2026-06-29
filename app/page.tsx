"use client"

import { parseExcel } from "@/lib/excel"
import { useLotteryStore } from "@/store/lottery-store"

export default function Home() {
  const setRows = useLotteryStore((s) => s.setRows)

  const handleUpload = async (e: any) => {
    const file = e.target.files[0]

    const buffer = await file.arrayBuffer()

    const rows = parseExcel(buffer as any)

    setRows(rows)
  }

  return (
      <main className="p-10">
        <h1 className="text-3xl font-bold mb-6">
          Lottery Studio
        </h1>

        <input
            type="file"
            accept=".xlsx"
            onChange={handleUpload}
        />
      </main>
  )
}
