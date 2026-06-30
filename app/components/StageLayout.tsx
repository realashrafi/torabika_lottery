"use client"

export default function StageLayout({
                                        header,
                                        digits,
                                        controls,
                                        table,
                                    }: {
    header: React.ReactNode
    digits: React.ReactNode
    controls: React.ReactNode
    table: React.ReactNode
}) {
    return (
        <div className="min-h-screen bg-white flex flex-col">

            <div className="border-b p-6 text-center text-3xl font-bold text-red-600">
                {header}
            </div>

            <div className="flex-1 flex flex-col items-center justify-center gap-10 p-10">
                {digits}
                {controls}
            </div>

            <div className="h-[350px] border-t overflow-hidden">
                {table}
            </div>

        </div>
    )
}
