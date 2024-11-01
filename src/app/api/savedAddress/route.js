import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import User from '@/models/userModels'; // Import the User model
import connectDB from '@/lib/dbConnect';

export async function GET(req) {
  try {
    await connectDB();
    console.log("Database connected successfully for GET request");
    const cookieStore = cookies();
    const authToken = cookieStore.get('userAuthToken');

    if (!authToken) {
      console.log('No authentication token found.');
      return NextResponse.json({ message: 'User not logged in' }, { status: 400 });
    }

    const decodedToken = jwt.decode(authToken.value);
    console.log(decodedToken);
    if (!decodedToken || !decodedToken.id) {
      console.log('Invalid token or token does not contain user ID:', decodedToken);
      throw new Error("Invalid token.");
    }

    const userId = decodedToken.id;
    console.log('Decoded Token ID:', userId);

    // Find the user by ID and populate their addresses
    const user = await User.findById(userId).populate('address').lean(); // Use lean() here
    if (!user) {
      console.log('User not found.');
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    console.log('User Retrieved:', user);

    // Check if addresses exist
    const addresses = user.address || []; // Default to an empty array if addresses are undefined

    return NextResponse.json(addresses); // Return the addresses
  } catch (error) {
    console.error('Error retrieving saved addresses:', error);
    return NextResponse.json(
      { message: 'Address retrieval failed', error: error.message },
      { status: 500 }
    );
  }
}
