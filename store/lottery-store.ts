import { create } from "zustand"
import { Participant } from "@/types"

type WinnerRecord = {
    participant: Participant
    prizeTitle: string
    date: number
}

type LotteryState = {
    allRows: Participant[]
    availableRows: Participant[]

    visibleRows: Participant[]

    winnerHistory: WinnerRecord[]

    prizeTitle: string
    setPrizeTitle: (title: string) => void

    prefix: string
    digits: string[]

    winner: Participant | null
    winners: Participant[]

    setRows: (rows: Participant[]) => void
    addDigit: (digit: string) => void
    pickRandomWinners: (count: number) => void

    reset: () => void
    resetAll: () => void
}

export const useLotteryStore = create<LotteryState>((set, get) => ({
    allRows: [],
    availableRows: [],

    visibleRows: [],

    winnerHistory: [],

    prizeTitle: "",

    prefix: "",
    digits: [],

    winner: null,
    winners: [],

    setPrizeTitle: (title) =>
        set({
            prizeTitle: title,
        }),

    setRows: (rows) =>
        set({
            allRows: rows,
            availableRows: rows,

            visibleRows: rows,

            winnerHistory: [],

            prefix: "",
            digits: [],

            winner: null,
            winners: [],
        }),

    addDigit: (digit) => {
        const {
            prefix,
            visibleRows,
            availableRows,
            winnerHistory,
            prizeTitle,
        } = get()

        const nextPrefix = prefix + digit

        const filtered = visibleRows.filter((r) =>
            r.row.startsWith(nextPrefix)
        )

        const selectedWinner =
            filtered.length === 1 ? filtered[0] : null

        let nextAvailable = availableRows
        let nextHistory = winnerHistory

        if (selectedWinner) {
            nextAvailable = availableRows.filter(
                (r) => r.row !== selectedWinner.row
            )

            nextHistory = [
                ...winnerHistory,
                {
                    participant: selectedWinner,
                    prizeTitle,
                    date: Date.now(),
                },
            ]
        }

        set({
            prefix: nextPrefix,
            digits: [...get().digits, digit],

            visibleRows: selectedWinner ? nextAvailable : filtered,

            winner: selectedWinner,
            winners: [],

            availableRows: nextAvailable,
            winnerHistory: nextHistory,
        })
    },

    pickRandomWinners: (count) => {
        const { availableRows, winnerHistory, prizeTitle } = get()

        if (!availableRows.length || count <= 0) {
            set({
                winners: [],
                winner: null,
            })
            return
        }

        const safeCount = Math.min(count, availableRows.length)

        const shuffled = [...availableRows].sort(() => 0.5 - Math.random())

        const selectedWinners = shuffled.slice(0, safeCount)

        const winnerIds = new Set(selectedWinners.map((w) => w.row))

        const nextAvailable = availableRows.filter(
            (r) => !winnerIds.has(r.row)
        )

        const records: WinnerRecord[] = selectedWinners.map((w) => ({
            participant: w,
            prizeTitle,
            date: Date.now(),
        }))

        set({
            winners: selectedWinners,
            winner: null,

            prefix: "",
            digits: [],

            visibleRows: nextAvailable,
            availableRows: nextAvailable,

            winnerHistory: [...winnerHistory, ...records],
        })
    },

    reset: () => {
        const { availableRows } = get()

        set({
            prefix: "",
            digits: [],

            winner: null,
            winners: [],

            visibleRows: availableRows,
        })
    },

    resetAll: () => {
        const { allRows } = get()

        set({
            availableRows: allRows,
            visibleRows: allRows,

            winnerHistory: [],

            prefix: "",
            digits: [],

            winner: null,
            winners: [],
        })
    },
}))
