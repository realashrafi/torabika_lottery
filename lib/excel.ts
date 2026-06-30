import * as XLSX from "xlsx"
import { Participant } from "@/types"

export function parseExcel(buffer: ArrayBuffer): Participant[] {
    const workbook = XLSX.read(buffer, { type: "array" })

    const sheet = workbook.Sheets[workbook.SheetNames[0]]

    const data = XLSX.utils.sheet_to_json<any>(sheet)

    return data.map((row) => ({
        row: String(row["ردیف"]).padStart(5, "0"),
        firstName: row["نام"],
        lastName: row["نام خانوادگی"],
        phone: String(row["شماره"]),
        province: row["استان"],
        period: row["دوره"],
        score: Number(row["امتیاز"]),
        registeredAt: row["تاریخ ثبت"],
    }))
}
