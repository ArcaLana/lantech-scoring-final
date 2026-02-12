"use client";

import { useEffect, useState } from 'react';
import { AlertTriangle } from 'lucide-react';

export default function ConfigCheck({ children }: { children: React.ReactNode }) {
    const [configValid, setConfigValid] = useState(true);

    useEffect(() => {
        const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
        if (!url || !key) {
            setConfigValid(false);
        }
    }, []);

    if (!configValid) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6 text-center">
                <div className="bg-red-100 p-6 rounded-full text-red-600 mb-6 animate-pulse">
                    <AlertTriangle size={64} />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Configuration Error</h1>
                <p className="text-gray-600 max-w-md text-lg loading-relaxed">
                    Aplikasi mendeteksi masalah pada konfigurasi Environment Variables.
                    Harap pastikan <code>PROSES.ENV.NEXT_PUBLIC_SUPABASE_URL</code> dan <code>...ANON_KEY</code> telah terpasang dengan benar.
                </p>
                <div className="mt-8 p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                    <p className="font-mono text-sm text-gray-500">Error Code: MISSING_ENV_VARS</p>
                </div>
            </div>
        );
    }

    return <>{children}</>;
}
