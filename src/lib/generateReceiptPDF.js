import { PDFDocument, rgb } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';
import fs from 'fs';
import path from 'path';


function numberToWords(num) {
  
    const a = [
      '', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 
      'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 
      'Eighteen', 'Nineteen'
    ];
    const b = [
      '', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'
    ];
    
    const getHundreds = (n) => {
      if (n < 20) return a[n];
      if (n < 100) return b[Math.floor(n / 10)] + (n % 10 !== 0 ? ' ' + a[n % 10] : '');
      return a[Math.floor(n / 100)] + ' Hundred' + (n % 100 !== 0 ? ' ' + getHundreds(n % 100) : '');
    };
  
    if (num === 0) return 'Zero';
    let words = '';
    if (Math.floor(num / 1000) > 0) {
      words += getHundreds(Math.floor(num / 1000)) + ' Thousand ';
      num %= 1000;
    }
    words += getHundreds(num);
    return words.trim();
  }
  
  export async function generateReceiptPDF({
    fullName,
    panCard,
    amount,
    bankName,
    receiptNo,
    date,
    transactionId,
  }) {
    const pdfDoc = await PDFDocument.create();
    pdfDoc.registerFontkit(fontkit);
    const amountInWords = numberToWords(amount); // Convert the numeric amount to words
  
    const fontPathRegular = path.join(process.cwd(), 'public', 'font', 'Roboto-Regular.ttf'); // Regular font path
    const fontPathBold = path.join(process.cwd(), 'public', 'font', 'Roboto-Bold.ttf'); // Bold font path
    const fontPathGreatVibes = path.join(process.cwd(), 'public', 'font', 'GreatVibes-Regular.ttf'); // GreatVibes font path
  
    const fontBytesRegular = fs.readFileSync(fontPathRegular);
    const robotoRegularFont = await pdfDoc.embedFont(fontBytesRegular);
  
    const fontBytesBold = fs.readFileSync(fontPathBold);
    const robotoBoldFont = await pdfDoc.embedFont(fontBytesBold); // Embedding Roboto Bold font
  
    const fontBytesGreatVibes = fs.readFileSync(fontPathGreatVibes);
    const greatVibesFont = await pdfDoc.embedFont(fontBytesGreatVibes); // Embedding GreatVibes font
  
    const logoPath = path.join(process.cwd(), 'public', 'logo', 'logo.png'); // Logo path
    const NoBglogoPath = path.join(process.cwd(), 'public', 'logo', 'logo.png'); // Logo path
    const logoBytes = fs.readFileSync(logoPath);
    const logoImage = await pdfDoc.embedPng(logoBytes);
    const NoBgLogoBytes = fs.readFileSync(NoBglogoPath); // Read the NoBg logo file
    const NoBgLogoImage = await pdfDoc.embedPng(NoBgLogoBytes); // Embed the NoBg logo
  
    const page = pdfDoc.addPage([500, 700]);
    const fontSize = 12;
  
    // Logo - Left without scaling
    page.drawImage(logoImage, {
      x: 50, // Left-aligned
      y: 630, // Adjusted for proper alignment
      width: 80, // Fixed width
      height: 80, // Fixed height
    });
  
    // Registration Number - Slightly Below
    page.drawText('Reg. No.- 6273', {
      x: 400, // Right-aligned
      y: 680, // Slightly below the previous position
      size: 12,
      font: robotoBoldFont,  // Use Roboto Bold
    });
  
    // Title - Centered Below Reg. No.
    page.drawText('Donation Receipt', {
      x: 180, // Centered text position
      y: 640,
      size: 20,
      font: robotoBoldFont,  // Use Roboto Bold
    });
  
    // Horizontal Line - Below Title
    page.drawLine({
      start: { x: 50, y: 620 },
      end: { x: 450, y: 620 },
      thickness: 1,
      color: rgb(0, 0, 0),
    });
  
    // Receipt Number & Date
    page.drawText(`Receipt No.: ${receiptNo}`, { x: 50, y: 570, size: fontSize, font: robotoRegularFont });
    page.drawText(`Date: ${date}`, { x: 370, y: 570, size: fontSize, font: robotoRegularFont });
  
    // Full Name
    page.drawText(`Received with thanks from:- ${fullName}`, { x: 50, y: 510, size: fontSize, font: robotoRegularFont });
  
    // Dotted Line Below Full Name
    page.drawLine({
      start: { x: 50, y: 500 },
      end: { x: 450, y: 500 },
      thickness: 1,
      color: rgb(0, 0, 0),
      dashArray: [4, 2], // Creates a dotted line
    });
  
    // PAN Number
    page.drawText(`PAN No:- ${panCard}`, { x: 50, y: 470, size: fontSize, font: robotoRegularFont });
  
    // Dotted Line Below PAN Number
    page.drawLine({
      start: { x: 50, y: 460 },
      end: { x: 450, y: 460 },
      thickness: 1,
      color: rgb(0, 0, 0),
      dashArray: [4, 2], // Creates a dotted line
    });
  
    // Donation Amount
    page.drawText(`The sum of Rupees ${amountInWords} only`, {
      x: 50,
      y: 440,
      size: fontSize,
      font: robotoRegularFont,
    });
  
    // Dotted Line Below Donation Amount
    page.drawLine({
      start: { x: 50, y: 430 },
      end: { x: 450, y: 430 },
      thickness: 1,
      color: rgb(0, 0, 0),
      dashArray: [4, 2], // Creates a dotted line
    });
  
    // Payment Details
    page.drawText(`By cheque / draft / fund transfer / cash / online payment, drawn from:`, { x: 50, y: 400, size: fontSize, font: robotoRegularFont });
    page.drawText(bankName, { x: 55, y: 380, size: fontSize, font: robotoRegularFont });
  
    // Dotted Line Below Payment Details
    page.drawLine({
      start: { x: 50, y: 370 },
      end: { x: 450, y: 370 },
      thickness: 1,
      color: rgb(0, 0, 0),
      dashArray: [4, 2], // Creates a dotted line
    });
  
    // Transaction ID
    page.drawText(`Transaction ID:- ${transactionId}`, { x: 50, y: 340, size: fontSize, font: robotoRegularFont });
  
    // Dotted Line Below Transaction ID
    page.drawLine({
      start: { x: 50, y: 330 },
      end: { x: 450, y: 330 },
      thickness: 1,
      color: rgb(0, 0, 0),
      dashArray: [4, 2], // Creates a dotted line
    });
  
    // Amount Box Label - Positioned Lower
    page.drawText('Rs.', { x: 390, y: 290, size: fontSize, font: robotoRegularFont });
  
    // Rectangle for Amount Box - Positioned Lower
    page.drawRectangle({
      x: 410,
      y: 285,
      width: 80,
      height: 20,
      borderColor: rgb(0, 0, 0),
      borderWidth: 1,
    });
  
    // Amount Text - Positioned Lower
    page.drawText(`${amount}/-`, { x: 415, y: 290, size: fontSize, font: robotoRegularFont });
  
    // Authorised Signature (Nazrul Islam) Below the Name
    page.drawText(' Nazrul Islam', {
      x: 50,
      y: 270,  // Adjusted below the name
      size: 12,
      font: greatVibesFont,  // Use GreatVibes font for signature
    });
  
    // Nazrul Islam (Normal Font - Roboto Regular)
    page.drawText('Authorised Signature', {
      x: 50,
      y: 250,  // Adjusted below the amount box
      size: 12,
      font: robotoRegularFont,  // Use Roboto Regular font for name
    });
  
    // Footer - Address and Donation Exemption Note
    page.drawText('Uttar Khatowal, PO- Uttar Khatowal\nPS- Rupahihat, Nagaon, Assam\nPin- 782124\nwww.jonojivan.in\nContact No. +91 94352 66783', {
      x: 50,
      y: 150, // Moved to footer
      size: 10,
      lineHeight: 12,
      font: robotoRegularFont,
    });
  
    // Distinct visually separated section for 80G Information
    page.drawLine({
      start: { x: 50, y: 85 },
      end: { x: 450, y: 85 },
      thickness: 1,
      color: rgb(0.8, 0.8, 0.8), // light gray separator
    });

    page.drawText('All donations to JonoJivan Gramin Vikash Foundation are eligible for tax deduction', {
      x: 50, y: 70, size: 9, font: robotoRegularFont, color: rgb(0.3, 0.3, 0.3)
    });
    page.drawText('under Section 80G of the Income Tax Act, 1961.', {
      x: 50, y: 60, size: 9, font: robotoRegularFont, color: rgb(0.3, 0.3, 0.3)
    });

    // Keys in Bold, Values in Regular
    page.drawText('PAN:', { x: 50, y: 40, size: 9, font: robotoBoldFont });
    page.drawText('AAHCJ0084F', { x: 75, y: 40, size: 9, font: robotoRegularFont });

    page.drawText('80G Registration No:', { x: 170, y: 40, size: 9, font: robotoBoldFont });
    page.drawText('AAHCJ0084FF20251', { x: 265, y: 40, size: 9, font: robotoRegularFont });

    page.drawText('Validity:', { x: 50, y: 25, size: 9, font: robotoBoldFont });
    page.drawText('2026-27 to 2028-29', { x: 95, y: 25, size: 9, font: robotoRegularFont });
    
  
    return await pdfDoc.save();
  }
  
  
  
