import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import orderModels from '@/models/orderModels';

export async function GET(req) {
  try {
    const cookieStore = cookies();
    const authToken = cookieStore.get('userAuthToken');

    if (!authToken) {
      console.log('No authentication token found.');
      return NextResponse.json({ message: 'User not logged in' }, { status: 400 });
    }

    const decodedToken = jwt.decode(authToken.value);
    console.log(decodedToken)
    if (!decodedToken || !decodedToken.id) {
      console.log('Invalid token or token does not contain user ID:', decodedToken);
      throw new Error("Invalid token.");
    }

    const id = decodedToken.id;
    console.log('Decoded Token ID:', id);

    // Retrieve order history
    const orderHistory = await orderModels.find({ user: id });
    console.log('Order History Retrieved:', orderHistory);

    return NextResponse.json(orderHistory);
  } catch (error) {
    console.error('Error retrieving order history:', error);
    return NextResponse.json(
      { message: 'Order retrieval failed', error: error.message },
      { status: 500 }
    );
  }
}
