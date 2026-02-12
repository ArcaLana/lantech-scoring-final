"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabase';
import Link from 'next/link';
import { ArrowLeft, Gavel, CheckCircle, User, School, Lock, Save, Calculator } from 'lucide-react';

export default function JuryPage() {
    const router = useRouter();
    const [students, setStudents] = useState<any[]>([]);
    const [events, setEvents] = useState<any[]>([]); // New: Events list
    const [selectedEventId, setSelectedEventId] = useState(''); // New: Selected Event

    // Select student
    const [selectedStudent, setSelectedStudent] = useState<any | null>(null);
    const [criteriaList, setCriteriaList] = useState<any[]>([]);

    // Grading State
    const [scores, setScores] = useState<{ [key: string]: number }>({});
    const [notes, setNotes] = useState('');
    const [isLocked, setIsLocked] = useState(false);

    const [studentStatus, setStudentStatus] = useState<{ [key: string]: boolean }>({});
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        // Check Auth
        const role = localStorage.getItem('user_role');
        if (role !== 'Juri') {
            router.push('/');
        } else {
            fetchData();
        }
    }, [router]);

    async function fetchData() {
        setLoading(true);

        // 1. Fetch Students (We will filter client side OR fetch all)
        const { data: studentsData } = await supabase
            .from('students')
            .select('*')
            .order('name', { ascending: true });

        // 2. Fetch Events
        const { data: eventsData } = await supabase.from('events').select('*');
        if (eventsData) setEvents(eventsData);

        // 3. Fetch Criteria (All active)
        const { data: criteriaData } = await supabase.from('event_criteria').select('*');

        if (studentsData) setStudents(studentsData);
        if (criteriaData) setCriteriaList(criteriaData);

        // Check status (simplified)
        // ... (Status logic removed for now, will calculate on fly if needed, or just keep simple)

        setLoading(false);
    }

    const handleSelectStudent = async (studentId: string) => {
        const student = students.find(s => s.id === studentId);
        if (!student) return;

        setSelectedStudent(student);
        setScores({});
        setNotes('');
        setSaving(false);

        // Fetch existing scores
        const { data: existingScores } = await supabase
            .from('scores')
            .select('*')
            .eq('student_id', student.id);

        let finalStatusFound = false;
        if (existingScores) {
            const newScores: any = {};
            existingScores.forEach((s: any) => {
                newScores[s.criteria_id] = s.score;
                if (s.is_final) finalStatusFound = true;
            });
            setScores(newScores);
        }

        setIsLocked(finalStatusFound);
    };

    const handleScoreChange = (criteriaId: string, value: number) => {
        if (isLocked) return;

        // Strict Input Limit 0-100 (UI Update Limit)
        let safeValue = value;
        if (safeValue < 0) safeValue = 0;
        if (safeValue > 100) safeValue = 100;

        setScores(prev => ({ ...prev, [criteriaId]: safeValue }));
    };

    const calculateStats = () => {
        if (!selectedStudent || criteriaList.length === 0) return { total: 0, average: 0 };

        // ABSOLUTE MATH LOGIC (Hardcoded Request)
        // const totalWeight = criteria.reduce((sum, c) => sum + Number(c.weight), 0);
        // const finalScore = (totalWeightedPoints / totalWeight);

        let totalWeightedPoints = 0;
        let totalWeight = 0;

        // FILTER CRITERIA BY EVENT!
        const activeCriteria = criteriaList.filter(c => !selectedEventId || c.event_id == selectedEventId);

        activeCriteria.forEach(crit => {
            const rawScore = scores[crit.id] || 0;
            const weight = Number(crit.weight || 0); // Force Number

            totalWeightedPoints += (rawScore * weight);
            totalWeight += weight;
        });

        // Avoid division by zero
        const finalAverage = totalWeight > 0 ? (totalWeightedPoints / totalWeight) : 0;

        // Clamp 0-100 just in case
        const safeAverage = Math.min(100, Math.max(0, finalAverage));

        return { total: totalWeightedPoints, average: safeAverage, totalWeight: totalWeight };
    };

    const handleSave = async (lock: boolean = false) => {
        if (!selectedStudent) {
            alert("Pilih siswa terlebih dahulu!");
            return;
        }
        setSaving(true);

        try {
            // 1. Upsert Scores (Individual Criteria)
            // Ensure student_id and criteria_id are SAFE
            const updates = Object.keys(scores).map(critId => {
                const scoreVal = scores[critId];
                if (!critId || scoreVal === undefined) return null; // Skip invalid

                return {
                    student_id: selectedStudent.id,
                    criteria_id: critId,
                    score: scoreVal
                };
            }).filter(u => u !== null); // Remove nulls

            if (updates.length > 0) {
                const { error: scoreError } = await supabase.from('scores').upsert(updates);
                if (scoreError) throw scoreError;
            }

            const stats = calculateStats();

            if (lock) {
                // 2. Lock & Save Final Stats to SCORES table
                const updatePayload: any = {
                    is_final: true,
                    average_score: stats.average
                };

                // Add event_id if available (User Requirement)
                // Use selectedEventId from state if student doesn't have it explicitly
                const finalEventId = selectedStudent.event_id || selectedEventId;
                if (finalEventId) {
                    updatePayload['event_id'] = finalEventId;
                }

                const { error: finalError } = await supabase
                    .from('scores')
                    .update(updatePayload)
                    .eq('student_id', selectedStudent.id);

                if (finalError) {
                    console.warn("Update Error:", finalError.message);
                    alert(`Gagal mengunci: ${finalError.message}.`);
                } else {
                    console.log('Data tersimpan di Database: scores', updatePayload);
                    setIsLocked(true);
                    alert(`Data Berhasil Dikunci dan Dikirim ke Koordinator!`);
                    fetchData();
                }
            } else {
                alert('Draft nilai tersimpan.');
            }

        } catch (err: any) {
            alert('Error: ' + err.message);
        } finally {
            setSaving(false);
        }
    };

    return (
        <main className="min-h-screen bg-gray-50 pb-20">
            {/* Header */}
            <div className="bg-white shadow-sm border-b px-6 py-4 flex justify-between items-center sticky top-0 z-20">
                <div className="flex items-center gap-3">
                    <div className="bg-purple-600 p-2 rounded-lg text-white">
                        <Gavel size={20} />
                    </div>
                    <h1 className="font-bold text-gray-800 text-lg">Juri<span className="text-purple-600">Room</span></h1>
                </div>
                <Link href="/" className="text-sm font-medium text-gray-500 hover:text-red-500">Exit</Link>
            </div>

            <div className="max-w-4xl mx-auto p-6">

                {/* 1. Selection Area */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {/* Event Selector */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <label className="block text-sm font-bold text-gray-700 mb-2">Pilih Lomba / Kompetensi</label>
                        <div className="relative">
                            <select
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all appearance-none bg-white"
                                onChange={(e) => {
                                    setSelectedEventId(e.target.value);
                                    setSelectedStudent(null);
                                }}
                                value={selectedEventId}
                            >
                                <option value="">-- Pilih Lomba --</option>
                                {events.map(ev => (
                                    <option key={ev.id} value={ev.id}>{ev.event_name}</option>
                                ))}
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">▼</div>
                        </div>
                    </div>

                    {/* Student Selector (Filtered) */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <label className="block text-sm font-bold text-gray-700 mb-2">Pilih Peserta Ujian</label>
                        <div className="relative">
                            <select
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all appearance-none bg-white"
                                onChange={(e) => handleSelectStudent(e.target.value)}
                                value={selectedStudent?.id || ''}
                                disabled={!selectedEventId}
                            >
                                <option value="">-- Pilih Siswa --</option>
                                {students
                                    .filter(s => !selectedEventId || s.event_id == selectedEventId) // Filter by event if selected
                                    .map(s => (
                                        <option key={s.id} value={s.id}>{s.name} - {s.class}</option>
                                    ))}
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">▼</div>
                        </div>
                    </div>
                </div>

                {selectedStudent ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* LEFT: Scoring Form */}
                        <div className="md:col-span-2 space-y-6">
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                                <div className="p-4 bg-purple-50 border-b border-purple-100 flex justify-between items-center">
                                    <h2 className="font-bold text-purple-800">Form Penilaian</h2>
                                    {isLocked && <div className="flex items-center gap-1 text-xs font-bold bg-green-100 text-green-700 px-2 py-1 rounded-md"><Lock size={12} /> TERKUNCI</div>}
                                </div>
                                <div className="p-6 space-y-6">
                                    {criteriaList
                                        .filter(crit => !selectedEventId || crit.event_id == selectedEventId) // Filter criteria by event too!
                                        .map((crit) => (
                                            <div key={crit.id} className="pb-4 border-b border-gray-50 last:border-0 last:pb-0">
                                                <div className="flex justify-between mb-2">
                                                    <label className="font-semibold text-gray-700 text-sm">{crit.criteria_name}</label>
                                                    <span className="text-xs font-bold text-purple-500 bg-purple-50 px-2 py-0.5 rounded">Bobot: {crit.weight || 0}</span>
                                                </div>
                                                <input
                                                    type="number"
                                                    placeholder="0-100"
                                                    min="0"
                                                    max="100"
                                                    disabled={isLocked}
                                                    value={scores[crit.id] || ''}
                                                    onChange={(e) => handleScoreChange(crit.id, parseFloat(e.target.value))}
                                                    className={`w-full px-4 py-3 rounded-xl border outline-none transition-all block text-lg font-mono
                                                    ${isLocked ? 'bg-gray-50 text-gray-400 border-gray-100' : 'border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-50'}`}
                                                />
                                            </div>
                                        ))}

                                    {/* Handle empty criteria */}
                                    {criteriaList.filter(crit => !selectedEventId || crit.event_id == selectedEventId).length === 0 && (
                                        <p className="text-center text-gray-400 italic">Belum ada kriteria untuk lomba ini.</p>
                                    )}

                                    <div className="pt-4">
                                        <label className="font-semibold text-gray-700 text-sm mb-2 block">Catatan Juri (Opsional)</label>
                                        <textarea
                                            rows={3}
                                            disabled={isLocked}
                                            value={notes}
                                            onChange={(e) => setNotes(e.target.value)}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-purple-500 transition-all text-sm"
                                            placeholder="Berikan masukan untuk siswa..."
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT: Calculator & Actions */}
                        <div className="space-y-6">
                            <div className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-2xl p-6 text-white shadow-xl shadow-purple-200">
                                <div className="flex items-center gap-2 opacity-80 mb-2">
                                    <Calculator size={18} />
                                    <span className="text-xs font-bold uppercase tracking-wider">Hasil Penilaian</span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-sm opacity-75">Nilai Akhir</span>
                                    <div className="text-5xl font-bold tracking-tight">
                                        {calculateStats().average.toFixed(2)}
                                        <span className="text-2xl opacity-50 font-normal">/100</span>
                                    </div>
                                    <span className="text-[10px] opacity-60 italic">
                                        Rumus: (Total Poin Berbobot / Total Bobot)
                                    </span>
                                    <div className="h-px bg-white/20 my-2"></div>
                                    <div className="flex justify-between items-center text-sm font-medium">
                                        <span>Status</span>
                                        <span className="bg-white/20 px-2 py-0.5 rounded text-xs">
                                            {isLocked ? 'TERKUNCI' : 'DRAFT'}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {!isLocked ? (
                                <div className="grid grid-cols-1 gap-3">
                                    <button
                                        onClick={() => handleSave(false)}
                                        disabled={saving}
                                        className="py-3 px-4 rounded-xl font-bold text-purple-600 bg-white border border-purple-200 hover:bg-purple-50 transition-all flex items-center justify-center gap-2"
                                    >
                                        <Save size={18} /> Simpan Draft
                                    </button>
                                    <button
                                        onClick={() => handleSave(true)}
                                        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-green-200 transition-all flex items-center justify-center gap-2"
                                    >
                                        <Lock size={18} />
                                        Selesai Nilai (Final)
                                    </button>
                                </div>
                            ) : (
                                <button
                                    disabled
                                    className="w-full bg-gray-100 text-gray-400 font-bold py-4 rounded-xl flex items-center justify-center gap-2 cursor-not-allowed"
                                >
                                    <Lock size={18} />
                                    Nilai Terkunci
                                </button>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-20 text-gray-400">
                        <School size={48} className="mx-auto mb-4 opacity-20" />
                        <p>Silakan pilih siswa untuk mulai menilai.</p>
                    </div>
                )}
            </div>
        </main>
    );
}
