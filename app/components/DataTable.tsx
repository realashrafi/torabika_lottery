"use client";

import React, { useEffect, useRef } from "react";
import { useLotteryStore } from "@/store/lottery-store";

const BUFFER = 60;
const ROW_HEIGHT = 40;
const SPEED = 0.4;

export default function DataTable() {
    const rows = useLotteryStore((s) => s.visibleRows);

    const trackRef = useRef<HTMLDivElement>(null);
    const offsetRef = useRef(0);
    const dataIndexRef = useRef(0);
    const frameRef = useRef<number>(0);

    function createRow(r: any) {
        const el = document.createElement("div");

        el.className =
            "grid grid-cols-[70px_1fr_1fr_150px_120px_120px_100px_160px] gap-3 px-4 text-sm text-white/90 border-b border-white/5 items-center";

        el.style.height = ROW_HEIGHT + "px";

        el.innerHTML = `
<div class="font-mono text-red-400">${r.row}</div>
<div>${r.firstName}</div>
<div>${r.lastName}</div>
<div class="font-mono">${maskPhone(r.phone)}</div>
<div>${r.province}</div>
<div>${r.period}</div>
<div>${r.score}</div>
<div>${excelToJalali(Number(r.registeredAt))}</div>
`;


        return el;
    }


    useEffect(() => {
        if (!rows.length || !trackRef.current) return;

        const track = trackRef.current;
        track.innerHTML = "";

        const initial = Math.min(BUFFER, rows.length);

        for (let i = 0; i < initial; i++) {
            track.appendChild(createRow(rows[i]));
        }

        dataIndexRef.current = initial % rows.length;

        const animate = () => {
            offsetRef.current += SPEED;

            if (offsetRef.current >= ROW_HEIGHT) {
                offsetRef.current -= ROW_HEIGHT;

                const first = track.firstElementChild;
                if (first) track.removeChild(first);

                const nextRow = rows[dataIndexRef.current];
                track.appendChild(createRow(nextRow));

                dataIndexRef.current =
                    (dataIndexRef.current + 1) % rows.length;
            }

            track.style.transform = `translateY(-${offsetRef.current}px)`;

            frameRef.current = requestAnimationFrame(animate);
        };

        frameRef.current = requestAnimationFrame(animate);

        return () => {
            if (frameRef.current) cancelAnimationFrame(frameRef.current);
        };
    }, [rows]);

    return (
        <div className=" max-h-screen  overflow-hidden border border-white/10 rounded-lg bg-black/10 ">
            <div
                ref={trackRef}
                className="will-change-transform"
                style={{ direction: "rtl" }}
            />
        </div>
    );
}


function excelToJalali(serial: number) {
    const utc = (serial - 25569) * 86400 * 1000;
    const date = new Date(utc);

    return date.toLocaleString("fa-IR-u-ca-persian");
}

function maskPhone(phone: string) {
    if (!phone) return "";

    const p = phone.toString();

    return p.slice(-4) + "***" + p.slice(0, 4);
}
