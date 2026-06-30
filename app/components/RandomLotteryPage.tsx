"use client";

import { useState } from "react";
import { useLotteryStore } from "@/store/lottery-store";
import { parseExcel } from "@/lib/excel";
import WinnerCard from "@/app/components/WinnerCard";
import DataTable from "@/app/components/DataTable";
import RandomWinnerCard from "@/app/components/RandomWinnerCard";
import Link from "next/link";

export default function RandomLotteryPage() {
    const { allRows, setRows, pickRandomWinners, winners, reset } = useLotteryStore();
    const [count, setCount] = useState<number>(1);

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            const rows = await parseExcel(file);
            setRows(rows);
        } catch (error) {
            console.error("خطا در خواندن فایل اکسل:", error);
        }
    };

    const handleStartLottery = () => {
        if (allRows.length === 0) {
            alert("ابتدا فایل شرکت‌کنندگان را بارگذاری کنید.");
            return;
        }

        if (count > 0 && count <= allRows.length) {
            pickRandomWinners(count);
        } else {
            alert(`لطفاً عددی بین ۱ تا ${allRows.length} وارد کنید.`);
        }
    };

    return (
        <main className="min-h-screen text-white relative overflow-hidden flex flex-col items-center justify-between py-6">
            <div className="max-w-[3000px] mx-auto w-full fixed inset-0 mb-8">
                <DataTable />
            </div>

            <div className="flex flex-col items-center z-10">
                <div className="rounded-md">
                    <img src="/Logo.png" width={150} alt="logo" />
                </div>
            </div>

            <div className="relative w-full max-w-4xl flex flex-col items-center justify-center px-4 z-10 flex-1 my-4">
                <div className="absolute inset-0 bg-gradient-to-b from-red-900/30 via-red-950/10 to-transparent rounded-[120px/50px] border-t border-red-500/40 blur-md -z-10 h-[450px]" />
                <div className={'p-3 mb-10 font-bold  rounded-3xl\n' +
                    '    bg-red-900/20\n' +
                    '    border border-red-500/20\n' +
                    '    backdrop-blur-sm'}>
                    <input
                        type="text"
                        className="
              w-[500px] h-24 rounded-xl text-center
              text-white text-5xl  font-black
              border-2 border-red-500/50
              bg-gradient-to-b from-red-600 to-red-900
              shadow-[0_0_20px_rgba(220,38,38,0.35),inset_0_0_10px_rgba(0,0,0,0.5)]
              focus:outline-none
              focus:ring-2 focus:ring-red-400
              transition-all duration-200
              caret-red-300
            "
                    />
                </div>
                <div className="mb-8">
                    <div className="px-10 py-6 rounded-3xl bg-red-900/20 border border-red-500/20 backdrop-blur-sm shadow-[0_0_40px_rgba(220,38,38,0.15)]">
                        <h1 className="text-4xl md:text-6xl font-black tracking-[0.3em] text-red-500 text-center">
                            RANDOM
                        </h1>
                    </div>
                </div>

                <div className="bg-white/80 border z-10 border-red-500/20 rounded-2xl px-8 py-3 backdrop-blur-md flex items-center gap-12 mb-6 shadow-[0_0_20px_rgba(220,38,38,0.15)]">
                    <div className="text-center">
                        <p className="text-[10px] text-gray-500 uppercase tracking-widest">
                            کل شرکت‌کنندگان
                        </p>
                        <p className="text-xl font-bold text-gray-800 mt-1">
                            {allRows.length.toLocaleString()}
                        </p>
                    </div>

                    <div className="h-8 w-px bg-red-500/20" />

                    <div className="text-center">
                        <p className="text-[10px] text-red-400 uppercase tracking-widest">
                            تعداد برندگان انتخاب‌شده
                        </p>
                        <p className="text-xl font-bold text-red-500 mt-1">
                            {winners.length.toLocaleString()}
                        </p>
                    </div>
                </div>
            </div>

            <div className="w-full max-w-lg z-10">
                <div
                    className="
                        relative p-6 rounded-3xl
                        bg-red-900/20
                        border border-red-500/20
                        backdrop-blur-sm
                        shadow-[0_0_60px_rgba(220,38,38,0.15)]
                    "
                >
                    <div className="flex flex-col items-center gap-5">
                        <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-red-300/80">
                            Random Winners
                        </p>

                        <div className="w-full">
                            <input
                                type="number"
                                min={1}
                                max={allRows.length || 1}
                                value={count}
                                onChange={(e) => setCount(Math.max(1, Number(e.target.value) || 1))}
                                className="
                                    w-full h-16 rounded-xl text-center
                                    text-white text-4xl font-black
                                    border-2 border-red-500/50
                                    bg-gradient-to-b from-red-600 to-red-900
                                    shadow-[0_0_20px_rgba(220,38,38,0.35),inset_0_0_10px_rgba(0,0,0,0.5)]
                                    focus:outline-none
                                    focus:ring-2 focus:ring-red-400
                                    transition-all duration-200
                                "
                            />
                        </div>

                        <p className="text-[10px] text-gray-400">
                            تعداد برندگان را وارد کنید
                        </p>

                        <div className="flex w-full gap-3">
                            <button
                                onClick={handleStartLottery}
                                className="
                                    flex-1 mt-2 px-8 py-3 rounded-full
                                    bg-gradient-to-b from-red-500 to-red-700
                                    border border-red-400/40
                                    text-white text-xs font-bold uppercase tracking-wider
                                    shadow-[0_0_25px_rgba(220,38,38,0.4)]
                                    hover:brightness-110
                                    active:scale-95
                                    transition
                                "
                            >
                                Start Random Draw
                            </button>

                            <button
                                onClick={reset}
                                className="
                                    mt-2 px-6 py-3 rounded-full
                                    bg-black/40 border border-white/10
                                    text-white text-xs font-bold uppercase tracking-wider
                                    hover:bg-black/60 transition
                                "
                            >
                                Reset
                            </button>

                        </div>
                       <div className={'flex items-center gap-10 px-10'}>
                           <Link className={'border-red-500/70 rounded-md p-1 border'} href={'/'}>Manual Winner</Link>
                           <Link className={'border-red-500/70 rounded-md p-1 border'} href={'/random'}>Random Winner</Link>
                       </div>
                    </div>
                </div>
            </div>

            {winners.length > 0 && (
                <div className="w-full max-w-6xl mt-12 z-10 px-4 pb-10">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {winners.map((winner, index) => (
                            <RandomWinnerCard
                                key={`${winner.row}-${index}`}
                                winner={winner}
                                index={index}
                            />
                        ))}
                    </div>
                </div>
            )}


            {allRows.length === 0 && (
                <div className="fixed top-4 right-4 bg-black/80 border border-white/10 p-2 rounded-lg z-20">
                    <input
                        type="file"
                        accept=".xlsx"
                        onChange={handleFileUpload}
                        className="text-xs text-gray-400"
                    />
                </div>
            )}
        </main>
    );
}
