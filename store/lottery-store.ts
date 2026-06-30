import { create } from "zustand"
import { Participant } from "@/types"

type LotteryState = {
    allRows: Participant[]
    visibleRows: Participant[]
    prefix: string
    digits: string[]
    winner: Participant | null
    winners: Participant[]

    setRows: (rows: Participant[]) => void
    addDigit: (digit: string) => void
    reset: () => void
    pickRandomWinners: (count: number) => void
}

export const useLotteryStore = create<LotteryState>((set, get) => ({
    allRows: [],
    visibleRows: [],
    prefix: "",
    digits: [],
    winner: null,
    winners: [],

    setRows: (rows) =>
        set({
            allRows: rows,
            visibleRows: rows,
            prefix: "",
            digits: [],
            winner: null,
            winners: [],
        }),

    addDigit: (digit) => {
        const { prefix, visibleRows } = get()
        const nextPrefix = prefix + digit
        const filtered = visibleRows.filter((r) => r.row.startsWith(nextPrefix))

        set({
            prefix: nextPrefix,
            digits: [...get().digits, digit],
            visibleRows: filtered,
            winner: filtered.length === 1 ? filtered[0] : null,
            winners: [],
        })
    },

    pickRandomWinners: (count) => {
        const { allRows } = get()

        if (!allRows.length || count <= 0) {
            set({
                winners: [],
                winner: null,
            })
            return
        }

        const safeCount = Math.min(count, allRows.length)
        const shuffled = [...allRows].sort(() => 0.5 - Math.random())
        const selectedWinners = shuffled.slice(0, safeCount)

        set({
            winners: selectedWinners,
            winner: null,
            prefix: "",
            digits: [],
            visibleRows: allRows,
        })
    },

    reset: () => {
        const rows = get().allRows
        set({
            prefix: "",
            digits: [],
            winner: null,
            visibleRows: rows,
            winners: [],
        })
    },
}))
