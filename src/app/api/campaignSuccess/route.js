import ThankYouEmail from '@/emails/ThankYouEmail';
import connectDB from '@/lib/dbConnect';
import { generateReceiptPDF } from '@/lib/generateReceiptPDF';
import Donation from '@/models/donationModels';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import Campaign from '@/models/campaignModels';

export async function POST(req) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    console.log('Incoming POST request to donation endpoint...');

    // Connect to the database
    await connectDB();

    // Parse the request body
    const body = await req.json();
    const {
      fullName,
      emailaddress,
      panCard,
      phonenumber,
      amount,
      paymentMethod,
      razorpay_order_id,
      razorpay_payment_id,
      bankName = 'Online Payment',
      cardId,
    } = body;

    if (!fullName || !emailaddress || !phonenumber || !amount || !paymentMethod) {
      return NextResponse.json(
        { message: 'Missing required fields.' },
        { status: 400 }
      );
    }

    const donationAmount = amount || 1000;
    const receiptNo = `BRSM-${Date.now()}`;
    const date = new Date().toLocaleDateString();

    let campaign = null;

    if (cardId) {
      // Find the campaign by cardId
      campaign = await Campaign.findOne({ _id: cardId });

      if (!campaign) {
        return NextResponse.json(
          { message: 'Campaign not found for the given cardId.' },
          { status: 404 }
        );
      }

      // Update the campaign's raised amount
      campaign.raised += donationAmount;

      if (campaign.raised > campaign.goal) {
        return NextResponse.json(
          { message: 'Donation exceeds campaign goal.' },
          { status: 400 }
        );
      }

      // Save the updated campaign
      await campaign.save();
    }

    // Create a new donation entry in the database
    const donation = await Donation.create({
      fullName,
      email: emailaddress,
      panCardNumber: panCard,
      phoneNumber: phonenumber,
      amount: donationAmount,
      paymentMethod,
      razorpay_order_id,
      razorpay_payment_id,
      campaign: campaign ? campaign._id : null, // Link donation to campaign if exists
    });

    // Generate PDF receipt
    console.log('Generating PDF receipt...');
    const pdfBytes = await generateReceiptPDF({
      fullName,
      panCard,
      amount: donationAmount,
      bankName,
      receiptNo,
      date,
      transactionId: razorpay_payment_id || razorpay_order_id,
    });

    // Send thank-you email with PDF receipt
    console.log('Sending thank-you email...');
    const emailResponse = await resend.emails.send({
      from: 'no-reply@bringsmile.org',
      to: emailaddress,
      subject: 'Your Generosity Has Changed a Life - Thank You',
      react: <ThankYouEmail donorName={fullName} />,
      attachments: [
        {
          filename: `Donation_Receipt_${razorpay_order_id || receiptNo}.pdf`,
          content: Buffer.from(pdfBytes).toString('base64'),
          type: 'application/pdf',
          disposition: 'attachment',
        },
      ],
    });

    console.log('Thank-you email sent successfully:', emailResponse);
    return NextResponse.json(
      { message: 'Donation successful', donation },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error processing donation:', error);
    return NextResponse.json(
      { message: 'Donation failed', error: 'Internal server error.' },
      { status: 500 }
    );
  }
}
