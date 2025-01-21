import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  async function middleware(req) {
    const { pathname } = req.nextUrl;

    // Redirect all unauthorized users except on the /login page
    // if (pathname !== '/login') {
    //   return NextResponse.redirect(new URL('http://127.0.0.1:3000/auth/auth1/login', req.url));
    // }

    return NextResponse.next(); // Allow access
  },
  {
    callbacks: {
      authorized: () => true, // Enable token checks globally, let middleware handle logic
    },
  }
);

export const config = {
  matcher: [
    '/((?!login).*)', // Matches all routes except /login
  ],
};
