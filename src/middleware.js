import { NextResponse } from 'next/server';
import { parse } from 'cookie';
import jwt from 'jsonwebtoken';

export async function middleware(req) {
  const cookieHeader = req.headers.get('cookie');
  const cookies = parse(cookieHeader || '');
  const userAuthToken = cookies.userAuthToken;
  const authToken = cookies.adminAuthToken;

  if (req.nextUrl.pathname.startsWith('/user')) {
    if (!userAuthToken) {
      const url = new URL('/auth/signIn', req.nextUrl.origin);
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }


  if (req.nextUrl.pathname.startsWith('/admin/dashboard')) {
    if (!authToken) {
      const url = new URL('/admin/auth', req.nextUrl.origin);
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}
