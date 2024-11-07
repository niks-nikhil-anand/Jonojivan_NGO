import { NextResponse } from 'next/server';
import { parse } from 'cookie';
import { getToken } from "next-auth/jwt"

export async function middleware(req) {
  const cookieHeader = req.headers.get('cookie');
  const cookies = parse(cookieHeader || '');
  const userAuthToken = cookies.userAuthToken;
  const authToken = cookies.adminAuthToken;

  const token = await getToken({ req })
  const isAuthPage = req.nextUrl.pathname === '/auth/register';



  if (token && isAuthPage) {
    const url = new URL(`/users/${token.id}`, req.nextUrl.origin);
    console.log("Redirecting to user page:", url.href);
    return NextResponse.redirect(url);
  }

  if (req.nextUrl.pathname.startsWith('/users')) {
    if (!token) {
      const url = new URL('/auth/signIn', req.nextUrl.origin);
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  // Check for admin dashboard routes
  if (req.nextUrl.pathname.startsWith('/admin/dashboard')) {
    if (!authToken) {
      const url = new URL('/admin/auth', req.nextUrl.origin);
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}
