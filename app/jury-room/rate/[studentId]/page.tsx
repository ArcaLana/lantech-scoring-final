"use client";

import { useEffect, useState, useRef, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabase';
import Link from 'next/link';
import { ArrowLeft, Save, FileSignature, CheckCircle, Cloud, Loader2, Lock } from 'lucide-react';

export default function RatePage() {
    const params = useParams();
    const router = useRouter();
    const studentId = params.studentId;

    const [student, setStudent] = useState<any>(null);
    const [criteria, setCriteria] = useState<any[]>([]);
    const [scores, setScores] = useState<{ [key: string]: number }>({});
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [lastSaved, setLastSaved] = useState<Date | null>(null);
    const [judgeId, setJudgeId] = useState<string>('');
    const [isLocked, setIsLocked] = useState(false);

    // Signature ref
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [hasSignature, setHasSignature] = useState(false);

    useEffect(() => {
        // Check Auth & Get Judge Key
        const role = localStorage.getItem('user_role');
        const key = localStorage.getItem('access_key');

        if (role !== 'jury' || !key) {
            router.push('/');
            return;
        }
        setJudgeId(key);

        if (studentId) fetchData();
    }, [studentId]);

    async function fetchData() {
        setLoading(true);

        // Fetch Student & Check Lock Status
        const { data: studentData } = await supabase
            .from('students')
            .select('*')
            .eq('id', studentId)
            .single();

        if (studentData) {
            setStudent(studentData);
            if (studentData.is_locked) {
                setIsLocked(true);
            }
        }

        // Fetch Criteria
        const { data: criteriaData } = await supabase
            .from('criteria')
            .select('*')
            .order('id', { ascending: true });

        if (criteriaData) setCriteria(criteriaData);

        // Fetch Existing Scores for THIS Judge
        const key = localStorage.getItem('access_key');
        if (key) {
            const { data: existingScores } = await supabase
                .from('scores')
                .select('*')
                .eq('student_id', studentId)
                .eq('judge_id', key);

            if (existingScores && existingScores.length > 0) {
                const loaded: any = {};
                existingScores.forEach((s: any) => {
                    loaded[s.criteria_id] = s.score;
                });
                setScores(loaded);
            }
        }

        setLoading(false);
        setTimeout(initCanvas, 500);
    }

    // --- Autosave Logic ---
    // Debounce function (using standard timeout since no lodash yet)
    const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const triggerAutosave = (newScores: any) => {
        setSaving(true);
        if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);

        saveTimeoutRef.current = setTimeout(async () => {
            await saveToDB(newScores, true); // Silent save
        }, 1000); // 1 second debounce
    };

    const saveToDB = async (currentScores: any, silent: boolean = false) => {
        if (isLocked) return;

        const judgeKey = localStorage.getItem('access_key');
        if (!judgeKey) return;

        // Security Patch: Validate all scores against max_score before sending
        const payloads = criteria.map(c => {
            let safeScore = currentScores[c.id] || 0;
            const max = c.max_score || 100;

            // Hard Limit / Clamping
            if (safeScore > max) safeScore = max;
            if (safeScore < 0) safeScore = 0;

            return {
                student_id: studentId,
                criteria_id: c.id,
                judge_id: judgeKey, // Critical: Link score to specific judge
                score: safeScore,
                judge_name: localStorage.getItem('user_name') || 'Juri'
            };
        });

        // Filter out scores that haven't been touched? No, upsert all current state is safer for now.
        // Actually, only sending changed ones is efficient, but upsert is fine.

        const { error } = await supabase
            .from('scores')
            .upsert(payloads, { onConflict: 'student_id,criteria_id,judge_id' });

        if (!error) {
            setLastSaved(new Date());
        } else {
            console.error("Autosave failed", error);
        }
        setSaving(false);
    };

    const handleScoreChange = (criteriaId: string | number, value: string) => {
        if (isLocked) return;

        let val = parseInt(value);
        if (isNaN(val)) val = 0;

        // Input Masking / Instant Validation
        const crit = criteria.find(c => c.id === criteriaId);
        const max = crit ? crit.max_score : 100;

        if (val > max) {
            // Optional: Shake UI or Visual feedback
            val = max;
        }
        if (val < 0) val = 0;

        const updatedScores = { ...scores, [criteriaId]: val };
        setScores(updatedScores);

        // Trigger Autosave
        triggerAutosave(updatedScores);
    };

    // --- Signature ---
    function initCanvas() {
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.lineWidth = 2;
                ctx.lineCap = 'round';
                ctx.strokeStyle = '#000';
            }
        }
    }
    const startDrawing = (e: any) => {
        if (isLocked) return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        setIsDrawing(true);
        setHasSignature(true);
        const rect = canvas.getBoundingClientRect();
        const x = (e.clientX || e.touches[0].clientX) - rect.left;
        const y = (e.clientY || e.touches[0].clientY) - rect.top;
        ctx.beginPath();
        ctx.moveTo(x, y);
    };
    const draw = (e: any) => {
        if (!isDrawing || isLocked) return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const rect = canvas.getBoundingClientRect();
        const x = (e.clientX || e.touches[0].clientX) - rect.left;
        const y = (e.clientY || e.touches[0].clientY) - rect.top;
        ctx!.lineTo(x, y);
        ctx!.stroke();
    };
    const stopDrawing = () => setIsDrawing(false);
    const clearSignature = () => {
        if (isLocked) return;
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            ctx!.clearRect(0, 0, canvas.width, canvas.height);
            setHasSignature(false);
        }
    };

    if (loading) return <div className="p-12 text-center text-gray-500">Initializing Assessment...</div>;
    if (!student) return <div className="p-12 text-center text-red-500">Student not found</div>;

    return (
        <main className="dashboard-container bg-gray-50 min-h-screen pb-20">
            {/* Header / Nav */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 sticky top-0 bg-gray-50 z-20 py-4 shadow-sm md:shadow-none">
                <Link href="/jury" className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors font-medium">
                    <ArrowLeft size={20} /> <span className="hidden md:inline">Back to List</span>
                </Link>

                {/* Status Indicator */}
                <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">
                    {saving ? (
                        <span className="flex items-center gap-2 text-blue-600 text-sm font-bold animate-pulse">
                            <Cloud size={16} /> Saving...
                        </span>
                    ) : lastSaved ? (
                        <span className="flex items-center gap-2 text-green-600 text-sm font-bold">
                            <CheckCircle size={16} /> Saved {lastSaved.toLocaleTimeString()}
                        </span>
                    ) : (
                        <span className="text-gray-400 text-sm">Ready to score</span>
                    )}
                </div>
            </div>

            {/* Student Info */}
            <div className="premium-card bg-gradient-to-r from-indigo-900 to-blue-800 text-white border-none shadow-xl mb-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                    <FileSignature size={120} />
                </div>
                <div className="relative z-10">
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">{student.name}</h1>
                    <p className="text-blue-200 text-lg flex items-center gap-2 mb-4">
                        <span className="bg-blue-700/50 px-3 py-1 rounded-lg border border-blue-500/30">{student.class}</span>
                        <span className="opacity-70">#{student.id}</span>
                    </p>

                    {isLocked ? (
                        <div className="inline-flex items-center gap-2 bg-red-500/20 text-red-100 border border-red-500/50 px-4 py-2 rounded-lg font-bold">
                            <Lock size={18} /> ASSESSMENT LOCKED (READ-ONLY)
                        </div>
                    ) : (
                        <div className="inline-flex items-center gap-2 bg-green-500/20 text-green-100 border border-green-500/50 px-4 py-2 rounded-lg font-bold">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div> Live Scoring Active
                        </div>
                    )}
                </div>
            </div>

            {/* Scoring Form */}
            <div className="space-y-6 max-w-4xl mx-auto">
                {criteria.map((c, index) => (
                    <div key={c.id} className={`premium-card transition-all ${scores[c.id] ? 'border-l-4 border-l-green-500' : 'border-l-4 border-l-gray-300'}`}>
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="bg-gray-100 text-gray-600 text-xs font-bold px-2 py-1 rounded uppercase tracking-wider">
                                        Criteria {index + 1}
                                    </span>
                                    {c.weight && c.weight !== 1 && (
                                        <span className="bg-blue-50 text-blue-600 text-xs font-bold px-2 py-1 rounded">
                                            Bobot: {c.weight}x
                                        </span>
                                    )}
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 leading-snug">{c.name}</h3>
                                <p className="text-gray-400 text-sm mt-1">Max Score: {c.max_score}</p>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <input
                                        type="number"
                                        inputMode="numeric"
                                        disabled={isLocked}
                                        value={scores[c.id] || ''}
                                        onChange={(e) => handleScoreChange(c.id, e.target.value)}
                                        className={`w-28 text-center text-4xl font-bold rounded-2xl p-3 outline-none transition-all shadow-sm border-2 ${isLocked ? 'bg-gray-100 text-gray-400 border-gray-200' :
                                            scores[c.id] ? 'border-blue-500 text-blue-600 bg-white ring-4 ring-blue-50/50' : 'border-gray-200 text-gray-700 bg-gray-50 focus:bg-white focus:border-blue-500'
                                            }`}
                                        placeholder="0"
                                    />
                                    <span className="absolute top-2 right-2 text-[10px] font-bold text-gray-300">/ {c.max_score}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Signature - Optional for Autosave flow, but good for final confirm */}
                <div className="premium-card bg-white mt-8">
                    <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <FileSignature className="text-gray-600" /> Validator Signature
                    </h3>
                    <div className={`border-2 border-dashed rounded-xl relative h-48 w-full touch-none overflow-hidden transition-colors ${isLocked ? 'bg-gray-100 border-gray-200 opacity-75' : 'bg-gray-50 border-gray-300 hover:border-blue-300'}`}>
                        <canvas
                            ref={canvasRef}
                            width={600}
                            height={192}
                            className={`w-full h-full ${isLocked ? 'cursor-not-allowed' : 'cursor-crosshair'}`}
                            onMouseDown={startDrawing}
                            onMouseMove={draw}
                            onMouseUp={stopDrawing}
                            onMouseLeave={stopDrawing}
                            onTouchStart={startDrawing}
                            onTouchMove={draw}
                            onTouchEnd={stopDrawing}
                        />
                        {!hasSignature && !isLocked && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 pointer-events-none">
                                <FileSignature size={32} className="mb-2 opacity-20" />
                                <span className="text-sm">Sign here to validate</span>
                            </div>
                        )}
                        {isLocked && (
                            <div className="absolute inset-0 flex items-center justify-center text-red-400/50 font-bold text-2xl -rotate-12 select-none">
                                LOCKED
                            </div>
                        )}
                    </div>
                    {!isLocked && (
                        <div className="flex justify-between items-center mt-3">
                            <p className="text-xs text-gray-400">Signature is required for final submission.</p>
                            <button onClick={clearSignature} className="text-sm text-red-500 hover:text-red-600 font-medium px-3 py-1 hover:bg-red-50 rounded-lg transition-colors">
                                Clear Signature
                            </button>
                        </div>
                    )}
                </div>

                {!isLocked && (
                    <div className="pt-6 pb-12">
                        <button
                            onClick={() => router.push('/jury')}
                            className="btn-primary w-full py-5 text-xl shadow-xl hover:shadow-2xl hover:scale-[1.01] active:scale-[0.99] transition-all bg-gray-900 border border-gray-800"
                        >
                            <CheckCircle className="inline mr-2" /> Finish Assessment
                        </button>
                        <p className="text-center text-gray-400 text-sm mt-4">
                            All scores are automatically saved. You can return later.
                        </p>
                    </div>
                )}
            </div>
        </main>
    );
}
