(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/utils/supabase.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "supabase",
    ()=>supabase
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/supabase-js/dist/index.mjs [app-client] (ecmascript) <locals>");
;
const supabaseUrl = ("TURBOPACK compile-time value", "https://vsppnvxgyyxepulnkmpi.supabase.co");
const supabaseAnonKey = ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZzcHBudnhneXl4ZXB1bG5rbXBpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA4MjQ1NzcsImV4cCI6MjA4NjQwMDU3N30.cvTR5qbFDvN3XyfCnXmatkGGWFWPkNhNmmf9eJBXn_k");
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(supabaseUrl || '', supabaseAnonKey || '');
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/koordinator-view/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>RecapPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/supabase.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trophy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trophy$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trophy.js [app-client] (ecmascript) <export default as Trophy>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$spreadsheet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileSpreadsheet$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-spreadsheet.js [app-client] (ecmascript) <export default as FileSpreadsheet>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$xlsx$2f$xlsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/xlsx/xlsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jspdf$2f$dist$2f$jspdf$2e$es$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jspdf/dist/jspdf.es.min.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jspdf$2d$autotable$2f$dist$2f$jspdf$2e$plugin$2e$autotable$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jspdf-autotable/dist/jspdf.plugin.autotable.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
function RecapPage() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [results, setResults] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "RecapPage.useEffect": ()=>{
            // Check Auth
            const role = localStorage.getItem('user_role');
            if (role !== 'Koordinator Akademik') {
                router.push('/');
            } else {
                fetchResults();
                // Real-time Sync (Subscription)
                const channel = __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].channel('realtime-scores').on('postgres_changes', {
                    event: '*',
                    schema: 'public',
                    table: 'scores',
                    filter: 'is_final=eq.true'
                }, {
                    "RecapPage.useEffect.channel": (payload)=>{
                        console.log('Real-time update received:', payload);
                        fetchResults();
                    }
                }["RecapPage.useEffect.channel"]).subscribe();
                // Polling Fallback (5 seconds) as requested
                const intervalId = setInterval({
                    "RecapPage.useEffect.intervalId": ()=>{
                        fetchResults();
                    }
                }["RecapPage.useEffect.intervalId"], 5000);
                return ({
                    "RecapPage.useEffect": ()=>{
                        __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].removeChannel(channel);
                        clearInterval(intervalId);
                    }
                })["RecapPage.useEffect"];
            }
        }
    }["RecapPage.useEffect"], []);
    async function fetchResults() {
        setLoading(true);
        try {
            // Deep Fetch: Scores -> Students -> Events
            // Using strict inner join as requested: students!inner
            // Exact Query requested by User
            // Note: events is linked from scores (if event_id exists on scores) OR from students?
            // User requested: select('*, students(name, nis, class), events(event_name)')
            // We assume 'scores' has 'event_id' FK to 'events'.
            // Exact Query requested by User
            const { data: rawScores, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('scores').select('*, students(name, nis, class), events(event_name)').eq('is_final', true);
            if (error) throw error;
            if (rawScores) {
                // Deduplicate by student_id
                const uniqueMap = new Map();
                rawScores.forEach((item)=>{
                    // Safety check for undefined relations
                    const studentName = item.students?.name || 'Unknown';
                    const studentNis = item.students?.nis || '-';
                    const studentClass = item.students?.class || '-';
                    const eventName = item.events?.event_name || '-';
                    if (!uniqueMap.has(item.student_id)) {
                        uniqueMap.set(item.student_id, {
                            id: item.student_id,
                            name: studentName,
                            class: studentClass,
                            nis: studentNis,
                            event_name: eventName,
                            final_score: item.average_score || 0
                        });
                    }
                });
                const resultsArray = Array.from(uniqueMap.values());
                // Auto-Ranking (Desc)
                resultsArray.sort((a, b)=>b.final_score - a.final_score);
                setResults(resultsArray);
            }
        } catch (err) {
            console.error("Error fetching results:", err);
        } finally{
            setLoading(false);
        }
    }
    // ... inside component ...
    const handlePrintPDF = ()=>{
        const doc = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jspdf$2f$dist$2f$jspdf$2e$es$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]();
        // --- Header ---
        doc.setFontSize(18);
        doc.setTextColor(41, 128, 185); // Blue
        doc.text('LANTECH DIGITAL PTY LTD', 105, 20, {
            align: 'center'
        });
        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.text('Digital Assessment System 2026', 105, 26, {
            align: 'center'
        });
        doc.line(20, 30, 190, 30); // Horizontal Line
        // --- Title ---
        doc.setFontSize(14);
        doc.setTextColor(0);
        doc.text('LAPORAN HASIL PENILAIAN UKK', 105, 40, {
            align: 'center'
        });
        doc.setFontSize(10);
        const dateStr = new Date().toLocaleDateString('id-ID', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        doc.text(`Dicetak pada: ${dateStr}`, 105, 46, {
            align: 'center'
        });
        // --- Table ---
        const tableBody = results.map((r, i)=>[
                i + 1,
                r.name.toUpperCase(),
                r.class,
                r.event_name || '-',
                r.final_score.toFixed(2),
                r.final_score >= 75 ? 'KOMPETEN' : 'BELUM KOMPETEN'
            ]);
        doc.autoTable({
            startY: 55,
            head: [
                [
                    'No',
                    'Nama Siswa',
                    'Kelas',
                    'Lomba',
                    'Nilai',
                    'Predikat'
                ]
            ],
            body: tableBody,
            theme: 'grid',
            headStyles: {
                fillColor: [
                    41,
                    128,
                    185
                ],
                textColor: 255
            },
            styles: {
                fontSize: 10,
                cellPadding: 2
            },
            columnStyles: {
                0: {
                    cellWidth: 10,
                    halign: 'center'
                },
                4: {
                    halign: 'right'
                },
                5: {
                    halign: 'center',
                    fontStyle: 'bold'
                }
            },
            didParseCell: (data)=>{
                // Colorize Predicate
                if (data.section === 'body' && data.column.index === 5) {
                    const text = data.cell.raw;
                    if (text === 'BELUM KOMPETEN') {
                        data.cell.styles.textColor = [
                            231,
                            76,
                            60
                        ]; // Red
                    } else {
                        data.cell.styles.textColor = [
                            39,
                            174,
                            96
                        ]; // Green
                    }
                }
            }
        });
        // --- Footer / Signature ---
        const finalY = doc.lastAutoTable.finalY || 150;
        if (finalY < 230) {
            doc.text('Mengetahui,', 140, finalY + 30);
            doc.text('Koordinator Penilaian', 140, finalY + 36);
            doc.text('(____________________)', 140, finalY + 60);
        } else {
            doc.addPage();
            doc.text('Mengetahui,', 140, 30);
            doc.text('Koordinator Penilaian', 140, 36);
            doc.text('(____________________)', 140, 60);
        }
        doc.save(`Laporan_Hasil_UKK_${new Date().toISOString().split('T')[0]}.pdf`);
    };
    const exportToExcel = ()=>{
        // Prepare data with new requirements
        const worksheetData = results.map((student, index)=>{
            return {
                'No': index + 1,
                'NIS': student.nis || '-',
                'Nama Siswa': student.name.toUpperCase(),
                'Kelas': student.class,
                'Lomba': student.event_name || '-',
                'Nilai Akhir': Number(student.final_score).toFixed(2),
                'Predikat': student.final_score >= 75 ? 'KOMPETEN' : 'BELUM KOMPETEN'
            };
        });
        const worksheet = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$xlsx$2f$xlsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["utils"].json_to_sheet(worksheetData);
        // Auto-width
        const wscols = [
            {
                wch: 5
            },
            {
                wch: 15
            },
            {
                wch: 35
            },
            {
                wch: 15
            },
            {
                wch: 20
            },
            {
                wch: 12
            },
            {
                wch: 20
            }
        ];
        worksheet['!cols'] = wscols;
        // Add Footer "Mengetahui..."
        const range = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$xlsx$2f$xlsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["utils"].decode_range(worksheet['!ref']);
        const lastRow = range.e.r + 2; // Leave 1 empty row
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$xlsx$2f$xlsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["utils"].sheet_add_aoa(worksheet, [
            [
                "Mengetahui,"
            ],
            [
                "Kepala Program Keahlian"
            ],
            [
                ""
            ],
            [
                ""
            ],
            [
                "(_______________________)"
            ]
        ], {
            origin: {
                r: lastRow,
                c: 1
            }
        }); // Start at Column B
        const workbook = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$xlsx$2f$xlsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["utils"].book_new();
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$xlsx$2f$xlsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["utils"].book_append_sheet(workbook, worksheet, "LAPORAN_UKK_2026");
        // Generate filename
        const date = new Date().toISOString().split('T')[0];
        const filename = `Laporan_UKK_IT_${date}.xlsx`;
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$xlsx$2f$xlsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["writeFile"](workbook, filename);
    };
    // Auto-Refresh
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "RecapPage.useEffect": ()=>{
            const interval = setInterval(fetchResults, 5000); // Poll every 5 seconds
            return ({
                "RecapPage.useEffect": ()=>clearInterval(interval)
            })["RecapPage.useEffect"];
        }
    }["RecapPage.useEffect"], []);
    const getMaxScore = ()=>Math.max(...results.map((r)=>r.final_score), 100);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "dashboard-container min-h-screen py-12 bg-gray-50",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white shadow-sm border-b px-6 py-4 flex justify-between items-center sticky top-0 z-20",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-blue-600 p-2 rounded-lg text-white",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trophy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trophy$3e$__["Trophy"], {
                                    size: 20
                                }, void 0, false, {
                                    fileName: "[project]/app/koordinator-view/page.tsx",
                                    lineNumber: 260,
                                    columnNumber: 25
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/koordinator-view/page.tsx",
                                lineNumber: 259,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        className: "font-bold text-gray-800 text-lg",
                                        children: [
                                            "Koordinator",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-blue-600",
                                                children: "View"
                                            }, void 0, false, {
                                                fileName: "[project]/app/koordinator-view/page.tsx",
                                                lineNumber: 263,
                                                columnNumber: 84
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/koordinator-view/page.tsx",
                                        lineNumber: 263,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-gray-500",
                                        children: "Real-time Ranking & Recap"
                                    }, void 0, false, {
                                        fileName: "[project]/app/koordinator-view/page.tsx",
                                        lineNumber: 264,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/koordinator-view/page.tsx",
                                lineNumber: 262,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/koordinator-view/page.tsx",
                        lineNumber: 258,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handlePrintPDF,
                                className: "flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-medium transition-colors shadow-sm",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$spreadsheet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileSpreadsheet$3e$__["FileSpreadsheet"], {
                                        size: 16
                                    }, void 0, false, {
                                        fileName: "[project]/app/koordinator-view/page.tsx",
                                        lineNumber: 272,
                                        columnNumber: 25
                                    }, this),
                                    "Cetak PDF"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/koordinator-view/page.tsx",
                                lineNumber: 268,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: exportToExcel,
                                className: "flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors shadow-sm",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$spreadsheet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileSpreadsheet$3e$__["FileSpreadsheet"], {
                                        size: 16
                                    }, void 0, false, {
                                        fileName: "[project]/app/koordinator-view/page.tsx",
                                        lineNumber: 279,
                                        columnNumber: 25
                                    }, this),
                                    "Export Excel"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/koordinator-view/page.tsx",
                                lineNumber: 275,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>fetchResults(),
                                className: "flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors",
                                children: "Refresh"
                            }, void 0, false, {
                                fileName: "[project]/app/koordinator-view/page.tsx",
                                lineNumber: 282,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/",
                                className: "px-4 py-2 text-sm font-medium text-gray-500 hover:text-red-500",
                                children: "Exit"
                            }, void 0, false, {
                                fileName: "[project]/app/koordinator-view/page.tsx",
                                lineNumber: 288,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/koordinator-view/page.tsx",
                        lineNumber: 267,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/koordinator-view/page.tsx",
                lineNumber: 257,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-6 md:px-12 grid grid-cols-1 lg:grid-cols-3 gap-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "lg:col-span-2 space-y-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-4 bg-gray-50 border-b border-gray-100 font-bold text-gray-700",
                                        children: "Leaderboard Tertinggi"
                                    }, void 0, false, {
                                        fileName: "[project]/app/koordinator-view/page.tsx",
                                        lineNumber: 298,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-0",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                            className: "w-full text-sm",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                                    className: "bg-white text-gray-500 uppercase text-xs font-semibold",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                        className: "border-b border-gray-100",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                className: "py-3 px-4 text-left w-12",
                                                                children: "#"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/koordinator-view/page.tsx",
                                                                lineNumber: 303,
                                                                columnNumber: 41
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                className: "py-3 px-4 text-left",
                                                                children: "Siswa"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/koordinator-view/page.tsx",
                                                                lineNumber: 304,
                                                                columnNumber: 41
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                className: "py-3 px-4 text-right",
                                                                children: "Nilai Akhir"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/koordinator-view/page.tsx",
                                                                lineNumber: 305,
                                                                columnNumber: 41
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/koordinator-view/page.tsx",
                                                        lineNumber: 302,
                                                        columnNumber: 37
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/koordinator-view/page.tsx",
                                                    lineNumber: 301,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                                    children: [
                                                        results.slice(0, 5).map((r, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                                className: "border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                        className: "py-3 px-4",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: `w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold 
                                                    ${i === 0 ? 'bg-yellow-100 text-yellow-700' : i === 1 ? 'bg-gray-200 text-gray-700' : i === 2 ? 'bg-orange-100 text-orange-700' : 'bg-gray-100 text-gray-500'}`,
                                                                            children: i + 1
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/koordinator-view/page.tsx",
                                                                            lineNumber: 312,
                                                                            columnNumber: 49
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/koordinator-view/page.tsx",
                                                                        lineNumber: 311,
                                                                        columnNumber: 45
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                        className: "py-3 px-4 font-medium text-gray-900",
                                                                        children: r.name
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/koordinator-view/page.tsx",
                                                                        lineNumber: 319,
                                                                        columnNumber: 45
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                        className: "py-3 px-4 text-right font-bold text-blue-600",
                                                                        children: r.final_score
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/koordinator-view/page.tsx",
                                                                        lineNumber: 320,
                                                                        columnNumber: 45
                                                                    }, this)
                                                                ]
                                                            }, r.id, true, {
                                                                fileName: "[project]/app/koordinator-view/page.tsx",
                                                                lineNumber: 310,
                                                                columnNumber: 41
                                                            }, this)),
                                                        results.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                colSpan: 3,
                                                                className: "p-4 text-center text-gray-400",
                                                                children: "Belum ada data."
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/koordinator-view/page.tsx",
                                                                lineNumber: 323,
                                                                columnNumber: 66
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/koordinator-view/page.tsx",
                                                            lineNumber: 323,
                                                            columnNumber: 62
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/koordinator-view/page.tsx",
                                                    lineNumber: 308,
                                                    columnNumber: 33
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/koordinator-view/page.tsx",
                                            lineNumber: 300,
                                            columnNumber: 29
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/koordinator-view/page.tsx",
                                        lineNumber: 299,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/koordinator-view/page.tsx",
                                lineNumber: 297,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-4 bg-gray-50 border-b border-gray-100 font-bold text-gray-700",
                                        children: "Data Lengkap"
                                    }, void 0, false, {
                                        fileName: "[project]/app/koordinator-view/page.tsx",
                                        lineNumber: 330,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "max-h-[400px] overflow-y-auto",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                            className: "w-full text-sm",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                                    className: "bg-white text-gray-500 uppercase text-xs font-semibold sticky top-0",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                        className: "border-b border-gray-100 bg-gray-50",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                className: "py-3 px-4 text-left",
                                                                children: "Nama"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/koordinator-view/page.tsx",
                                                                lineNumber: 335,
                                                                columnNumber: 41
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                className: "py-3 px-4 text-left",
                                                                children: "Kelas"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/koordinator-view/page.tsx",
                                                                lineNumber: 336,
                                                                columnNumber: 41
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                className: "py-3 px-4 text-right",
                                                                children: "Rata-Rata"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/koordinator-view/page.tsx",
                                                                lineNumber: 337,
                                                                columnNumber: 41
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                className: "py-3 px-4 text-right",
                                                                children: "Total"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/koordinator-view/page.tsx",
                                                                lineNumber: 338,
                                                                columnNumber: 41
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                className: "py-3 px-4 text-center",
                                                                children: "Status"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/koordinator-view/page.tsx",
                                                                lineNumber: 339,
                                                                columnNumber: 41
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/koordinator-view/page.tsx",
                                                        lineNumber: 334,
                                                        columnNumber: 37
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/koordinator-view/page.tsx",
                                                    lineNumber: 333,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                                    children: results.map((student)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                            className: "border-b border-gray-50 hover:bg-gray-50",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    className: "py-3 px-4 font-medium text-gray-900",
                                                                    children: student.name
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/koordinator-view/page.tsx",
                                                                    lineNumber: 345,
                                                                    columnNumber: 45
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    className: "py-3 px-4 text-gray-500",
                                                                    children: student.class
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/koordinator-view/page.tsx",
                                                                    lineNumber: 346,
                                                                    columnNumber: 45
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    className: "py-3 px-4 text-right font-bold text-blue-600",
                                                                    children: Number(student.final_score).toFixed(2)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/koordinator-view/page.tsx",
                                                                    lineNumber: 347,
                                                                    columnNumber: 45
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    className: "py-3 px-4 text-right font-medium text-gray-700",
                                                                    children: Number(student.final_score).toFixed(2)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/koordinator-view/page.tsx",
                                                                    lineNumber: 348,
                                                                    columnNumber: 45
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    className: "py-3 px-4 text-center",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: `px-2 py-1 rounded text-xs font-bold ${student.final_score >= 75 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`,
                                                                        children: student.final_score >= 75 ? 'KOMPETEN' : 'BELUM KOMPETEN'
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/koordinator-view/page.tsx",
                                                                        lineNumber: 350,
                                                                        columnNumber: 49
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/koordinator-view/page.tsx",
                                                                    lineNumber: 349,
                                                                    columnNumber: 45
                                                                }, this)
                                                            ]
                                                        }, student.id, true, {
                                                            fileName: "[project]/app/koordinator-view/page.tsx",
                                                            lineNumber: 344,
                                                            columnNumber: 41
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/app/koordinator-view/page.tsx",
                                                    lineNumber: 342,
                                                    columnNumber: 33
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/koordinator-view/page.tsx",
                                            lineNumber: 332,
                                            columnNumber: 29
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/koordinator-view/page.tsx",
                                        lineNumber: 331,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/koordinator-view/page.tsx",
                                lineNumber: 329,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/koordinator-view/page.tsx",
                        lineNumber: 296,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-white border border-gray-200 rounded-2xl shadow-sm p-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "font-bold text-gray-700 mb-4",
                                        children: "Distribusi Nilai"
                                    }, void 0, false, {
                                        fileName: "[project]/app/koordinator-view/page.tsx",
                                        lineNumber: 365,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-3",
                                        children: results.slice(0, 8).map((student)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex justify-between text-xs mb-1 font-medium",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: student.name
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/koordinator-view/page.tsx",
                                                                lineNumber: 370,
                                                                columnNumber: 41
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: student.final_score
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/koordinator-view/page.tsx",
                                                                lineNumber: 371,
                                                                columnNumber: 41
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/koordinator-view/page.tsx",
                                                        lineNumber: 369,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "w-full bg-gray-100 rounded-full h-2.5 overflow-hidden",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "bg-blue-600 h-2.5 rounded-full transition-all duration-1000 ease-out",
                                                            style: {
                                                                width: `${student.final_score / 100 * 100}%`
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/koordinator-view/page.tsx",
                                                            lineNumber: 374,
                                                            columnNumber: 41
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/koordinator-view/page.tsx",
                                                        lineNumber: 373,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, student.id, true, {
                                                fileName: "[project]/app/koordinator-view/page.tsx",
                                                lineNumber: 368,
                                                columnNumber: 33
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/app/koordinator-view/page.tsx",
                                        lineNumber: 366,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/koordinator-view/page.tsx",
                                lineNumber: 364,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-6 text-white text-center shadow-lg",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-white/80 text-sm uppercase tracking-widest font-bold mb-1",
                                        children: "Rata-Rata Kelas"
                                    }, void 0, false, {
                                        fileName: "[project]/app/koordinator-view/page.tsx",
                                        lineNumber: 385,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-5xl font-bold mb-2",
                                        children: (results.reduce((a, b)=>a + b.final_score, 0) / (results.length || 1)).toFixed(1)
                                    }, void 0, false, {
                                        fileName: "[project]/app/koordinator-view/page.tsx",
                                        lineNumber: 386,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "inline-block bg-white/20 px-3 py-1 rounded-full text-xs font-medium",
                                        children: [
                                            results.length,
                                            " Siswa Dinilai"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/koordinator-view/page.tsx",
                                        lineNumber: 389,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/koordinator-view/page.tsx",
                                lineNumber: 384,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/koordinator-view/page.tsx",
                        lineNumber: 363,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/koordinator-view/page.tsx",
                lineNumber: 294,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/koordinator-view/page.tsx",
        lineNumber: 255,
        columnNumber: 9
    }, this);
}
_s(RecapPage, "BFRwLG4HxEXRETz7wFVM/LYrfTI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = RecapPage;
var _c;
__turbopack_context__.k.register(_c, "RecapPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_4015c581._.js.map