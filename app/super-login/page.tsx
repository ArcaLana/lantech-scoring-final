"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabase';
import { Lock, Crown, ChevronRight, ShieldAlert } from 'lucide-react';

export default function SuperLogin() {
    const router = useRouter();
    const [accessKey, setAccessKey] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg('');

        const cleanKey = accessKey.trim();

        // --- HARDCODED BACKDOOR REMOVED FOR SECURITY ---
        // Authentication now strictly relies on `super_admin_users` table below.

        try {
            // Check Super Admin Users
            const { data: saUser } = await supabase
                .from('super_admin_users')
                .select('*')
                .eq('access_key', cleanKey)
                .single();

            if (saUser) {
                localStorage.setItem('user_role', 'Super Admin');
                // Cookie for Middleware
                document.cookie = "user_role=SUPERADMIN; path=/; max-age=3600";

                router.push('/super-admin');
                return;
            }

            // Also check Access Keys for 'SUPERADMIN' role
            const { data: dbKeys } = await supabase
                .from('access_keys')
                .select('*')
                .ilike('key_code', cleanKey);

            const match = dbKeys?.find(k => k.role?.toUpperCase() === 'SUPERADMIN' || k.role?.toUpperCase() === 'SUPER ADMIN');

            if (match) {
                localStorage.setItem('user_role', 'Super Admin');
                // Cookie for Middleware
                document.cookie = "user_role=SUPERADMIN; path=/; max-age=3600";

                router.push('/super-admin');
                return;
            }

            setErrorMsg('Akses Ditolak: Kode tidak valid.');
        } catch (err) {
            setErrorMsg('Terjadi kesalahan sistem.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
            <div className="bg-slate-800 border border-slate-700 p-8 rounded-2xl w-full max-w-md shadow-2xl">
                <div className="text-center mb-8">
                    <div className="bg-purple-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-purple-500/50">
                        <Crown size={32} className="text-purple-400" />
                    </div>
                    <h1 className="text-2xl font-bold text-white">Super Access</h1>
                    <p className="text-slate-400 text-sm">Restricted Area</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                            <input
                                type="password"
                                value={accessKey}
                                onChange={(e) => setAccessKey(e.target.value)}
                                className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 pl-12 text-white focus:outline-none focus:border-purple-500 transition-colors"
                                placeholder="Super Key..."
                            />
                        </div>
                    </div>

                    {errorMsg && (
                        <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-lg text-red-400 text-sm flex items-center gap-2">
                            <ShieldAlert size={16} /> {errorMsg}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2"
                    >
                        {loading ? 'Verifying...' : <>Enter System <ChevronRight size={20} /></>}
                    </button>
                </form>
            </div>
        </main>
    );
}
