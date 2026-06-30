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
            prefix: "",
            digits: [],
            winner: null,
        }),

    addDigit: (digit) => {
        const { prefix, visibleRows } = get()

        const nextPrefix = prefix + digit

        const filtered = visibleRows.filter((r) =>
            r.row.startsWith(nextPrefix)
        )

        set({
            prefix: nextPrefix,
            digits: [...get().digits, digit],
            visibleRows: filtered,
            winner: filtered.length === 1 ? filtered[0] : null,
        })
    },

    reset: () => {
        const rows = get().allRows

        set({
            prefix: "",
            digits: [],
            winner: null,
            visibleRows: rows,
        })
    },
}))
