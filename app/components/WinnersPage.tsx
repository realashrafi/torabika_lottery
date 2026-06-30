"use client";
import * as XLSX from "xlsx";
import {useLotteryStore} from "@/store/lottery-store";
import Link from "next/link";

export default function WinnersPage() {
    const winnerHistory = useLotteryStore((s) => s.winnerHistory);

    const exportExcel = () => {
        if (!winnerHistory.length) return;

        const data = winnerHistory.map((record, index) => ({
            Index: index + 1,
            Prize: record.prizeTitle,
            FirstName: record.participant.firstName,
            LastName: record.participant.lastName,
            Phone: record.participant.phone,
            Province: record.participant.province,
            Row: record.participant.row,
            Date: new Date(record.date).toLocaleString("fa-IR")
        }));

        const worksheet = XLSX.utils.json_to_sheet(data);

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Winners");

        XLSX.writeFile(workbook, "lottery-winners.xlsx");
    };
    return (
        <main dir={'rtl'} className="min-h-screen bg-gradient-to-b from-black via-red-950 to-black text-white px-6 py-10">

            <div className="max-w-7xl mx-auto">

                <div className="flex items-center justify-between mb-10">

                    <div>
                        <h1 className="text-5xl font-black tracking-[0.2em] text-red-500">
                            WINNERS
                        </h1>

                        <p className="text-sm text-gray-400 mt-3">
                            لیست کامل برندگان قرعه‌کشی
                        </p>
                    </div>

                    <div className="flex items-center gap-4">
                        <Link
                            href="/"
                            className="px-4 py-2 rounded-xl border border-red-500/40 bg-red-900/20 hover:bg-red-900/40 transition"
                        >
                            Manual
                        </Link>

                        <Link
                            href="/random"
                            className="px-4 py-2 rounded-xl border border-red-500/40 bg-red-900/20 hover:bg-red-900/40 transition"
                        >
                            Random
                        </Link>
                    </div>

                </div>

                <div className="overflow-hidden rounded-3xl border border-red-500/20 bg-black/40 backdrop-blur-md">

                    <div
                        className="grid grid-cols-8 gap-4 px-6 py-4 bg-red-900/30 border-b border-red-500/20 text-xs uppercase tracking-widest text-red-300 font-bold">

                        <div>#</div>
                        <div>Prize</div>
                        <div>First Name</div>
                        <div>Last Name</div>
                        <div>Phone</div>
                        <div>Province</div>
                        <div>Row</div>
                        <div>Date</div>

                    </div>

                    {winnerHistory.length === 0 ? (
                        <div className="py-24 text-center text-gray-400">
                            هنوز برنده‌ای ثبت نشده است
                        </div>
                    ) : (
                        <div className="divide-y divide-white/5">

                            {winnerHistory
                                .slice()
                                .reverse()
                                .map((record, index) => {

                                    const participant = record.participant;

                                    return (
                                        <div
                                            key={`${participant.row}-${record.date}-${index}`}
                                            className="
                                                grid grid-cols-8 gap-4
                                                px-6 py-5
                                                hover:bg-red-500/5
                                                transition
                                            "
                                        >

                                            <div className="font-bold text-red-400">
                                                #{winnerHistory.length - index}
                                            </div>

                                            <div className="font-semibold text-yellow-300">
                                                {record.prizeTitle || "-"}
                                            </div>

                                            <div>
                                                {participant.firstName}
                                            </div>

                                            <div>
                                                {participant.lastName}
                                            </div>

                                            <div  className="text-gray-300">
                                                {maskPhone(participant.phone)}
                                            </div>

                                            <div className="text-gray-300">
                                                {participant.province || "-"}
                                            </div>

                                            <div className="text-red-300 font-semibold">
                                                {participant.row}
                                            </div>

                                            <div className="text-xs text-gray-500">
                                                {new Date(record.date).toLocaleString("fa-IR")}
                                            </div>

                                        </div>
                                    );
                                })}

                        </div>
                    )}

                </div>
                <div className=" fixed bottom-1  left-1  flex flex-col items-start gap-2 px-10 justify-center mt-2">
                    <Link className="border-red-500/70 rounded-md p-1 border" href="/">Manual Winner</Link>
                    <Link className="border-red-500/70 rounded-md p-1 border" href="/random">Random Winner</Link>
                    <Link className="border-red-500/70 rounded-md p-1 border" href="/winners">Winners</Link>
                    <button
                        onClick={exportExcel}
                        className="
        px-4 py-2 rounded-xl
        bg-green-600
        hover:bg-green-700
        text-white text-sm font-bold
        border border-green-400/40
        shadow-[0_0_15px_rgba(34,197,94,0.35)]
    "
                    >
                        Export Excel
                    </button>
                </div>

            </div>
            <button
                onClick={exportExcel}
                className="
        px-4 py-2 rounded-xl
        bg-green-600
        hover:bg-green-700
        text-white text-sm font-bold
        border border-green-400/40
        shadow-[0_0_15px_rgba(34,197,94,0.35)]
    "
            >
                Export Excel
            </button>
        </main>
    );
}

function maskPhone(phone: string) {
    if (!phone) return "";
    const p = phone.toString();
    return p.slice(-4) + "***" + p.slice(0, 4);
}