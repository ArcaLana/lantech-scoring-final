"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabase';
import Link from 'next/link';
import { ArrowLeft, Star, Award, CheckCircle2 } from 'lucide-react';

export default function ViewScorePage() {
    const params = useParams();
    const router = useRouter();
    const studentId = params.studentId;

    const [student, setStudent] = useState<any>(null);
    const [scores, setScores] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [average, setAverage] = useState(0);

    useEffect(() => {
        // Check Auth
        const isAuth = localStorage.getItem('access_jury');
        if (isAuth !== 'true') {
            router.push('/');
            return;
        }

        if (studentId) fetchData();
    }, [studentId]);

    async function fetchData() {
        setLoading(true);

        // 1. Fetch Student
        const { data: studentData } = await supabase
            .from('students')
            .select('*')
            .eq('id', studentId)
            .single();

        if (studentData) setStudent(studentData);

        // 2. Fetch Scores with Criteria Details
        // We join scores with criteria to get the name
        const { data: scoresData, error } = await supabase
            .from('scores')
            .select(`
                score,
                criteria:criteria_id ( id, name, max_score )
            `)
            .eq('student_id', studentId);

        if (error) {
            console.error(error);
        }

        if (scoresData) {
            // Transform data to flat structure if needed, or use as is
            // supabase returns criteria as an object or array depending on relationship.
            // Assuming criteria_id is a FK to criteria table.

            setScores(scoresData);

            // Calculate Average
            if (scoresData.length > 0) {
                const total = scoresData.reduce((sum, item: any) => sum + item.score, 0);
                setAverage(total / scoresData.length);
            }
        }

        setLoading(false);
    }

    if (loading) return <div className="p-12 text-center text-gray-500">Memuat data nilai...</div>;
    if (!student) return <div className="p-12 text-center text-red-500">Siswa tidak ditemukan</div>;

    return (
        <main className="dashboard-container bg-gray-50">
            <div className="mb-8">
                <Link href="/jury" className="inline-flex items-center gap-2 text-gray-500 hover:text-blue-600 mb-4 transition-colors font-medium">
                    <ArrowLeft size={20} /> Kembali ke Daftar
                </Link>

                <div className="premium-card bg-white border-2 border-green-100 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                        <Award size={150} />
                    </div>
                    <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
                        <div>
                            <div className="flex items-center gap-2 text-green-600 font-bold mb-2">
                                <CheckCircle2 size={20} /> Penilaian Selesai
                            </div>
                            <h1 className="text-3xl font-bold text-gray-900">{student.name}</h1>
                            <p className="text-gray-500 text-lg">{student.class || student.kelas}</p>
                        </div>
                        <div className="text-center bg-green-50 px-8 py-4 rounded-2xl border border-green-100">
                            <p className="text-sm text-green-600 font-bold uppercase tracking-wider mb-1">Nilai Rata-Rata</p>
                            <span className="text-5xl font-bold text-green-700">{average.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto grid gap-4">
                {scores.map((item: any, index) => {
                    const critName = item.criteria?.name || 'Kriteria Unknown';
                    const maxScore = item.criteria?.max_score || 100;

                    return (
                        <div key={index} className="premium-card flex justify-between items-center py-4 px-6">
                            <div>
                                <p className="text-xs text-gray-400 font-bold uppercase mb-1">Kriteria {index + 1}</p>
                                <h3 className="text-lg font-bold text-gray-800">{critName}</h3>
                                <p className="text-xs text-gray-400">Max: {maxScore}</p>
                            </div>
                            <div className="text-2xl font-bold text-blue-600 bg-blue-50 px-4 py-2 rounded-lg border border-blue-100">
                                {item.score}
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="max-w-4xl mx-auto mt-8 text-center">
                <p className="text-gray-400 text-sm">Data ini telah tersimpan dan divalidasi oleh Juri.</p>
            </div>

        </main>
    );
}
