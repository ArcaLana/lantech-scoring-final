import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const userRoleCookie = request.cookies.get('user_role')?.value;
    const path = request.nextUrl.pathname;

    // --- 1. Master Key Bypass (SUPERADMIN / ADMIN) ---
    // Jika user punya role SUPERADMIN atau ADMIN, izinkan ke SEMUA halaman
    if (userRoleCookie) {
        const role = userRoleCookie.toUpperCase();
        if (role === 'SUPERADMIN' || role === 'SUPER ADMIN' || role.includes('ADMIN')) {
            return NextResponse.next();
        }
    }

    // --- 2. Role Enforcement ---

    // Protection: /jury-room
    // Allowed: JURI, PANEL, JUDGE
    if (path.startsWith('/jury-room')) {
        if (!userRoleCookie) {
            return NextResponse.redirect(new URL('/', request.url));
        }
        const role = userRoleCookie.toUpperCase();
        const isJuri = role.includes('JURI') || role.includes('PANEL') || role.includes('JUDGE');

        if (!isJuri) {
            // Redirect ke halaman yang sesuai jika bukan juri (misal dia koor nyasar ke juri)
            if (role.includes('KOOR')) return NextResponse.redirect(new URL('/koordinator-view', request.url));
            return NextResponse.redirect(new URL('/', request.url));
        }
    }

    // Protection: /koordinator-view
    // Allowed: KOORDINATOR, KOORDINATOR AKADEMIK
    if (path.startsWith('/koordinator-view')) {
        if (!userRoleCookie) {
            return NextResponse.redirect(new URL('/', request.url));
        }
        const role = userRoleCookie.toUpperCase();
        // Cek "KOORDINATOR" men-cover "KOORDINATOR AKADEMIK" juga
        const isKoor = role.includes('KOORDINATOR');

        if (!isKoor) {
            if (role.includes('JURI') || role.includes('PANEL')) return NextResponse.redirect(new URL('/jury-room', request.url));
            return NextResponse.redirect(new URL('/', request.url));
        }
    }

    // Protection: /admin-dashboard (Admin Biasa)
    // Allowed: ADMIN (Checked in Master Key logic normally, but added here for safety)
    if (path.startsWith('/admin-dashboard')) {
        if (!userRoleCookie) {
            return NextResponse.redirect(new URL('/', request.url));
        }
        // Master Key logic already handles ADMIN, but explicit check:
        // If we are here, it means we are NOT Admin/SuperAdmin (because of step 1), 
        // so we should probably block.
        // Wait, master key logic above returns next(). So if we are here, we are NOT Admin.
        return NextResponse.redirect(new URL('/', request.url));
    }

    // Protection: /super-admin
    if (path.startsWith('/super-admin')) {
        // Only Super Admin or Admin (via Master Key) can enter.
        // If we are here, we are NOT Admin/SuperAdmin.
        return NextResponse.redirect(new URL('/', request.url));
    }


    const response = NextResponse.next();

    // --- 3. Security Headers ---
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

    return response;
}

export const config = {
    matcher: ['/jury-room/:path*', '/koordinator-view/:path*', '/admin-dashboard/:path*', '/super-admin/:path*'],
};
