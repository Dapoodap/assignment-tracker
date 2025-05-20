// src/middleware.ts
import { NextResponse } from 'next/server';
import { auth } from '@/auth';
 
export default auth((req) => {
  // req.auth contains the user's session
  const { nextUrl } = req;
  const isAuthenticated = !!req.auth;
  
  // If user is logged in and trying to access login page, redirect to dashboard
  if (isAuthenticated && (nextUrl.pathname === '/login' || nextUrl.pathname === '/register')) {
    return NextResponse.redirect(new URL('/dashboard', nextUrl));
  }

  // Protected routes - redirect to login if not authenticated
  const protectedRoutes = ['/dashboard', '/profile', '/tasks'];
  if (!isAuthenticated && protectedRoutes.some(route => nextUrl.pathname.startsWith(route))) {
    return NextResponse.redirect(new URL('/login', nextUrl));
  }

  return NextResponse.next();
});

// Konfigurasi matcher: tentukan rute mana yang akan diproses oleh middleware
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)'],
};