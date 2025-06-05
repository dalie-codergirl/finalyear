import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { ROLES } from './lib/auth';

// Define protected routes and their allowed roles
const protectedRoutes = {
  '/admin': [ROLES.ADMIN],
  '/admin/dashboard': [ROLES.ADMIN],
  '/senior-manager': [ROLES.SENIOR_MANAGER],
  '/senior-manager/dashboard': [ROLES.SENIOR_MANAGER],
  '/field-officer': [ROLES.FIELD_OFFICER],
  '/field-officer/dashboard': [ROLES.FIELD_OFFICER],
  '/accountant': [ROLES.ACCOUNTANT],
  '/accountant/dashboard': [ROLES.ACCOUNTANT],
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow access to login page and API routes
  if (pathname === '/login' || pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  // Check if the route is protected
  const isProtectedRoute = Object.keys(protectedRoutes).some(route => 
    pathname.startsWith(route)
  );

  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  // Get the token from cookies
  const token = request.cookies.get('auth-token');

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    // Verify token and check role
    const response = await fetch(`${request.nextUrl.origin}/api/auth/verify`, {
      headers: {
        Cookie: `auth-token=${token.value}`,
      },
    });

    if (!response.ok) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    const { role } = await response.json();

    // Check if user has permission for this route
    const hasPermission = Object.entries(protectedRoutes).some(([route, allowedRoles]: [string, string[]]) => {
      if (pathname.startsWith(route)) {
        return allowedRoles.includes(role);
      }
      return false;
    });

    if (!hasPermission) {
      // Redirect to appropriate dashboard based on role
      switch (role) {
        case ROLES.ADMIN:
          return NextResponse.redirect(new URL('/admin/dashboard', request.url));
        case ROLES.SENIOR_MANAGER:
          return NextResponse.redirect(new URL('/senior-manager/dashboard', request.url));
        case ROLES.FIELD_OFFICER:
          return NextResponse.redirect(new URL('/field-officer/dashboard', request.url));
        case ROLES.ACCOUNTANT:
          return NextResponse.redirect(new URL('/accountant/dashboard', request.url));
        default:
          return NextResponse.redirect(new URL('/login', request.url));
      }
    }

    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * 1. /api/auth/verify (API route for token verification)
     * 2. /login (login page)
     * 3. /_next (Next.js internals)
     * 4. /static (static files)
     * 5. /favicon.ico, /robots.txt (static files)
     */
    '/((?!api/auth/verify|login|_next|static|favicon.ico|robots.txt).*)',
  ],
}; 