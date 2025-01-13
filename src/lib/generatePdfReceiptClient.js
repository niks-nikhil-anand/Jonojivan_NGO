import { PDFDocument, rgb } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';

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

export async function generatePdfReceiptClient({
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

  // Fetch fonts and images as Uint8Array
  const fetchAsset = async (url) => {
    const res = await fetch(url);
    return res.arrayBuffer();
  };

  const fontBytesRegular = await fetchAsset('/font/Roboto-Regular.ttf');
  const fontBytesBold = await fetchAsset('/font/Roboto-Bold.ttf');
  const fontBytesGreatVibes = await fetchAsset('/font/GreatVibes-Regular.ttf');
  const logoBytes = await fetchAsset('/logo/Smile.png');
  const NoBgLogoBytes = await fetchAsset('/logo/SmileNoBg.png');

  const robotoRegularFont = await pdfDoc.embedFont(fontBytesRegular);
  const robotoBoldFont = await pdfDoc.embedFont(fontBytesBold);
  const greatVibesFont = await pdfDoc.embedFont(fontBytesGreatVibes);
  const logoImage = await pdfDoc.embedPng(logoBytes);
  const NoBgLogoImage = await pdfDoc.embedPng(NoBgLogoBytes);

  const page = pdfDoc.addPage([500, 700]);
  const fontSize = 12;

  // Add content similar to the server-side code
  page.drawImage(logoImage, {
    x: 50,
    y: 630,
    width: 80,
    height: 80,
  });

  page.drawText('Reg. No.- 6273', {
    x: 400,
    y: 680,
    size: 12,
    font: robotoBoldFont,
  });

  page.drawText('Donation Receipt', {
    x: 180,
    y: 640,
    size: 20,
    font: robotoBoldFont,
  });

  page.drawLine({
    start: { x: 50, y: 620 },
    end: { x: 450, y: 620 },
    thickness: 1,
    color: rgb(0, 0, 0),
  });

  page.drawText(`Receipt No.: ${receiptNo}`, { x: 50, y: 570, size: fontSize, font: robotoRegularFont });
  page.drawText(`Date: ${date}`, { x: 370, y: 570, size: fontSize, font: robotoRegularFont });
  page.drawText(`Received with thanks from:- ${fullName}`, { x: 50, y: 510, size: fontSize, font: robotoRegularFont });

  // Continue adding more content...

  // Save and download the PDF
  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'receipt.pdf';
  link.click();
}
