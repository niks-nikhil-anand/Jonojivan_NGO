import { Buffer } from 'buffer';
import cloudinary from './cloudinary';

const uploadPDF = async (pdfBuffer, folder) => {
  try {
    if (!(pdfBuffer instanceof Buffer)) {
      throw new Error('Invalid PDF buffer');
    }

    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: 'raw', // 'raw' is suitable for PDFs and non-image files
          folder: folder,
          format: 'pdf', // Ensure the uploaded file is treated as a PDF
        },
        (err, result) => {
          if (err) {
            return reject(`Cloudinary upload error: ${err.message}`);
          }
          resolve(result);
        }
      );

      // Write the PDF buffer to the upload stream
      uploadStream.end(pdfBuffer);
    });
  } catch (error) {
    throw new Error(`Failed to upload PDF: ${error.message}`);
  }
};

export default uploadPDF;
