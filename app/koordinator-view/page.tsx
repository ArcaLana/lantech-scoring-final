"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabase';
import Link from 'next/link';
import { ArrowLeft, Trophy, FileSpreadsheet } from 'lucide-react';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { UserOptions } from 'jspdf-autotable';

interface jsPDFCustom extends jsPDF {
    autoTable: (options: UserOptions) => void;
}

interface StudentResult {
    id: string | number;
    name: string;
    class: string;
    nis?: string;
    event_name?: string;
    final_score: number;
}

export default function RecapPage() {
    const router = useRouter();
    const [results, setResults] = useState<StudentResult[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check Auth
        const role = localStorage.getItem('user_role');
        if (role !== 'Koordinator Akademik') {
            router.push('/');
        } else {
            fetchResults();

            // Real-time Sync (Subscription)
            const channel = supabase
                .channel('realtime-scores')
                .on(
                    'postgres_changes',
                    { event: '*', schema: 'public', table: 'scores', filter: 'is_final=eq.true' },
                    (payload) => {
                        console.log('Real-time update received:', payload);
                        fetchResults();
                    }
                )
                .subscribe();

            // Polling Fallback (5 seconds) as requested
            const intervalId = setInterval(() => {
                fetchResults();
            }, 5000);

            return () => {
                supabase.removeChannel(channel);
                clearInterval(intervalId);
            };
        }
    }, []);

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
            const { data: rawScores, error } = await supabase
                .from('scores')
                .select('*, students(name, nis, class), events(event_name)')
                .eq('is_final', true);

            if (error) throw error;

            if (rawScores) {
                // Deduplicate by student_id
                const uniqueMap = new Map();

                rawScores.forEach((item: any) => {
                    // Safety check for undefined relations
                    const studentName = item.students?.name || 'Unknown';
                    const studentNis = item.students?.nis || '-';
                    const studentClass = item.students?.class || '-';
                    const eventName = item.events?.event_name || '-';

                    if (!uniqueMap.has(item.student_id)) {
                        uniqueMap.set(item.student_id, {
                            id: item.student_id, // Use student_id from score
                            name: studentName,
                            class: studentClass,
                            nis: studentNis,
                            event_name: eventName,
                            final_score: item.average_score || 0
                        });
                    }
                });

                const resultsArray: StudentResult[] = Array.from(uniqueMap.values());

                // Auto-Ranking (Desc)
                resultsArray.sort((a, b) => b.final_score - a.final_score);
                setResults(resultsArray);
            }
        } catch (err) {
            console.error("Error fetching results:", err);
        } finally {
            setLoading(false);
        }
    }



    // ... inside component ...

    const handlePrintPDF = () => {
        const doc = new jsPDF() as jsPDFCustom;

        // --- Header ---
        doc.setFontSize(18);
        doc.setTextColor(41, 128, 185); // Blue
        doc.text('LANTECH DIGITAL PTY LTD', 105, 20, { align: 'center' });

        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.text('Digital Assessment System 2026', 105, 26, { align: 'center' });
        doc.line(20, 30, 190, 30); // Horizontal Line

        // --- Title ---
        doc.setFontSize(14);
        doc.setTextColor(0);
        doc.text('LAPORAN HASIL PENILAIAN UKK', 105, 40, { align: 'center' });

        doc.setFontSize(10);
        const dateStr = new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        doc.text(`Dicetak pada: ${dateStr}`, 105, 46, { align: 'center' });

        // --- Table ---
        const tableBody = results.map((r, i) => [
            i + 1,
            r.name.toUpperCase(),
            r.class,
            r.event_name || '-',
            r.final_score.toFixed(2),
            r.final_score >= 75 ? 'KOMPETEN' : 'BELUM KOMPETEN'
        ]);

        doc.autoTable({
            startY: 55,
            head: [['No', 'Nama Siswa', 'Kelas', 'Lomba', 'Nilai', 'Predikat']],
            body: tableBody,
            theme: 'grid',
            headStyles: { fillColor: [41, 128, 185], textColor: 255 },
            styles: { fontSize: 10, cellPadding: 2 },
            columnStyles: {
                0: { cellWidth: 10, halign: 'center' },
                4: { halign: 'right' },
                5: { halign: 'center', fontStyle: 'bold' }
            },
            didParseCell: (data) => {
                // Colorize Predicate
                if (data.section === 'body' && data.column.index === 5) {
                    const text = data.cell.raw as string;
                    if (text === 'BELUM KOMPETEN') {
                        data.cell.styles.textColor = [231, 76, 60]; // Red
                    } else {
                        data.cell.styles.textColor = [39, 174, 96]; // Green
                    }
                }
            }
        });

        // --- Footer / Signature ---
        const finalY = (doc as any).lastAutoTable.finalY || 150;

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

    const exportToExcel = () => {
        // Prepare data with new requirements
        const worksheetData: any[] = results.map((student, index) => {
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

        const worksheet = XLSX.utils.json_to_sheet(worksheetData);

        // Auto-width
        const wscols = [
            { wch: 5 },  // No
            { wch: 15 }, // NIS
            { wch: 35 }, // Nama
            { wch: 15 }, // Kelas
            { wch: 20 }, // Lomba
            { wch: 12 }, // Nilai
            { wch: 20 }, // Predikat
        ];
        worksheet['!cols'] = wscols;

        // Add Footer "Mengetahui..."
        const range = XLSX.utils.decode_range(worksheet['!ref']!);
        const lastRow = range.e.r + 2; // Leave 1 empty row

        XLSX.utils.sheet_add_aoa(worksheet, [
            ["Mengetahui,"],
            ["Kepala Program Keahlian"],
            [""],
            [""],
            ["(_______________________)"]
        ], { origin: { r: lastRow, c: 1 } }); // Start at Column B

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "LAPORAN_UKK_2026");

        // Generate filename
        const date = new Date().toISOString().split('T')[0];
        const filename = `Laporan_UKK_IT_${date}.xlsx`;

        XLSX.writeFile(workbook, filename);
    };

    // Auto-Refresh
    useEffect(() => {
        const interval = setInterval(fetchResults, 5000); // Poll every 5 seconds
        return () => clearInterval(interval);
    }, []);

    const getMaxScore = () => Math.max(...results.map(r => r.final_score), 100);

    return (
        <main className="dashboard-container min-h-screen py-12 bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b px-6 py-4 flex justify-between items-center sticky top-0 z-20">
                <div className="flex items-center gap-3">
                    <div className="bg-blue-600 p-2 rounded-lg text-white">
                        <Trophy size={20} />
                    </div>
                    <div>
                        <h1 className="font-bold text-gray-800 text-lg">Koordinator<span className="text-blue-600">View</span></h1>
                        <p className="text-xs text-gray-500">Real-time Ranking & Recap</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={handlePrintPDF}
                        className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-medium transition-colors shadow-sm"
                    >
                        <FileSpreadsheet size={16} />
                        Cetak PDF
                    </button>
                    <button
                        onClick={exportToExcel}
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors shadow-sm"
                    >
                        <FileSpreadsheet size={16} />
                        Export Excel
                    </button>
                    <button
                        onClick={() => fetchResults()}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
                    >
                        Refresh
                    </button>
                    <Link href="/" className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-red-500">
                        Exit
                    </Link>
                </div>
            </div>

            <div className="px-6 md:px-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* LEFT: Leaderboard & Stats */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
                        <div className="p-4 bg-gray-50 border-b border-gray-100 font-bold text-gray-700">Leaderboard Tertinggi</div>
                        <div className="p-0">
                            <table className="w-full text-sm">
                                <thead className="bg-white text-gray-500 uppercase text-xs font-semibold">
                                    <tr className="border-b border-gray-100">
                                        <th className="py-3 px-4 text-left w-12">#</th>
                                        <th className="py-3 px-4 text-left">Siswa</th>
                                        <th className="py-3 px-4 text-right">Nilai Akhir</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {results.slice(0, 5).map((r, i) => (
                                        <tr key={r.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
                                            <td className="py-3 px-4">
                                                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold 
                                                    ${i === 0 ? 'bg-yellow-100 text-yellow-700' :
                                                        i === 1 ? 'bg-gray-200 text-gray-700' :
                                                            i === 2 ? 'bg-orange-100 text-orange-700' : 'bg-gray-100 text-gray-500'}`}>
                                                    {i + 1}
                                                </div>
                                            </td>
                                            <td className="py-3 px-4 font-medium text-gray-900">{r.name}</td>
                                            <td className="py-3 px-4 text-right font-bold text-blue-600">{r.final_score}</td>
                                        </tr>
                                    ))}
                                    {results.length === 0 && <tr><td colSpan={3} className="p-4 text-center text-gray-400">Belum ada data.</td></tr>}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
                        <div className="p-4 bg-gray-50 border-b border-gray-100 font-bold text-gray-700">Data Lengkap</div>
                        <div className="max-h-[400px] overflow-y-auto">
                            <table className="w-full text-sm">
                                <thead className="bg-white text-gray-500 uppercase text-xs font-semibold sticky top-0">
                                    <tr className="border-b border-gray-100 bg-gray-50">
                                        <th className="py-3 px-4 text-left">Nama</th>
                                        <th className="py-3 px-4 text-left">Kelas</th>
                                        <th className="py-3 px-4 text-right">Rata-Rata</th>
                                        <th className="py-3 px-4 text-right">Total</th>
                                        <th className="py-3 px-4 text-center">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {results.map((student) => (
                                        <tr key={student.id} className="border-b border-gray-50 hover:bg-gray-50">
                                            <td className="py-3 px-4 font-medium text-gray-900">{student.name}</td>
                                            <td className="py-3 px-4 text-gray-500">{student.class}</td>
                                            <td className="py-3 px-4 text-right font-bold text-blue-600">{Number(student.final_score).toFixed(2)}</td>
                                            <td className="py-3 px-4 text-right font-medium text-gray-700">{Number(student.final_score).toFixed(2)}</td>
                                            <td className="py-3 px-4 text-center">
                                                <span className={`px-2 py-1 rounded text-xs font-bold ${student.final_score >= 75 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                    {student.final_score >= 75 ? 'KOMPETEN' : 'BELUM KOMPETEN'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* RIGHT: Visual Graphs */}
                <div className="space-y-6">
                    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
                        <h3 className="font-bold text-gray-700 mb-4">Distribusi Nilai</h3>
                        <div className="space-y-3">
                            {results.slice(0, 8).map(student => (
                                <div key={student.id}>
                                    <div className="flex justify-between text-xs mb-1 font-medium">
                                        <span>{student.name}</span>
                                        <span>{student.final_score}</span>
                                    </div>
                                    <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                                        <div
                                            className="bg-blue-600 h-2.5 rounded-full transition-all duration-1000 ease-out"
                                            style={{ width: `${(student.final_score / 100) * 100}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-6 text-white text-center shadow-lg">
                        <p className="text-white/80 text-sm uppercase tracking-widest font-bold mb-1">Rata-Rata Kelas</p>
                        <h2 className="text-5xl font-bold mb-2">
                            {(results.reduce((a, b) => a + b.final_score, 0) / (results.length || 1)).toFixed(1)}
                        </h2>
                        <div className="inline-block bg-white/20 px-3 py-1 rounded-full text-xs font-medium">
                            {results.length} Siswa Dinilai
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
