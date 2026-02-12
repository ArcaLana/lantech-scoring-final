"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabase';
import { LayoutDashboard, UserPlus, LogOut, CheckCircle2, AlertCircle, Loader2, Upload, Search, Trash2 } from 'lucide-react';
import * as XLSX from 'xlsx';

export default function AdminDashboardPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

    // Form State
    const [studentName, setStudentName] = useState('');
    const [studentClass, setStudentClass] = useState('');
    const [studentNIM, setStudentNIM] = useState('');
    const [selectedEventId, setSelectedEventId] = useState('');

    // Data State
    const [events, setEvents] = useState<any[]>([]);
    const [students, setStudents] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState('');

    // Stats
    const stats = {
        total: students.length,
        byEvent: students.reduce((acc: any, curr: any) => {
            const eventName = curr.events?.event_name || 'Unassigned';
            acc[eventName] = (acc[eventName] || 0) + 1;
            return acc;
        }, {})
    };

    useEffect(() => {
        // Auth Check
        const role = localStorage.getItem('user_role');
        // RELAXED CHECK: Allow Admin Biasa, ADMIN, SUPERADMIN
        if (!role || (!role.includes('Admin') && !role.includes('ADMIN') && role !== 'SUPERADMIN')) {
            router.push('/');
        } else {
            fetchData();
        }
    }, [router]);

    const fetchData = async () => {
        setLoading(true);
        try {
            // Fetch Events for dropdown
            const { data: eventsData } = await supabase.from('events').select('*');
            if (eventsData) setEvents(eventsData);

            // Fetch Students for list (assuming relation to events exists? If not, just fetch students)
            // Ideally: .select('*, events(event_name)') if foreign key exists. 
            // If no FK, just select *.
            const { data: studentsData, error } = await supabase
                .from('students')
                .select('*')
                .order('created_at', { ascending: false });

            if (studentsData) setStudents(studentsData);
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    };

    const handleAddStudent = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!studentName.trim() || !studentClass.trim()) return;

        setLoading(true);
        try {
            // Attempt to insert with event_id. 
            // Note: If 'class' column is actually 'kelas' in DB, we should handle that. 
            // But based on 'app/jury-room/page.tsx' using 'student.class', we assume 'class'.
            // However, to be "Perfect", we'll check if the previous insert worked. 
            // We'll stick to 'class' as primary.

            const payload: any = {
                name: studentName.trim(),
                class: studentClass.trim(),
                nis: studentNIM.trim(), // Confirmed: Using 'nis' and 'class'
            };

            if (selectedEventId) {
                payload['event_id'] = selectedEventId;
            }

            const { error } = await supabase
                .from('students')
                .insert([payload]);

            if (error) throw error;

            setNotification({ message: 'Data Peserta Berhasil Disimpan', type: 'success' });
            setStudentName('');
            setStudentClass('');
            setStudentNIM('');
            fetchData(); // Refresh list

        } catch (err: any) {
            setNotification({ message: err.message || 'Gagal menyimpan data', type: 'error' });
        } finally {
            setLoading(false);
            setTimeout(() => setNotification(null), 3000);
        }
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = async (evt) => {
            const bstr = evt.target?.result;
            const wb = XLSX.read(bstr, { type: 'binary' });
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            const data: any[] = XLSX.utils.sheet_to_json(ws);

            // Flexible Mapping
            const formatted = data.map(row => {
                // Helper to find key case-insensitive
                const findVal = (keys: string[]) => {
                    for (let k of keys) {
                        const found = Object.keys(row).find(rk => rk.toLowerCase() === k.toLowerCase());
                        if (found) return row[found];
                    }
                    return '';
                };

                return {
                    name: findVal(['name', 'nama', 'nama siswa', 'student']),
                    class: findVal(['class', 'kelas', 'prodi', 'rombian']),
                    nis: findVal(['nis', 'nim', 'id', 'nomor induk']),
                    // Optional: event_id linkage if CSV has 'Lomba' code? 
                    // For now keeping it simple as per template.
                };
            }).filter(x => x.name && x.class); // Ensure mandatory fields

            if (formatted.length > 0) {
                setLoading(true);
                const { error } = await supabase.from('students').insert(formatted);
                if (!error) {
                    setNotification({ message: `Berhasil import ${formatted.length} siswa!`, type: 'success' });
                    fetchData();
                } else {
                    // Provide more detailed error
                    setNotification({ message: 'Gagal Import: ' + (error.message || 'Check kolom CSV'), type: 'error' });
                }
                setLoading(false);
            } else {
                setNotification({ message: 'Format CSV tidak dikenali atau kosong.', type: 'error' });
            }
        };
        reader.readAsBinaryString(file);
    };

    const handleDeleteStudent = async (id: string | number) => {
        if (!confirm('Hapus siswa ini?')) return;
        setLoading(true);
        await supabase.from('students').delete().eq('id', id);
        fetchData();
        setLoading(false);
    };

    const handleLogout = () => {
        localStorage.clear();
        router.push('/');
    };

    return (
        <main className="min-h-screen bg-gray-50">
            {/* Navbar */}
            <nav className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center shadow-sm">
                <div className="flex items-center gap-3">
                    <div className="bg-blue-600 p-2 rounded-lg text-white">
                        <LayoutDashboard size={20} />
                    </div>
                    <span className="font-bold text-gray-800 text-lg">Admin<span className="text-blue-600">Dashboard</span></span>
                </div>
                <button onClick={handleLogout} className="flex items-center gap-2 text-gray-500 hover:text-red-600 transition-colors font-medium text-sm">
                    <LogOut size={18} /> Sign Out
                </button>
            </nav>

            <div className="max-w-2xl mx-auto py-12 px-6">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* LEFT: FORM */}
                    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden h-fit">
                        <div className="bg-blue-600 p-6 text-white text-center">
                            <UserPlus size={48} className="mx-auto mb-4 opacity-90" />
                            <h1 className="text-2xl font-bold">Input Data Peserta</h1>
                            <p className="opacity-90 text-blue-100 mt-1">Masukkan data siswa/mahasiswa baru</p>
                        </div>
                        <div className="p-8">
                            {notification && (
                                <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 border ${notification.type === 'success' ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-700'}`}>
                                    {notification.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
                                    <span className="font-medium">{notification.message}</span>
                                </div>
                            )}

                            <form onSubmit={handleAddStudent} className="space-y-5">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Nama Lengkap</label>
                                    <input type="text" value={studentName} onChange={(e) => setStudentName(e.target.value)} placeholder="Contoh: Ahmad Dahlan" className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-blue-500 transition-all" required />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">NIM / ID</label>
                                        <input type="text" value={studentNIM} onChange={(e) => setStudentNIM(e.target.value)} placeholder="12345678" className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-blue-500 transition-all" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Kelas / Prodi</label>
                                        <input type="text" value={studentClass} onChange={(e) => setStudentClass(e.target.value)} placeholder="XII RPL 1" className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-blue-500 transition-all" required />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Pilih Lomba (Opsional)</label>
                                    <select value={selectedEventId} onChange={(e) => setSelectedEventId(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-blue-500 transition-all">
                                        <option value="">-- Tidak Ada --</option>
                                        {events.map(ev => <option key={ev.id} value={ev.id}>{ev.event_name}</option>)}
                                    </select>
                                </div>
                                <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2">
                                    {loading ? <Loader2 className="animate-spin" /> : 'Simpan Data Peserta'}
                                </button>
                            </form>

                            <div className="mt-8 pt-6 border-t border-gray-100">
                                <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                                    <Upload size={16} /> Import via Excel/CSV
                                </label>
                                <div className="flex gap-2">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            // Create dummy CSV
                                            const csvContent = "data:text/csv;charset=utf-8," + "Name,Class,NIS\nJohn Doe,XII RPL 1,12345\nJane Smith,XII TKJ 2,67890";
                                            const encodedUri = encodeURI(csvContent);
                                            const link = document.createElement("a");
                                            link.setAttribute("href", encodedUri);
                                            link.setAttribute("download", "template_siswa.csv");
                                            document.body.appendChild(link);
                                            link.click();
                                            document.body.removeChild(link);
                                        }}
                                        className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 py-2 rounded-lg font-medium transition-colors"
                                    >
                                        Download Template
                                    </button>
                                </div>
                                <input
                                    type="file"
                                    accept=".csv, .xlsx, .xls"
                                    onChange={handleFileUpload}
                                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 mt-2"
                                />
                                <p className="text-xs text-gray-400 mt-2">Format: Kolom Name, Class, NIS</p>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: LIST */}
                    <div className="space-y-6">
                        {/* Stats Cards */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                <p className="text-gray-500 text-xs font-bold uppercase">Total Peserta</p>
                                <p className="text-3xl font-bold text-gray-800">{students.length}</p>
                            </div>
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                <p className="text-gray-500 text-xs font-bold uppercase">Lomba Aktif</p>
                                <p className="text-3xl font-bold text-blue-600">{events.length}</p>
                            </div>
                        </div>

                        {/* Filter */}
                        <div className="relative">
                            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Cari nama atau kelas..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-50 outline-none"
                            />
                        </div>

                        {/* Table */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden max-h-[600px] overflow-y-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-gray-50 text-gray-600 font-bold uppercase text-xs sticky top-0">
                                    <tr>
                                        <th className="px-6 py-3">Nama</th>
                                        <th className="px-6 py-3">Kelas</th>
                                        <th className="px-6 py-3 text-right">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {students.filter(s =>
                                        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                        (s.class && s.class.toLowerCase().includes(searchTerm.toLowerCase())) ||
                                        (s.nis && s.nis.toLowerCase().includes(searchTerm.toLowerCase()))
                                    ).map((student) => (
                                        <tr key={student.id} className="hover:bg-blue-50/50 transition-colors">
                                            <td className="px-6 py-4 font-medium text-gray-900">
                                                {student.name}
                                                <div className="text-xs text-gray-400">{student.nis}</div>
                                            </td>
                                            <td className="px-6 py-4 text-gray-500">{student.class}</td>
                                            <td className="px-6 py-4 text-right">
                                                <button onClick={() => handleDeleteStudent(student.id)} className="text-gray-300 hover:text-red-500 transition-colors">
                                                    <Trash2 size={16} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {students.length === 0 && (
                                        <tr>
                                            <td colSpan={3} className="px-6 py-8 text-center text-gray-400 italic">Belum ada data siswa.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>
        </main>
    );
}
