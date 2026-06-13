import { NextRequest, NextResponse } from 'next/server';

const PROTECTED = ['/dashboard', '/laptops', '/criteria', '/recomendations'];

export function proxy(request: NextRequest) {
  const token = request.cookies.get('accessToken')?.value;
  const { pathname } = request.nextUrl;

  if (PROTECTED.some((route) => pathname.startsWith(route)) && !token) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  if (pathname.startsWith('/auth') && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/laptops/:path*',
    '/criteria/:path*',
    '/recomendations/:path*',
    '/auth/:path*',
  ],
};
