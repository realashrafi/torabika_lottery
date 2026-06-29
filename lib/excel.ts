import * as XLSX from "xlsx"
import { Participant } from "@/types"

export function parseExcel(file: File): Participant[] {
    const workbook = XLSX.read(file, { type: "array" })

    const sheet = workbook.Sheets[workbook.SheetNames[0]]

    const data = XLSX.utils.sheet_to_json<any>(sheet)

    return data.map((row) => ({
        row: Number(row["ردیف"]),
        firstName: row["نام"],
        lastName: row["نام خانوادگی"],
        phone: String(row["شماره"]),
        province: row["استان"],
        period: row["دوره"],
        score: Number(row["امتیاز"]),
        registeredAt: row["تاریخ ثبت"],
    }))
}
