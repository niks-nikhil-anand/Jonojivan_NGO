"use server";

import { generateReceiptPDF } from "@/lib/generateReceiptPDF";

export async function downloadReceiptAction(pdfParams) {
  try {
    const pdfBytes = await generateReceiptPDF(pdfParams);
    const base64 = Buffer.from(pdfBytes).toString('base64');
    return { success: true, pdfBase64: base64 };
  } catch (error) {
    console.error("Error generating receipt PDF:", error);
    return { success: false, error: 'Failed to generate PDF' };
  }
}
