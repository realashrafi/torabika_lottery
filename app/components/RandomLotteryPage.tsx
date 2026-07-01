"use client";

import {useState} from "react";
import {useLotteryStore} from "@/store/lottery-store";
import {parseExcel} from "@/lib/excel";
import DataTable from "@/app/components/DataTable";
import RandomWinnerCard from "@/app/components/RandomWinnerCard";
import Link from "next/link";
import NewsTicker from "@/app/components/NewsTicker";
import PrizeSelector from "@/app/components/PrizeSelector";
import {staticWinnersList} from "@/lib/staticWinners";

export default function RandomLotteryPage() {

    const {
        allRows,
        availableRows,
        setRows,
        pickRandomWinners,
        pickStaticWinners, // متد جدید استور
        winners,
        reset,
        prizeTitle,
    } = useLotteryStore();

    const [count, setCount] = useState<number>(1);
    const [isStaticMode, setIsStaticMode] = useState<boolean>(false); // وضعیت سوییچ قرعه‌کشی استاتیک

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
        // در حالت استاتیک نیازی به بررسی فایل اکسل نیست
        if (!isStaticMode && allRows.length === 0) {
            alert("ابتدا فایل شرکت‌کنندگان را بارگذاری کنید.");
            return;
        }

        // بررسی عنوان جایزه فقط برای حالت عادی انجام می‌شود
        if (!isStaticMode && !prizeTitle.trim()) {
            alert("عنوان جایزه را وارد کنید.");
            return;
        }

        if (isStaticMode) {
            // قرعه‌کشی استاتیک از لیست ۲۵ نفره
            if (count > 0 && count <= staticWinnersList.length) {
                pickStaticWinners(count, staticWinnersList);
            } else {
                alert(`لطفاً عددی بین ۱ تا ${staticWinnersList.length} وارد کنید.`);
            }
        } else {
            // قرعه‌کشی عادی از فایل اکسل
            if (count > 0 && count <= availableRows.length) {
                pickRandomWinners(count);
            } else {
                alert(`لطفاً عددی بین ۱ تا ${availableRows.length} وارد کنید.`);
            }
        }
    };

    // مقادیر پویا بر اساس مد فعال قرعه‌کشی
    const activeRowsForDisplay = isStaticMode ? staticWinnersList : availableRows;
    const totalParticipantsCount = isStaticMode ? staticWinnersList.length : allRows.length;
    const remainingChancesCount = isStaticMode ? staticWinnersList.length : availableRows.length;

    return (
        <main
            className="min-h-screen text-white relative overflow-hidden flex flex-col items-center justify-between py-6">

            {/* table background */}
            <div className="max-w-[3000px] mx-auto w-full fixed inset-0 mb-8">
                <DataTable rows={activeRowsForDisplay}/>
            </div>

            <img src="/Logo.png" className={'fixed bottom-10 right-1'} width={150} alt="logo"/>
            <img src="/cup.png" className={'fixed bottom-10 left-1'} width={150} alt="logo"/>
            <div className="relative flex flex-col items-center z-10">
                <img src="/Poster-head.png" width={300} height={200} alt="logo"/>
            </div>

            <div className="relative w-full max-w-4xl flex flex-col items-center justify-center px-4 z-10 flex-1 my-4">

                <div
                    className="absolute inset-0 bg-gradient-to-b from-red-900/30 via-red-950/10 to-transparent rounded-[120px/50px] border-t border-red-500/40 blur-md -z-10 h-[450px]"/>

                {/* نمایش شرطی PrizeSelector: در حالت استاتیک پنهان می‌شود */}
                {!isStaticMode && <PrizeSelector className="mb-10"/>}

                <div className="mb-8">
                    <div
                        className="px-10 py-6 rounded-3xl bg-red-900/20 border border-red-500/20 backdrop-blur-sm shadow-[0_0_40px_rgba(220,38,38,0.15)]">
                        <h1 className="text-4xl md:text-6xl font-black tracking-[0.3em] text-red-500 text-center">
                            RANDOM
                        </h1>
                    </div>
                </div>

                <div
                    className="bg-white/80 border z-10 border-red-500/20 rounded-2xl px-8 py-3 backdrop-blur-md flex items-center gap-12 mb-6">

                    <div className="text-center">
                        <p className="text-[10px] text-gray-500 uppercase tracking-widest">
                            کل شرکت‌کنندگان
                        </p>
                        <p className="text-xl font-bold text-gray-800 mt-1">
                            {totalParticipantsCount.toLocaleString()}
                        </p>
                    </div>

                    <div className="h-8 w-px bg-red-500/20"/>

                    <div className="text-center">
                        <p className="text-[10px] text-red-400 uppercase tracking-widest">
                            شانس‌های باقی‌مانده
                        </p>
                        <p className="text-xl font-bold text-red-500 mt-1">
                            {remainingChancesCount.toLocaleString()}
                        </p>
                    </div>

                    <div className="h-8 w-px bg-red-500/20"/>

                    <div className="text-center">
                        <p className="text-[10px] text-red-400 uppercase tracking-widest">
                            برندگان این مرحله
                        </p>
                        <p className="text-xl font-bold text-red-500 mt-1">
                            {winners.length.toLocaleString()}
                        </p>
                    </div>

                </div>

            </div>

            <div className="w-full max-w-lg z-10">

                <div className="relative p-6 rounded-3xl bg-red-900/20 border border-red-500/20 backdrop-blur-sm">

                    <div className="flex flex-col items-center gap-5">

                        {/* دکمه سوئیچ وضعیت قرعه‌کشی */}
                        <div
                            className="flex items-center gap-3 bg-black/40 px-4 py-2 rounded-full border border-red-500/30">
                            <span
                                className={`text-[11px] font-bold transition-colors ${!isStaticMode ? 'text-white' : 'text-gray-500'}`}>جوایز مصرفکنندگان</span>
                            <button
                                type="button"
                                onClick={() => {
                                    setIsStaticMode(!isStaticMode);
                                    reset(); // پاک کردن برندگان قبلی پس از تغییر وضعیت
                                }}
                                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                                    isStaticMode ? "bg-red-600" : "bg-gray-700"
                                }`}
                            >
                                <span
                                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                                        isStaticMode ? "translate-x-5" : "translate-x-0"
                                    }`}
                                />
                            </button>
                            <span
                                className={`text-[11px] font-bold transition-colors ${isStaticMode ? 'text-red-400' : 'text-gray-500'}`}>جوایز فروشندگان</span>
                        </div>

                        <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-red-300/80">
                            {isStaticMode ? "Static Winners" : "Random Winners"}
                        </p>

                        <input
                            type="number"
                            min={1}
                            max={isStaticMode ? staticWinnersList.length : (availableRows.length || 1)}
                            value={count}
                            onChange={(e) => setCount(Math.max(1, Number(e.target.value) || 1))}
                            className="w-full h-16 rounded-xl text-center text-white text-4xl font-black border-2 border-red-500/50 bg-gradient-to-b from-red-600 to-red-900"
                        />

                        <div className="flex w-full gap-3">

                            <button
                                onClick={handleStartLottery}
                                className="flex-1 mt-2 px-8 py-3 rounded-full bg-gradient-to-b from-red-500 to-red-700 text-white text-xs font-bold"
                            >
                                Start {isStaticMode ? "Static" : "Random"} Draw
                            </button>

                            <button
                                onClick={reset}
                                className="mt-2 px-6 py-3 rounded-full bg-black/40 border border-white/10 text-xs font-bold"
                            >
                                Reset
                            </button>

                        </div>

                        <div className="flex items-center gap-10 px-10 justify-center mt-2">
                            <Link className="border-red-500/70 rounded-md p-1 border" href="/">Manual</Link>
                            <Link className="border-red-500/70 rounded-md p-1 border" href="/random">Random</Link>
                            <Link className="border-red-500/70 rounded-md p-1 border" href="/winners">Winners</Link>
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

            {/* فایل آپلودر فقط در حالت معمولی و زمانی که داده‌ای بارگذاری نشده است نمایش داده می‌شود */}
            {!isStaticMode && allRows.length === 0 && (
                <div className="fixed top-4 right-4 bg-black/80 border border-white/10 p-2 rounded-lg z-20">
                    <input type="file" accept=".xlsx" onChange={handleFileUpload}/>
                </div>
            )}

            <NewsTicker/>

        </main>
    );
}
