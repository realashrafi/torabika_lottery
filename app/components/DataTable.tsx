"use client";

import React, { useEffect, useRef } from "react";

const BUFFER = 60;
const ROW_HEIGHT = 40;
const SPEED = 0.4;

interface Props {
    rows: any[];

    cinematic?: boolean;

    freeze?: boolean;

    highlightMode?: "none" | "single" | "all";
}

export default function DataTable({
                                      rows,
                                      cinematic = false,
                                      freeze = false,
                                      highlightMode = "none",
                                  }: Props) {

    const trackRef = useRef<HTMLDivElement>(null);

    const offsetRef = useRef(0);
    const dataIndexRef = useRef(0);
    const frameRef = useRef<number>(0);

    function createRow(
        r: any,
        highlighted = false
    ) {

        const el = document.createElement("div");

        const baseClass =
            "grid grid-cols-[70px_1fr_1fr_150px_120px_120px_100px_160px] gap-3 px-4 text-sm border-b items-center";

        const normalClass =
            "text-white/90 border-white/5";

        const glowClass =
            "text-red-100 font-bold border-red-500/40 bg-red-900/30 shadow-[0_0_35px_rgba(255,0,0,0.9)] animate-pulse";

        el.className = `
            ${baseClass}
            ${highlighted ? glowClass : normalClass}
        `;

        el.style.height = `${ROW_HEIGHT}px`;

        el.innerHTML = `
            <div class="font-mono text-red-400">
                ${r.row}
            </div>

            <div>
                ${r.firstName}
            </div>

            <div>
                ${r.lastName}
            </div>

            <div class="font-mono">
                ${maskPhone(r.phone)}
            </div>

            <div>
                ${r.province}
            </div>

            <div>
                ${r.period}
            </div>

            <div>
                ${r.score}
            </div>

            <div>
                ${excelToJalali(Number(r.registeredAt))}
            </div>
        `;

        return el;
    }

    useEffect(() => {

        if (!rows.length || !trackRef.current) return;

        const track = trackRef.current;

        track.innerHTML = "";

        // ✅ freeze mode
        if (freeze) {

            rows.forEach((row, index) => {

                const highlighted =
                    highlightMode === "all"
                        ? true
                        : highlightMode === "single"
                            ? index === rows.length - 1
                            : false;

                track.appendChild(
                    createRow(row, highlighted)
                );
            });

            track.style.transform = `translateY(0px)`;

            if (frameRef.current) {
                cancelAnimationFrame(frameRef.current);
            }

            return;
        }

        // ✅ normal scroll mode
        const initial = Math.min(BUFFER, rows.length);

        for (let i = 0; i < initial; i++) {

            track.appendChild(
                createRow(rows[i])
            );
        }

        dataIndexRef.current = initial % rows.length;

        const animate = () => {

            offsetRef.current += SPEED;

            if (offsetRef.current >= ROW_HEIGHT) {

                offsetRef.current -= ROW_HEIGHT;

                const first = track.firstElementChild;

                if (first) {
                    track.removeChild(first);
                }

                const nextRow =
                    rows[dataIndexRef.current];

                track.appendChild(
                    createRow(nextRow)
                );

                dataIndexRef.current =
                    (dataIndexRef.current + 1) %
                    rows.length;
            }

            track.style.transform =
                `translateY(-${offsetRef.current}px)`;

            frameRef.current =
                requestAnimationFrame(animate);
        };

        frameRef.current =
            requestAnimationFrame(animate);

        return () => {

            if (frameRef.current) {
                cancelAnimationFrame(frameRef.current);
            }
        };

    }, [rows, freeze, cinematic, highlightMode]);

    return (

        <div className="max-h-screen overflow-hidden border border-white/10 rounded-lg bg-black/10 relative">

            {/* ✅ cinematic overlay */}
            {cinematic && (
                <div className="absolute inset-0 bg-red-600/5 pointer-events-none animate-pulse z-0" />
            )}

            <div
                ref={trackRef}
                className="will-change-transform relative z-10"
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
