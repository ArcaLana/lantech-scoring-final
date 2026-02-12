import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { role, key } = body;

        // Validasi dasar
        if (!role || !key) {
            return NextResponse.json({ error: 'Missing role or key' }, { status: 400 });
        }

        const response = NextResponse.json({ success: true, message: 'Session created' });

        // Simpan Cookie (HTTP Only untuk keamanan)
        // Set 'user_role' untuk middleware check
        response.cookies.set({
            name: 'user_role',
            value: role,
            httpOnly: false, // Allow client JS to read if needed, but mainly for middleware
            path: '/',
            maxAge: 60 * 60 * 24 * 7, // 1 minggu
        });

        // Set 'access_token' (bisa diisi key atau JWT jika ada)
        response.cookies.set({
            name: 'access_token',
            value: key,
            httpOnly: true,
            path: '/',
            maxAge: 60 * 60 * 24 * 7,
        });

        return response;

    } catch (error) {
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
