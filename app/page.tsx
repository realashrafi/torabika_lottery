"use client";

import { useEffect, useRef, useState } from "react";
import { useLotteryStore } from "@/store/lottery-store";
import { parseExcel } from "@/lib/excel";
import DigitDisplay from "./components/DigitDisplay";
import DataTable from "./components/DataTable";
import WinnerCard from "./components/WinnerCard";

export default function LotteryPage() {
    const { setRows, addDigit, winner, visibleRows, allRows, reset } = useLotteryStore();
    const [inputValues, setInputValues] = useState(["", "", "", "", ""]);
    const inputRefs = [
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
    ];

    // لود اولیه فوکوس روی اولین فیلد
    useEffect(() => {
        if (allRows.length > 0) {
            inputRefs[0].current?.focus();
        }
    }, [allRows]);

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            try {
                const rows = await parseExcel(file);
                setRows(rows);
            } catch (error) {
                console.error("خطا در خواندن فایل اکسل:", error);
            }
        }
    };

    const handleInputChange = (index: number, value: string) => {
        if (!/^\d?$/.test(value)) return; // فقط عدد تک رقمی

        const newValues = [...inputValues];
        newValues[index] = value;
        setInputValues(newValues);

        if (value) {
            addDigit(value);
            if (index < 4) {
                inputRefs[index + 1].current?.focus();
            }
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace") {
            if (!inputValues[index] && index > 0) {
                // اگر باکس فعلی خالی بود، برو به باکس قبلی و مقدارش را پاک کن
                const newValues = [...inputValues];
                newValues[index - 1] = "";
                setInputValues(newValues);

                // ریست فیلترها و اعمال مجدد تا شاخه فعلی
                reset();
                const tempValues = [...newValues];
                tempValues[index - 1] = "";
                tempValues.forEach(val => {
                    if (val) addDigit(val);
                });

                inputRefs[index - 1].current?.focus();
            } else if (inputValues[index]) {
                // اگر در باکس پر بودیم و بک‌اسپیس زدیم، فقط باکس فعلی پاک شود
                const newValues = [...inputValues];
                newValues[index] = "";
                setInputValues(newValues);

                reset();
                newValues.forEach(val => {
                    if (val) addDigit(val);
                });
            }
        }
    };

    const handleFullReset = () => {
        reset();
        setInputValues(["", "", "", "", ""]);
        setTimeout(() => {
            inputRefs[0].current?.focus();
        }, 50);
    };

    return (
        <main className="min-h-screen text-white relative overflow-hidden flex flex-col items-center justify-between py-6">
            <div className="max-w-[3000px] mx-auto w-full fixed inset-0 mb-8">
                <DataTable />
            </div>
            {/* 1. هدر و لوگوی استیج */}
            <div className="flex flex-col items-center z-10">
                <div className="bg-red-600 px-10 py-3 rounded-md shadow-[0_0_40px_rgba(220,38,38,0.6)] transform -skew-x-12">
                    <h1 className="text-4xl font-black tracking-widest italic text-white select-none">TORABIKA</h1>
                </div>
            </div>

            {/* 2. استیج اصلی مسابقه */}
            <div className="relative w-full max-w-4xl flex flex-col items-center justify-center px-4 z-10 flex-1 my-4">

                {/* پرتو نوری پس‌زمینه (استیج سینمایی) */}
                <div className="absolute inset-0 bg-gradient-to-b from-red-900/30 via-red-950/10 to-transparent rounded-[120px/50px] border-t border-red-500/40 blur-md -z-10 h-[450px]" />
<div className={'p-3 mb-20 rounded-3xl\n' +
    '    bg-red-900/20\n' +
    '    border border-red-500/20\n' +
    '    backdrop-blur-sm'}>
    <input
        type="text"
        className="
              w-[500px] h-14 rounded-xl text-center
              text-white text-xl font-mono font-black
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


                {/* نمایشگر بزرگ LED */}
                <div className="mb-6">
                    <DigitDisplay digits={inputValues.join("")} />
                </div>

                {/* پنل تعداد شرکت کنندگان */}
                <div className="bg-black/80 border z-10 border-red-500/20 rounded-2xl px-8 py-3 backdrop-blur-md flex items-center gap-12 mb-6 shadow-[0_0_20px_rgba(220,38,38,0.15)]">
                    <div className="text-center">
                        <p className="text-[10px] text-gray-500 uppercase tracking-widest">کل شرکت‌کنندگان</p>
                        <p className="text-xl font-bold text-gray-200 mt-1">{allRows.length.toLocaleString()}</p>
                    </div>
                    <div className="h-8 w-px bg-red-500/20" />
                    <div className="text-center">
                        <p className="text-[10px] text-red-400 uppercase tracking-widest">شانس‌های باقی‌مانده</p>
                        <p className="text-xl font-bold text-red-500 mt-1">{visibleRows.length.toLocaleString()}</p>
                    </div>
                </div>



            </div>

            {/* 3. پنل کنترل پایینی (شبیه‌ساز کنسول فیزیکی) */}
            <div className="w-full max-w-lg z-10">
                <div className="
    relative p-6 rounded-3xl
    bg-red-900/20
    border border-red-500/20
    backdrop-blur-sm
    shadow-[0_0_60px_rgba(220,38,38,0.15)]
  ">

                    <div className="flex flex-col items-center gap-5">

                        <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-red-300/80">
                            Select Number
                        </p>

                        <div className="flex gap-3">
                            {inputValues.map((val, i) => (
                                <input
                                    key={i}
                                    ref={inputRefs[i]}
                                    type="text"
                                    maxLength={1}
                                    value={val}
                                    onChange={(e) => handleInputChange(i, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(i, e)}
                                    className="
              w-12 h-14 rounded-xl text-center
              text-white text-xl font-mono font-black
              border-2 border-red-500/50
              bg-gradient-to-b from-red-600 to-red-900
              shadow-[0_0_20px_rgba(220,38,38,0.35),inset_0_0_10px_rgba(0,0,0,0.5)]
              focus:outline-none
              focus:ring-2 focus:ring-red-400
              transition-all duration-200
              caret-red-300
            "
                                />
                            ))}
                        </div>

                        <button
                            onClick={handleFullReset}
                            className="
          mt-2 px-8 py-2 rounded-full
          bg-gradient-to-b from-red-500 to-red-700
          border border-red-400/40
          text-white text-xs font-bold uppercase tracking-wider
          shadow-[0_0_25px_rgba(220,38,38,0.4)]
          hover:brightness-110
          active:scale-95
          transition
        "
                        >
                            Reset / Clear
                        </button>

                    </div>
                </div>
            </div>


            {/* دکمه مخفی بارگذاری فایل اکسل */}
            {allRows.length === 0 && (
                <div className="fixed top-4 right-4 bg-black/80 border border-white/10 p-2 rounded-lg z-20">
                    <input type="file" accept=".xlsx" onChange={handleFileUpload} className="text-xs text-gray-400" />
                </div>
            )}

            {/* نمایش کارت برنده در صورت مشخص شدن */}
            {winner && <WinnerCard winner={winner}  />}
        </main>
    );
}
