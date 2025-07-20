import { NextResponse } from 'next/server';
import { parse } from 'cookie';
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  const cookieHeader = req.headers.get('cookie');
  const cookies = parse(cookieHeader || '');
  const adminAuthToken = cookies.adminAuthToken;
  const memberAuthToken = cookies.memberAuthToken;

  const token = await getToken({ req });
  const { pathname } = req.nextUrl;

  

  // Protect /admin/dashboard routes and redirect to admin auth if not authenticated
  if (pathname.startsWith('/admin/dashboard') && !adminAuthToken) {
    return NextResponse.redirect(new URL('/admin/auth', req.nextUrl.origin));
  }

   // Protect /admin/dashboard routes and redirect to admin auth if not authenticated
  if (pathname.startsWith('/member') && !memberAuthToken) {
    return NextResponse.redirect(new URL('/auth/member-signIn', req.nextUrl.origin));
  }


  // Allow access to the requested page if all conditions pass
  return NextResponse.next();
}
