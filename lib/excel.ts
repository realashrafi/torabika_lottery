import * as XLSX from "xlsx";
import { Participant } from "@/types";

export async function parseExcel(file: File): Promise<Participant[]> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (e) => {
            try {
                const data = e.target?.result;
                if (!data) {
                    resolve([]);
                    return;
                }

                // خواندن با فرمت array (با پاس دادن مستقیم result از reader.readAsArrayBuffer)
                const workbook = XLSX.read(data, { type: "array" });
                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];

                // تبدیل ردیف‌ها به JSON
                const rawRows = XLSX.utils.sheet_to_json<any>(sheet);

                // نگاشت به ساختار داده مورد نیاز شما
                const formattedRows = rawRows.map((row: any) => ({
                    row: String(row["ردیف"] || ""),
                    firstName: String(row["نام "] || ""),
                    lastName: String(row["نام خانوادگی"] || ""),
                    phone: String(row["شماره"] || ""),
                    province: String(row["استان"] || ""),
                    period: String(row["دوره"] || ""),
                    score: String(row["امتیاز"] || ""),
                    registeredAt: String(row["تاریخ ثبت"] || ""),
                }));

                resolve(formattedRows);
            } catch (error) {
                reject(error);
            }
        };

        reader.onerror = (error) => reject(error);
        reader.readAsArrayBuffer(file);
    });
}
