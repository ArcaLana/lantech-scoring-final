"use client";

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabase';
import {
    ShieldCheck,
    ChevronRight,
    Lock,
    GraduationCap,
} from 'lucide-react';

export default function Home() {
    const router = useRouter();
    const [accessKey, setAccessKey] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [shake, setShake] = useState(false);

    useEffect(() => {
        // Clear auth on load
        localStorage.removeItem('user_role');
        localStorage.removeItem('access_rekap');
    }, []);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg('');

        const cleanKey = accessKey.trim();

        // Login Logic:
        // We verify against the database.


        if (!cleanKey) {
            setErrorMsg('Harap masukkan kode akses.');
            setLoading(false);
            return;
        }

        try {
            // --- SIMPLIFIED QUERY (HARDCODE) ---
            // Using 'key' to match database schema used in super-admin page
            const { data, error } = await supabase
                .from('access_keys')
                .select('*')
                .eq('key', cleanKey)
                .single();

            if (error) {
                console.error("Login Query Error:", error);
                setErrorMsg('Kode akses tidak valid.');
                setShake(true);
                setTimeout(() => setShake(false), 500);
            } else if (data) {
                processLogin(data);
            } else {
                setErrorMsg('Kode akses tidak ditemukan.');
                setShake(true);
                setTimeout(() => setShake(false), 500);
            }

        } catch (err) {
            console.error("[CRITICAL LOGIN ERROR]", err);
            setErrorMsg('Kesalahan Sistem Fatal.');
        } finally {
            setLoading(false);
        }
    };

    const processLogin = async (user: any) => {
        const dbRole = (user.role || '').toUpperCase();
        console.log(`[LOGIN SUCCESS] Found: ${dbRole}`);

        // SESSION SET
        localStorage.setItem('user_role', user.role);

        // ATTEMPT SERVER SYNC (Non-blocking)
        try {
            fetch('/login', {
                method: 'POST',
                body: JSON.stringify({ role: user.role, key: accessKey.trim() })
            });
        } catch (e) { console.error(e); }

        // REDIRECT LOGIC
        let targetPath = '';

        if (dbRole.includes('JURI') || dbRole.includes('PANEL') || dbRole.includes('JUDGE')) {
            targetPath = '/jury-room';
        }
        else if (dbRole.includes('KOORDINATOR') || dbRole.includes('AKADEMIK')) {
            targetPath = '/koordinator-view';
            localStorage.setItem('access_rekap', 'true');
        }
        else if (dbRole === 'SUPER ADMIN' || dbRole === 'SUPERADMIN') {
            targetPath = '/super-admin';
        }
        else if (dbRole.includes('ADMIN')) {
            targetPath = '/admin-dashboard';
        }
        else {
            // Default fallback if role exists but unknown
            targetPath = '/';
            setErrorMsg(`Role '${user.role}' tidak memiliki halaman spesifik.`);
            setShake(true);
            setTimeout(() => setShake(false), 500);
            return;
        }

        // FORCE REDIRECT
        window.location.href = targetPath;
    };

    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">

            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-blue-600/20 rounded-full blur-[100px]"></div>
                <div className="absolute top-[30%] right-[10%] w-[30%] h-[30%] bg-purple-600/20 rounded-full blur-[100px]"></div>
            </div>

            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl w-full max-w-md flex flex-col overflow-hidden relative z-10 transition-all duration-500">

                {/* Header */}
                {/* Header */}
                <div className="p-8 pb-0 text-center">
                    <div className="flex justify-center mb-6">
                        <div className="bg-white/10 p-6 rounded-2xl mb-6 inline-block shadow-lg border border-white/20 relative group overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <GraduationCap size={64} className="text-blue-300 drop-shadow-[0_0_15px_rgba(147,197,253,0.5)] transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3" />
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2 leading-tight">
                        Sistem Penilaian
                        <span className="block text-blue-400 text-xl mt-1">Ujian Kompetensi Keahlian</span>
                    </h1>
                    <p className="text-blue-200/80 text-sm">Sistem Penilaian Digital Lantech</p>
                </div>

                {/* Login Form */}
                <div className="p-8">
                    <form onSubmit={handleLogin} className={`space-y-6 ${shake ? 'animate-shake' : ''}`}>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-blue-100 ml-1">Kode Akses</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-blue-500 text-slate-400">
                                    <Lock size={20} />
                                </div>
                                <input
                                    type="password"
                                    value={accessKey}
                                    onChange={(e) => setAccessKey(e.target.value)}
                                    className="block w-full pl-12 pr-4 py-4 bg-white/90 border-0 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                                    placeholder="Masukkan Kode Akses..."
                                    required
                                    autoFocus
                                />
                            </div>
                        </div>

                        {errorMsg && (
                            <div className="p-4 bg-red-500/20 border border-red-500/30 text-red-200 rounded-xl text-sm flex items-center gap-2 animate-pulse">
                                <div className="bg-red-500/20 p-1 rounded-full">
                                    <ShieldCheck size={14} />
                                </div>
                                {errorMsg}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full font-bold py-4 px-6 rounded-xl transform transition-all duration-200 flex items-center justify-center gap-2 ${loading ? 'bg-slate-500 cursor-not-allowed' : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5'}`}
                        >
                            {loading ? (
                                <>Processing...</>
                            ) : (
                                <>
                                    Masuk Sekarang <ChevronRight size={20} />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-white/10 text-center">
                        <p className="text-xs text-blue-200/40">
                            © 2026 Lantech Digital
                        </p>
                    </div>
                </div>
            </div>
            <style jsx global>{`
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-5px); }
                    75% { transform: translateX(5px); }
                }
                .animate-shake {
                    animation: shake 0.4s cubic-bezier(.36,.07,.19,.97) both;
                }
            `}</style>
        </main>
    );
}
