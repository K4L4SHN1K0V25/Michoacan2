import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyRequest } from '@/lib/auth/jwt';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Public routes that don't require authentication
  const publicRoutes = ['/', '/login', '/register', '/events'];
  const isPublicRoute = publicRoutes.some(route => pathname === route || pathname.startsWith('/events/'));

  // API routes don't need middleware protection (they handle auth internally)
  if (pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  // Static files
  if (pathname.startsWith('/_next/') || pathname.startsWith('/static/')) {
    return NextResponse.next();
  }

  // Protected routes that require authentication
  const protectedRoutes = ['/artist', '/customer', '/admin'];
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

  if (isProtectedRoute) {
    // Verify authentication
    const userData = await verifyRequest(request);

    if (!userData) {
      // Not authenticated - redirect to login
      const url = request.nextUrl.clone();
      url.pathname = '/login';
      url.searchParams.set('redirect', pathname);
      return NextResponse.redirect(url);
    }

    // Check role-based access
    if (pathname.startsWith('/artist') && userData.role !== 'artist') {
      // User is not an artist - redirect to appropriate dashboard
      const url = request.nextUrl.clone();
      url.pathname = userData.role === 'customer' ? '/customer' : '/';
      return NextResponse.redirect(url);
    }

    if (pathname.startsWith('/customer') && userData.role !== 'customer') {
      // User is not a customer - redirect to appropriate dashboard
      const url = request.nextUrl.clone();
      url.pathname = userData.role === 'artist' ? '/artist' : '/';
      return NextResponse.redirect(url);
    }

    if (pathname.startsWith('/admin') && userData.role !== 'admin') {
      // User is not an admin - redirect to home
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  // If already logged in and trying to access login/register, redirect to dashboard
  if (pathname === '/login' || pathname === '/register') {
    const userData = await verifyRequest(request);
    if (userData) {
      const url = request.nextUrl.clone();
      if (userData.role === 'artist') {
        url.pathname = '/artist';
      } else if (userData.role === 'customer') {
        url.pathname = '/customer';
      } else {
        url.pathname = '/';
      }
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
