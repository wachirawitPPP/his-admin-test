import { NextResponse, NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get('authToken'); // Example using cookies

  // Redirect root ("/") to "/app-menu"
  // if (pathname === "/") {
  //   return NextResponse.redirect(new URL('/app-menu', req.url));
  // }

  // // Example: Protect all routes except public ones
  // const publicPaths = ['/login', '/signup'];
  // const isPublic = publicPaths.includes(pathname);

  // if (!isPublic && !token) {
  //   // If user is not authenticated, redirect to login
  //   return NextResponse.redirect(new URL('/login', req.url));
  // }

  return NextResponse.next(); // Allow request to continue
}

export const config = {
  matcher: ['/:path*'], // Apply to all routes
};
