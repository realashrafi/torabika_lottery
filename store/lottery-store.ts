import { create } from "zustand"
import { Participant } from "@/types"

type LotteryState = {
    allRows: Participant[]
    visibleRows: Participant[]
    prefix: string
    digits: string[]
    winner: Participant | null

    setRows: (rows: Participant[]) => void
    addDigit: (digit: string) => void
    reset: () => void
}

export const useLotteryStore = create<LotteryState>((set, get) => ({
    allRows: [],
    visibleRows: [],
    prefix: "",
    digits: [],
    winner: null,

    setRows: (rows) =>
        set({
            allRows: rows,
            visibleRows: rows,
        }),

    addDigit: (digit) => {
        const { prefix, allRows } = get()

        const nextPrefix = prefix + digit

        const filtered = allRows.filter((r) =>
            String(r.row).startsWith(nextPrefix)
        )

        set({
            prefix: nextPrefix,
            digits: [...get().digits, digit],
            visibleRows: filtered,
            winner: filtered.length === 1 ? filtered[0] : null,
        })
    },

    reset: () =>
        set({
            prefix: "",
            digits: [],
            winner: null,
        }),
}))
