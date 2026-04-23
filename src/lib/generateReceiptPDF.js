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
  
    // 1. Outer Border
    page.drawRectangle({
      x: 15, y: 15, width: 470, height: 670,
      borderColor: rgb(0.12, 0.22, 0.37), // Dark blueish
      borderWidth: 2,
    });
    // Inner thin border
    page.drawRectangle({
      x: 19, y: 19, width: 462, height: 662,
      borderColor: rgb(0.12, 0.22, 0.37),
      borderWidth: 0.5,
    });

    // 2. Watermark Logo
    try {
      page.drawImage(NoBgLogoImage, {
        x: 125, y: 220, width: 250, height: 250, opacity: 0.06
      });
    } catch(e) {
      // Ignored if older pdf-lib doesn't support opacity
    }

    // 3. Header Area
    page.drawImage(logoImage, {
      x: 35, y: 595, width: 75, height: 75,
    });

    page.drawText('JONOJIVAN GRAMIN VIKASH FOUNDATION', {
      x: 120, y: 645, size: 15, font: robotoBoldFont, color: rgb(0.12, 0.22, 0.37)
    });
    page.drawText('Empowering Lives • Building Futures', {
      x: 120, y: 628, size: 10, font: robotoRegularFont, color: rgb(0.4, 0.4, 0.4)
    });
    page.drawText('Reg. No: 6273', {
      x: 120, y: 610, size: 10, font: robotoBoldFont, color: rgb(0.2, 0.2, 0.2)
    });

    // Header separation line
    page.drawLine({ start: { x: 19, y: 580 }, end: { x: 481, y: 580 }, thickness: 1, color: rgb(0.12, 0.22, 0.37) });

    // Donation Receipt Badge
    page.drawRectangle({
      x: 180, y: 568, width: 140, height: 24, color: rgb(0.12, 0.22, 0.37)
    });
    page.drawText('DONATION RECEIPT', {
      x: 196, y: 576, size: 11, font: robotoBoldFont, color: rgb(1, 1, 1)
    });

    // Receipt No & Date
    page.drawText(`Receipt No:`, { x: 40, y: 535, size: 11, font: robotoRegularFont });
    page.drawText(receiptNo, { x: 105, y: 535, size: 11, font: robotoBoldFont });
    
    page.drawText(`Date:`, { x: 360, y: 535, size: 11, font: robotoRegularFont });
    page.drawText(date, { x: 395, y: 535, size: 11, font: robotoBoldFont });

    // ----- Body Details -----
    const startY = 480;
    const rowGap = 35;

    // Name
    page.drawText('Received with Thanks from', { x: 40, y: startY, size: 11, font: robotoRegularFont });
    page.drawText(':', { x: 190, y: startY, size: 11, font: robotoBoldFont });
    page.drawText(fullName.toUpperCase(), { x: 205, y: startY, size: 12, font: robotoBoldFont });
    page.drawLine({ start: { x: 200, y: startY - 2 }, end: { x: 460, y: startY - 2 }, thickness: 0.5, dashArray: [2, 2] });

    // PAN
    page.drawText('PAN / Aadhaar Number', { x: 40, y: startY - rowGap, size: 11, font: robotoRegularFont });
    page.drawText(':', { x: 190, y: startY - rowGap, size: 11, font: robotoBoldFont });
    page.drawText(panCard || 'N/A', { x: 205, y: startY - rowGap, size: 11, font: robotoBoldFont });
    page.drawLine({ start: { x: 200, y: startY - rowGap - 2 }, end: { x: 460, y: startY - rowGap - 2 }, thickness: 0.5, dashArray: [2, 2] });

    // Amount (Words)
    page.drawText('The Sum of Rupees', { x: 40, y: startY - rowGap*2, size: 11, font: robotoRegularFont });
    page.drawText(':', { x: 190, y: startY - rowGap*2, size: 11, font: robotoBoldFont });
    page.drawText(amountInWords.toUpperCase() + ' ONLY', { x: 205, y: startY - rowGap*2, size: 10, font: robotoBoldFont, maxWidth: 250 });
    page.drawLine({ start: { x: 200, y: startY - rowGap*2 - 2 }, end: { x: 460, y: startY - rowGap*2 - 2 }, thickness: 0.5, dashArray: [2, 2] });

    // Payment Mode
    page.drawText('Payment Mode', { x: 40, y: startY - rowGap*3, size: 11, font: robotoRegularFont });
    page.drawText(':', { x: 190, y: startY - rowGap*3, size: 11, font: robotoBoldFont });
    page.drawText(bankName, { x: 205, y: startY - rowGap*3, size: 11, font: robotoBoldFont });
    page.drawLine({ start: { x: 200, y: startY - rowGap*3 - 2 }, end: { x: 460, y: startY - rowGap*3 - 2 }, thickness: 0.5, dashArray: [2, 2] });

    // Transaction ID
    page.drawText('Transaction ID', { x: 40, y: startY - rowGap*4, size: 11, font: robotoRegularFont });
    page.drawText(':', { x: 190, y: startY - rowGap*4, size: 11, font: robotoBoldFont });
    page.drawText(transactionId, { x: 205, y: startY - rowGap*4, size: 11, font: robotoBoldFont });
    page.drawLine({ start: { x: 200, y: startY - rowGap*4 - 2 }, end: { x: 460, y: startY - rowGap*4 - 2 }, thickness: 0.5, dashArray: [2, 2] });

    // Amount Numeric Box
    const amountVal = amount ? parseFloat(amount).toLocaleString('en-IN') : '0';
    page.drawRectangle({
      x: 40, y: startY - rowGap*6 - 5, width: 140, height: 35,
      color: rgb(0.92, 0.96, 1),
      borderColor: rgb(0.12, 0.22, 0.37),
      borderWidth: 1.5,
    });
    page.drawText(`₹ ${amountVal}/-`, {
      x: 60, y: startY - rowGap*6 + 7, size: 16, font: robotoBoldFont, color: rgb(0.12, 0.22, 0.37)
    });

    // Signature Area
    page.drawText('Nazrul Islam', {
      x: 350, y: startY - rowGap*6 + 25, size: 18, font: greatVibesFont, color: rgb(0, 0, 0)
    });
    page.drawLine({ start: { x: 310, y: startY - rowGap*6 + 15 }, end: { x: 460, y: startY - rowGap*6 + 15 }, thickness: 1, color: rgb(0,0,0) });
    page.drawText('Authorised Signatory', { x: 330, y: startY - rowGap*6, size: 10, font: robotoBoldFont });

    // ----- Footer -----
    page.drawLine({ start: { x: 19, y: 155 }, end: { x: 481, y: 155 }, thickness: 1, color: rgb(0.12, 0.22, 0.37) });

    page.drawText('Registered Office:', { x: 40, y: 135, size: 10, font: robotoBoldFont });
    page.drawText('Uttar Khatowal, PO- Uttar Khatowal, PS- Rupahihat, Nagaon, Assam, Pin- 782124', { x: 40, y: 120, size: 9, font: robotoRegularFont });
    page.drawText('Website: www.jonojivan.in  |  Contact: +91 94352 66783  |  Email: contact@jonojivan.in', { x: 40, y: 105, size: 9, font: robotoRegularFont });

    // 80G Information Block
    page.drawLine({ start: { x: 19, y: 90 }, end: { x: 481, y: 90 }, thickness: 1, color: rgb(0.8, 0.8, 0.8) });

    page.drawText('All donations to JonoJivan Gramin Vikash Foundation are eligible for tax deduction', { x: 40, y: 73, size: 9, font: robotoRegularFont, color: rgb(0.3, 0.3, 0.3) });
    page.drawText('under Section 80G of the Income Tax Act, 1961.', { x: 40, y: 60, size: 9, font: robotoRegularFont, color: rgb(0.3, 0.3, 0.3) });

    page.drawText('PAN:', { x: 40, y: 35, size: 9, font: robotoBoldFont });
    page.drawText('AAHCJ0084F', { x: 65, y: 35, size: 9, font: robotoRegularFont });

    page.drawText('80G Reg No:', { x: 160, y: 35, size: 9, font: robotoBoldFont });
    page.drawText('AAHCJ0084FF20251', { x: 220, y: 35, size: 9, font: robotoRegularFont });

    page.drawText('Validity:', { x: 340, y: 35, size: 9, font: robotoBoldFont });
    page.drawText('2026-27 to 2028-29', { x: 380, y: 35, size: 9, font: robotoRegularFont });
    
  
    return await pdfDoc.save();
  }
  
  
  
