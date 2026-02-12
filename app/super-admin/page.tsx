"use client";

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabase';
import {
    ShieldCheck,
    Plus,
    Trash2,
    Users,
    Trophy,
    ListChecks,
    Loader2,
    CheckCircle2,
    AlertCircle,
    UserCircle,
    Key,
    User,
    GraduationCap
} from 'lucide-react';

// --- Types ---
type Event = {
    id: number | string;
    event_name: string;
    created_at?: string;
};

type Criteria = {
    id: number | string;
    event_id: number | string;
    criteria_name: string;
    weight?: number;
    type?: string;
};

type AccessKey = {
    id: number | string;
    key: string;
    name: string;
    role: string; // Changed to string to support "Koordinator Akademik" etc.
    is_active: boolean;
    created_at?: string;
};

export default function SuperAdminPage() {
    const router = useRouter();

    // --- State: Auth ---
    const [accessCode, setAccessCode] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [authError, setAuthError] = useState('');

    // --- State: Data ---
    const [events, setEvents] = useState<Event[]>([]);
    const [selectedEventId, setSelectedEventId] = useState<string | number>('');
    const [criteriaList, setCriteriaList] = useState<Criteria[]>([]);
    const [accessKeys, setAccessKeys] = useState<AccessKey[]>([]);

    // --- State: Forms ---
    const [newEventName, setNewEventName] = useState('');

    // Criteria Form
    const [newCriteriaName, setNewCriteriaName] = useState('');
    const [newCriteriaWeight, setNewCriteriaWeight] = useState('');

    // Access Key Form
    const [newKeyName, setNewKeyName] = useState('');
    const [newKeyCode, setNewKeyCode] = useState('');
    const [newKeyRole, setNewKeyRole] = useState<string>('Juri');

    // --- State: UI ---
    const [loading, setLoading] = useState(false);
    const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' | 'warning' } | null>(null);

    // --- Constants ---
    const SECRET_CODE = process.env.NEXT_PUBLIC_SUPER_ADMIN_CODE || 'LantechSuperAdmin2026';

    // --- Effects ---
    useEffect(() => {
        const cachedAuth = sessionStorage.getItem('super_admin_auth');
        const role = localStorage.getItem('user_role');

        if (cachedAuth === 'true' || role === 'Super Admin' || role === 'SUPERADMIN') {
            setIsAuthenticated(true);
            fetchInitialData();
        }
    }, []);

    useEffect(() => {
        if (isAuthenticated) {
            fetchInitialData();
        }
    }, [isAuthenticated]);

    useEffect(() => {
        if (selectedEventId) {
            fetchCriteria(selectedEventId);
        } else {
            setCriteriaList([]);
        }
    }, [selectedEventId]);

    // --- Actions: Auth ---
    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (accessCode.trim() === SECRET_CODE) {
            setIsAuthenticated(true);
            sessionStorage.setItem('super_admin_auth', 'true');
            localStorage.setItem('user_role', 'Super Admin'); // Sync with main system
            setAuthError('');
        } else {
            setAuthError('Kode Super Admin Salah');
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        sessionStorage.removeItem('super_admin_auth');
        setAccessCode('');
    };

    // --- Actions: Data Fetching ---
    const fetchInitialData = async () => {
        setLoading(true);
        try {
            // 1. Fetch Events
            const { data: eventsData, error: eventsError } = await supabase
                .from('events')
                .select('*')
                .order('created_at', { ascending: false });

            if (eventsError) throw eventsError;
            setEvents(eventsData || []);

            // 2. Fetch Access Keys
            const { data: keysData, error: keysError } = await supabase
                .from('access_keys')
                .select('*')
                .order('created_at', { ascending: false });

            if (keysError) throw keysError;
            setAccessKeys(keysData || []);

        } catch (err: any) {
            showNotification(err.message || 'Gagal memuat data utama.', 'error');
        } finally {
            setLoading(false);
        }
    };

    const fetchCriteria = async (eventId: string | number) => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('event_criteria')
                .select('*')
                .eq('event_id', eventId);

            if (error) throw error;
            setCriteriaList(data || []);
        } catch (err: any) {
            showNotification(err.message || 'Gagal memuat kriteria.', 'error');
        } finally {
            setLoading(false);
        }
    };

    // --- Actions: Events CRUD ---
    const handleAddEvent = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newEventName.trim()) return;

        setLoading(true);
        try {
            const { error } = await supabase
                .from('events')
                .insert([{ event_name: newEventName.trim() }]);

            if (error) throw new Error(`Tabel Events Error: ${error.message}`);

            setNewEventName('');
            showNotification('Lomba berhasil ditambahkan!', 'success');
            fetchInitialData();
            router.refresh();
        } catch (err: any) {
            showNotification(err.message, 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteEvent = async (id: string | number) => {
        if (!confirm('Hapus lomba ini? Data kriteria juga akan terhapus.')) return;

        setLoading(true);
        try {
            const { error } = await supabase.from('events').delete().eq('id', id);
            if (error) throw new Error(`Gagal menghapus event: ${error.message}`);

            showNotification('Lomba berhasil dihapus.', 'success');
            if (selectedEventId === id) setSelectedEventId('');
            fetchInitialData();
            router.refresh();
        } catch (err: any) {
            showNotification(err.message, 'error');
        } finally {
            setLoading(false);
        }
    };

    // --- Actions: Criteria CRUD ---
    const handleAddCriteria = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedEventId || !newCriteriaName.trim()) return;

        setLoading(true);
        try {
            const { error } = await supabase
                .from('event_criteria')
                .insert([{
                    event_id: selectedEventId,
                    criteria_name: newCriteriaName.trim(),
                    weight: newCriteriaWeight ? parseInt(newCriteriaWeight) : 0
                }]);

            if (error) throw new Error(`Tabel Criteria Error: ${error.message}`);

            setNewCriteriaName('');
            setNewCriteriaWeight('');
            showNotification('Kriteria berhasil ditambahkan!', 'success');
            fetchCriteria(selectedEventId);
            router.refresh();
        } catch (err: any) {
            showNotification(err.message, 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteCriteria = async (id: string | number) => {
        if (!confirm('Hapus kriteria ini?')) return;

        setLoading(true);
        try {
            const { error } = await supabase.from('event_criteria').delete().eq('id', id);
            if (error) throw new Error(`Gagal menghapus kriteria: ${error.message}`);

            showNotification('Kriteria berhasil dihapus.', 'success');
            fetchCriteria(selectedEventId);
            router.refresh();
        } catch (err: any) {
            showNotification(err.message, 'error');
        } finally {
            setLoading(false);
        }
    };

    // --- Actions: Access Keys CRUD ---
    const handleAddKey = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newKeyName.trim() || !newKeyCode.trim()) return;

        setLoading(true);
        try {
            console.log("Attempting Insert Key:", { name: newKeyName, key: newKeyCode, role: newKeyRole });

            const { data, error } = await supabase
                .from('access_keys')
                .insert([{
                    name: newKeyName.trim(),
                    key: newKeyCode.trim(),
                    role: newKeyRole,
                    is_active: true
                }])
                .select(); // Add select() to return the inserted data for verification

            if (error) {
                console.error("Supabase Insert Error:", error);
                throw new Error(error.message + (error.details ? ` (${error.details})` : ''));
            }

            console.log("Insert Success:", data);

            setNewKeyName('');
            setNewKeyCode('');
            showNotification('Data Berhasil Disinkronkan ke Server', 'success');
            fetchInitialData();
            router.refresh();
        } catch (err: any) {
            console.error("Catch Block Error:", err);
            showNotification(`Gagal Tambah User: ${err.message}`, 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteKey = async (id: string | number) => {
        if (!confirm('Hapus akses user ini?')) return;

        setLoading(true);
        try {
            const { error } = await supabase.from('access_keys').delete().eq('id', id);
            if (error) throw new Error(`Gagal menghapus key: ${error.message}`);

            showNotification('User berhasil dihapus.', 'success');
            fetchInitialData();
            router.refresh();
        } catch (err: any) {
            showNotification(err.message, 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleResetDatabase = async () => {
        if (!confirm('Hati-hati, aksi ini tidak bisa dibatalkan! Apakah Anda yakin ingin MENGHAPUS SELURUH DATA DATABASE?')) return;
        if (!confirm('KONFIRMASI TERAKHIR: Data Siswa, Nilai, Lomba, Kriteria, dan User (Kecuali Super Admin) akan hilang permanen. Lanjutkan?')) return;

        const magicWord = prompt('Ketik "RESET" untuk konfirmasi penghapusan:');
        if (magicWord !== 'RESET') {
            alert('Reset dibatalkan. Kata kunci salah.');
            return;
        }

        setLoading(true);
        try {
            // Delete order matters due to FK constraints
            // 1. Scores (depends on students, criteria)
            await supabase.from('scores').delete().neq('id', 0);

            // 2. Students (depends on events?? if added later)
            await supabase.from('students').delete().neq('id', 0);

            // 3. Event Criteria (depends on events)
            await supabase.from('event_criteria').delete().neq('id', 0);

            // 4. Events
            await supabase.from('events').delete().neq('id', 0);

            // 5. Access Keys (Except Super Admin to prevent lockout)
            // Assuming current user is Super Admin/has specific key. 
            // We'll keep 'Super Admin' role users or just the current session one? 
            // Safe bet: Delete all EXCEPT role='Super Admin'
            const { error } = await supabase.from('access_keys').delete().neq('role', 'Super Admin');

            if (error) throw error;

            showNotification('DATABASE BERHASIL DI-RESET TOTAL.', 'success');
            fetchInitialData();

        } catch (err: any) {
            showNotification(`Gagal Reset: ${err.message}`, 'error');
        } finally {
            setLoading(false);
        }
    };

    // --- Helpers ---
    const showNotification = (msg: string, type: 'success' | 'error' | 'warning') => {
        setNotification({ message: msg, type });
        setTimeout(() => setNotification(null), 4000);
    };

    // --- Render: Auth Gate ---
    if (!isAuthenticated) {
        return (
            <main className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
                <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-xl border border-gray-100 text-center">
                    <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
                        <ShieldCheck className="w-8 h-8 text-red-600" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Restricted Access</h1>
                    <p className="text-gray-500 mb-6">Enter Super Admin Credentials</p>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <input
                            type="password"
                            value={accessCode}
                            onChange={(e) => {
                                setAccessCode(e.target.value);
                                setAuthError('');
                            }}
                            placeholder="Access Code"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all text-center text-lg tracking-widest"
                        />
                        {authError && <p className="text-red-500 text-sm font-medium animate-pulse">{authError}</p>}
                        <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl transition-all shadow-lg active:scale-95">
                            Unlock Dashboard
                        </button>
                    </form>
                </div>
            </main>
        );
    }

    // --- Render: Dashboard ---
    return (
        <main className="min-h-screen bg-gray-50 pb-20">
            {/* Navbar */}
            <header className="bg-white shadow-sm border-b sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="bg-blue-600 p-2 rounded-lg text-white shadow-lg shadow-blue-500/30">
                            <GraduationCap size={24} />
                        </div>
                        <span className="font-bold text-xl text-gray-900">Sistem Penilaian</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={handleResetDatabase}
                            className="text-red-600 hover:text-red-700 font-bold text-sm bg-red-50 hover:bg-red-100 px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                        >
                            <Trash2 size={16} /> RESET DATABASE
                        </button>
                        <button onClick={handleLogout} className="text-gray-500 hover:text-red-600 font-medium text-sm transition-colors">
                            Sign Out
                        </button>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Notifications */}
                {notification && (
                    <div className={`fixed top-20 right-4 z-50 px-6 py-4 rounded-xl shadow-lg flex items-center gap-3 animate-in slide-in-from-right-5 
                        ${notification.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' :
                            notification.type === 'warning' ? 'bg-yellow-50 text-yellow-700 border border-yellow-200' :
                                'bg-red-50 text-red-700 border border-red-200'}`}>
                        {notification.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
                        <span className="font-medium">{notification.message}</span>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* LEFT: Event Management (BLUE THEME) */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-4">
                                <Trophy className="w-5 h-5 text-blue-500" /> Kelola Lomba
                            </h2>
                            <form onSubmit={handleAddEvent} className="flex gap-2">
                                <input
                                    type="text"
                                    value={newEventName}
                                    onChange={(e) => setNewEventName(e.target.value)}
                                    placeholder="Nama Lomba..."
                                    className="flex-1 px-4 py-2 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm transition-all"
                                />
                                <button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Plus className="w-5 h-5" />}
                                </button>
                            </form>
                        </div>

                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Daftar Lomba</h3>
                            </div>
                            <div className="max-h-[500px] overflow-y-auto">
                                {events.length === 0 ? <div className="p-8 text-center text-gray-400 text-sm">Belum ada lomba.</div> : (
                                    <ul className="divide-y divide-gray-100">
                                        {events.map((event) => (
                                            <li key={event.id}
                                                className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors flex items-center justify-between group 
                                                ${selectedEventId === event.id ? 'bg-blue-50/50 border-l-4 border-blue-500' : ''}`}
                                                onClick={() => setSelectedEventId(event.id)}
                                            >
                                                <span className={`font-medium text-sm ${selectedEventId === event.id ? 'text-blue-700' : 'text-gray-700'}`}>
                                                    {event.event_name}
                                                </span>
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); handleDeleteEvent(event.id); }}
                                                    className="text-gray-300 hover:text-red-500 p-2 transition-colors"
                                                    title="Hapus Lomba"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* MIDDLE: Criteria (PURPLE THEME) */}
                    <div className="lg:col-span-5 space-y-6">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 min-h-[600px] flex flex-col">
                            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-6">
                                <ListChecks className="w-5 h-5 text-purple-500" /> Kriteria Penilaian
                            </h2>

                            {!selectedEventId ? (
                                <div className="flex-1 flex flex-col items-center justify-center text-center text-gray-400 p-8 border-2 border-dashed border-gray-100 rounded-xl">
                                    <Trophy className="w-12 h-12 mb-4 text-gray-200" />
                                    <p>Pilih lomba di menu sebelah kiri.</p>
                                </div>
                            ) : (
                                <>
                                    <div className="mb-6 p-4 bg-purple-50 rounded-xl border border-purple-100">
                                        <h3 className="text-xs font-bold text-purple-800 mb-3 uppercase tracking-wide">Tambah Kriteria</h3>
                                        <form onSubmit={handleAddCriteria} className="space-y-3">
                                            <input
                                                type="text"
                                                value={newCriteriaName}
                                                onChange={(e) => setNewCriteriaName(e.target.value)}
                                                placeholder="Nama Kriteria..."
                                                className="w-full px-4 py-2 rounded-lg border border-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 outline-none text-sm transition-all"
                                            />
                                            <div className="flex gap-2 items-end">
                                                <div className="flex-1">
                                                    <label className="text-xs font-semibold text-purple-700 mb-1 block">Bobot Nilai</label>
                                                    <input
                                                        type="number"
                                                        value={newCriteriaWeight}
                                                        onChange={(e) => setNewCriteriaWeight(e.target.value)}
                                                        placeholder="0-100"
                                                        className="w-full px-4 py-2 rounded-lg border border-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 outline-none text-sm transition-all"
                                                    />
                                                </div>
                                                <button type="submit" disabled={loading} className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-6 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors h-[42px]">
                                                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Plus size={16} /> Tambah</>}
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Daftar Kriteria</h3>
                                        {criteriaList.length === 0 ? <p className="text-gray-400 text-sm italic">Belum ada kriteria.</p> : (
                                            <ul className="space-y-2">
                                                {criteriaList.map((criteria) => (
                                                    <li key={criteria.id} className="bg-white border border-gray-100 p-3 rounded-lg flex items-center justify-between shadow-sm group">
                                                        <div>
                                                            <p className="font-medium text-gray-800 text-sm">{criteria.criteria_name}</p>
                                                            {criteria.weight && <span className="text-xs text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full font-medium">Bobot: {criteria.weight}</span>}
                                                        </div>
                                                        <button
                                                            onClick={() => handleDeleteCriteria(criteria.id)}
                                                            className="text-gray-300 hover:text-red-500 p-1 opacity-0 group-hover:opacity-100 transition-all"
                                                            title="Hapus Kriteria"
                                                        >
                                                            <Trash2 size={14} />
                                                        </button>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    {/* RIGHT: Access Control (GREEN THEME) */}
                    <div className="lg:col-span-3 space-y-6">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full max-h-[800px]">
                            <div className="p-6 border-b border-gray-100">
                                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                    <Users className="w-5 h-5 text-green-500" /> Akses User
                                </h2>
                                <p className="text-xs text-gray-500 mt-1">Kelola Admin, Juri, & Kaprodi</p>
                            </div>

                            {/* Add Key Form */}
                            <div className="p-4 bg-green-50 border-b border-green-100">
                                <form onSubmit={handleAddKey} className="space-y-3">
                                    <div className="relative">
                                        <User className="absolute left-3 top-2.5 w-4 h-4 text-green-400" />
                                        <input
                                            type="text"
                                            value={newKeyName}
                                            onChange={(e) => setNewKeyName(e.target.value)}
                                            placeholder="Nama Lengkap"
                                            className="w-full pl-9 pr-3 py-2 rounded-lg border border-green-200 focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none text-xs transition-all"
                                        />
                                    </div>
                                    <div className="relative">
                                        <Key className="absolute left-3 top-2.5 w-4 h-4 text-green-400" />
                                        <input
                                            type="text"
                                            value={newKeyCode}
                                            onChange={(e) => setNewKeyCode(e.target.value)}
                                            placeholder="Kode Unik (e.g. juri123)"
                                            className="w-full pl-9 pr-3 py-2 rounded-lg border border-green-200 focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none text-xs transition-all"
                                        />
                                    </div>
                                    <select
                                        value={newKeyRole}
                                        onChange={(e) => setNewKeyRole(e.target.value)}
                                        className="w-full px-3 py-2 rounded-lg border border-green-200 focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none text-xs bg-white transition-all cursor-pointer"
                                    >
                                        <option value="Juri">Juri</option>
                                        <option value="Koordinator Akademik">Koordinator Akademik</option>
                                        <option value="Admin Biasa">Admin Biasa</option>
                                        <option value="Super Admin">Super Admin</option>
                                    </select>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                                    >
                                        {loading ? <Loader2 className="w-3 h-3 animate-spin" /> : <span>+ Tambah User</span>}
                                    </button>
                                </form>
                            </div>

                            {/* Key List */}
                            <div className="flex-1 overflow-y-auto p-4">
                                <ul className="space-y-3">
                                    {accessKeys.map((key) => (
                                        <li key={key.id} className="bg-gray-50 p-3 rounded-xl border border-gray-100 flex flex-col gap-1 relative group hover:shadow-md transition-shadow">
                                            <div className="flex justify-between items-start">
                                                <span className="font-mono text-[10px] font-bold text-gray-600 bg-white px-2 py-0.5 rounded border border-gray-200">
                                                    {key.key}
                                                </span>
                                                <span className={`text-[9px] uppercase font-bold px-1.5 py-0.5 rounded 
                                                    ${key.role === 'Juri' ? 'bg-blue-100 text-blue-700' :
                                                        key.role === 'Koordinator Akademik' ? 'bg-green-100 text-green-700' :
                                                            key.role === 'Admin Biasa' ? 'bg-orange-100 text-orange-700' :
                                                                'bg-red-100 text-red-700'}`}>
                                                    {key.role}
                                                </span>
                                            </div>
                                            <p className="text-xs text-gray-800 truncate font-semibold">{key.name}</p>

                                            <button
                                                onClick={() => handleDeleteKey(key.id)}
                                                className="absolute bottom-2 right-2 text-gray-300 hover:text-red-500 transition-colors bg-white rounded-full p-1 shadow-sm border border-gray-100"
                                                title="Hapus User"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}
