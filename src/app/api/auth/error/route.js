import { NextResponse } from 'next/server';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const error = searchParams.get("error");

  // Log the error for debugging (optional)
  console.log("Auth error received:", error);

  // Send a JSON response with the error message (if provided)
  return NextResponse.json({
    success: false,
    message: error || "An unknown authentication error occurred. Please try again.",
  }, { status: 400 });
}
