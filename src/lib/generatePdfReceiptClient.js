import { PDFDocument, rgb } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';

function numberToWords(num) {
  // Number to words logic here
  // ...
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

  // Load fonts and images using fetch
  const loadFont = async (url) => {
    const response = await fetch(url);
    return await response.arrayBuffer();
  };

  const loadImage = async (url) => {
    const response = await fetch(url);
    return await response.arrayBuffer();
  };

  // Load resources
  const fontBytesRegular = await loadFont('/public/font/Roboto-Regular.ttf');
  const fontBytesBold = await loadFont('/public/font/Roboto-Bold.ttf');
  const fontBytesGreatVibes = await loadFont('/public/font/GreatVibes-Regular.ttf');
  const logoBytes = await loadImage('/public/logo/Smile.png');
  const NoBgLogoBytes = await loadImage('/public/logo/SmileNoBg.png');

  const robotoRegularFont = await pdfDoc.embedFont(fontBytesRegular);
  const robotoBoldFont = await pdfDoc.embedFont(fontBytesBold);
  const greatVibesFont = await pdfDoc.embedFont(fontBytesGreatVibes);
  const logoImage = await pdfDoc.embedPng(logoBytes);
  const NoBgLogoImage = await pdfDoc.embedPng(NoBgLogoBytes);

  const page = pdfDoc.addPage([500, 700]);
  const fontSize = 12;

  // PDF drawing logic here
  // ...

  return await pdfDoc.save();
}
