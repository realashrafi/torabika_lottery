"use client"

import { useLotteryStore } from "@/store/lottery-store"

export default function DataTable() {
    const rows = useLotteryStore((s) => s.visibleRows)

    return (
        <div className="mt-10 max-h-96 overflow-auto border rounded-lg">
            <table className="w-full text-sm text-black">

                <thead className="bg-gray-100">
                <tr>
                    <th className="p-2">ردیف</th>
                    <th className="p-2">نام</th>
                    <th className="p-2">نام خانوادگی</th>
                    <th className="p-2">شماره</th>
                    <th className="p-2">استان</th>
                </tr>
                </thead>

                <tbody>
                {rows.slice(0,200).map((r) => (
                    <tr key={r.row} className="border-t">

                        <td className="p-2">{r.row}</td>
                        <td className="p-2">{r.firstName}</td>
                        <td className="p-2">{r.lastName}</td>
                        <td className="p-2">{r.phone}</td>
                        <td className="p-2">{r.province}</td>

                    </tr>
                ))}
                </tbody>

            </table>
        </div>
    )
}
