import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { signOut } from 'next-auth/react';

export async function POST(req) {
  try {
    // Sign out from NextAuth without redirecting
    await signOut({ redirect: false });

    const response = NextResponse.json({ message: 'Logout successful' });

    // Define cookies to clear with their respective paths
    const cookiesToClear = [
      { name: 'userAuthToken', path: '/' },
      { name: 'next-auth.session-token', path: '/' },
      { name: 'next-auth.callback-url', path: '/' },
      { name: 'next-auth.csrf-token', path: '/' },
    ];

    // Clear each specified cookie by setting it to expire immediately
    cookiesToClear.forEach(({ name, path }) => {
      response.cookies.set(name, '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path,
        expires: new Date(0), // Expire immediately
      });
    });

    return response;
  } catch (error) {
    return NextResponse.json({ message: 'Logout failed', error: error.message }, { status: 500 });
  }
}
