import { NextResponse, type NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect all /admin routes except for the login page itself
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    const authCookie = request.cookies.get('admin-auth');
    if (!authCookie || authCookie.value !== 'true') {
      // If not authenticated, redirect to the login page
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  // Match all routes under /admin
  matcher: ['/admin/:path*'],
};
