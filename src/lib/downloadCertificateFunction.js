import { toast } from "react-hot-toast";

// Load jsPDF dynamically with proper error handling
const loadJsPDF = async () => {
  if (typeof window === 'undefined') return null;
  
  try {
    const jsPDF = await import('jspdf');
    return jsPDF.default || jsPDF;
  } catch (error) {
    console.error('Failed to load jsPDF:', error);
    return null;
  }
};

// Check browser compatibility
const checkBrowserSupport = () => {
  if (typeof window === 'undefined') return false;
  
  if (!window.URL || !window.URL.createObjectURL) {
    toast.error('Your browser does not support file downloads');
    return false;
  }
  
  return true;
};

// Helper function to safely convert values to strings
const safeString = (value, fallback = '') => {
  if (value === null || value === undefined) return fallback;
  if (typeof value === 'string') return value;
  if (typeof value === 'object' && value.toString) return value.toString();
  return String(value);
};

// Function to load and add logo to PDF
const addLogoToPDF = (doc, x, y, width, height) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        
        const dataURL = canvas.toDataURL('image/png');
        doc.addImage(dataURL, 'PNG', x, y, width, height);
        resolve(true);
      } catch (error) {
        console.warn('Failed to add logo:', error);
        resolve(false);
      }
    };
    
    img.onerror = () => {
      console.warn('Failed to load logo image');
      resolve(false);
    };
    
    img.src = '/logo/logo.png';
    
    // Fallback timeout
    setTimeout(() => resolve(false), 3000);
  });
};

// Alternative download method using blob and URL
const downloadPDFBlob = (doc, fileName) => {
  try {
    const pdfBlob = doc.output('blob');
    const url = window.URL.createObjectURL(pdfBlob);
    
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = fileName;
    downloadLink.style.display = 'none';
    
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    
    setTimeout(() => {
      window.URL.revokeObjectURL(url);
    }, 100);
    
    return true;
  } catch (error) {
    console.error('Blob download failed:', error);
    return false;
  }
};

// Main download certificate function
export const downloadCertificateFunction = async (certificate, setDownloadingId = null) => {
  if (!checkBrowserSupport()) return;

  if (certificate.status !== "Active") {
    toast.error("Only active certificates can be downloaded");
    return;
  }

  try {
    if (setDownloadingId) {
      setDownloadingId(safeString(certificate._id));
    }
    
    const jsPDF = await loadJsPDF();
    if (!jsPDF) {
      throw new Error('Failed to load PDF library');
    }

    const doc = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a4",
    });

    // Certificate dimensions with proper padding
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const padding = 15;
    
    // White background
    doc.setFillColor(255, 255, 255);
    doc.rect(0, 0, pageWidth, pageHeight, "F");

    // Outer border - black
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(2);
    doc.rect(padding, padding, pageWidth - (padding * 2), pageHeight - (padding * 2));
    
    // Inner border - gray
    doc.setDrawColor(128, 128, 128);
    doc.setLineWidth(1);
    doc.rect(padding + 5, padding + 5, pageWidth - (padding * 2) - 10, pageHeight - (padding * 2) - 10);

    // Add logo (top left)
    const logoAdded = await addLogoToPDF(doc, padding + 10, padding + 10, 20, 20);
    
    // Organization name (top center)
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "bold");
    const orgName = "JonoJivan Gramin Vikash Foundation";
    const orgNameWidth = doc.getTextWidth(orgName);
    doc.text(orgName, (pageWidth - orgNameWidth) / 2, padding + 20);

    // Decorative line under organization name
    doc.setDrawColor(128, 128, 128);
    doc.setLineWidth(1);
    doc.line((pageWidth - orgNameWidth) / 2, padding + 23, (pageWidth + orgNameWidth) / 2, padding + 23);

    // Certificate title
    doc.setFontSize(32);
    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "bold");
    const title = "Certificate Of Achievement";
    const titleWidth = doc.getTextWidth(title);
    doc.text(title, (pageWidth - titleWidth) / 2, padding + 45);

    // Decorative line under title
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(2);
    doc.line((pageWidth - 100) / 2, padding + 50, (pageWidth + 100) / 2, padding + 50);

    // "Proudly Presented To" text
    doc.setFontSize(12);
    doc.setTextColor(128, 128, 128);
    doc.setFont("helvetica", "normal");
    const presentedText = "PROUDLY PRESENTED TO";
    const presentedWidth = doc.getTextWidth(presentedText);
    doc.text(presentedText, (pageWidth - presentedWidth) / 2, padding + 65);

    // Recipient name with elegant styling
    doc.setFontSize(28);
    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "bold");
    const recipientName = safeString(
      certificate.member?.user?.fullName || certificate.name, 
      "Certificate Recipient"
    );
    const nameWidth = doc.getTextWidth(recipientName);
    doc.text(recipientName, (pageWidth - nameWidth) / 2, padding + 85);

    // Elegant underline for name
    doc.setDrawColor(128, 128, 128);
    doc.setLineWidth(1);
    doc.line((pageWidth - nameWidth) / 2, padding + 90, (pageWidth + nameWidth) / 2, padding + 90);

    // Description text
    doc.setFontSize(12);
    doc.setTextColor(64, 64, 64);
    doc.setFont("helvetica", "normal");
    
    const descriptionLines = [
      "This certificate is awarded in recognition of outstanding achievement and dedication.",
      "The recipient has demonstrated exceptional skills and commitment in their field of expertise.",
      "This award acknowledges their valuable contributions and serves as recognition of their excellence."
    ];
    
    let descY = padding + 105;
    descriptionLines.forEach(line => {
      const lineWidth = doc.getTextWidth(line);
      doc.text(line, (pageWidth - lineWidth) / 2, descY);
      descY += 7;
    });

    // Certificate details section
    const detailsY = padding + 135;
    const detailsSpacing = (pageWidth - (padding * 2)) / 4;
    
    // Certificate ID
    doc.setFontSize(10);
    doc.setTextColor(128, 128, 128);
    doc.setFont("helvetica", "normal");
    doc.text("Certificate ID:", padding + 20, detailsY);
    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "bold");
    const certificateId = safeString(certificate._id, 'N/A').substring(0, 12).toUpperCase();
    doc.text(certificateId, padding + 20, detailsY + 5);

    // Member ID
    if (certificate.member?.membershipId) {
      doc.setTextColor(128, 128, 128);
      doc.setFont("helvetica", "normal");
      doc.text("Member ID:", padding + 20 + detailsSpacing, detailsY);
      doc.setTextColor(0, 0, 0);
      doc.setFont("helvetica", "bold");
      const membershipId = safeString(certificate.member.membershipId, 'N/A');
      doc.text(membershipId, padding + 20 + detailsSpacing, detailsY + 5);
    }

    // Issue Date
    doc.setTextColor(128, 128, 128);
    doc.setFont("helvetica", "normal");
    doc.text("Issue Date:", padding + 20 + (detailsSpacing * 3), detailsY);
    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "bold");
    
    let issueDateText = "N/A";
    try {
      if (certificate.createdAt) {
        const date = new Date(certificate.createdAt);
        if (!isNaN(date.getTime())) {
          issueDateText = date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          });
        }
      }
    } catch (dateError) {
      console.warn('Date parsing failed:', dateError);
    }
    
    doc.text(issueDateText, padding + 20 + (detailsSpacing * 3), detailsY + 5);

    // Signature section
    const signatureY = pageHeight - padding - 35;
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "normal");
    doc.text("Authorized Signature", pageWidth - padding - 60, signatureY);
    
    // Signature line
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.5);
    doc.line(pageWidth - padding - 60, signatureY + 8, pageWidth - padding - 15, signatureY + 8);

    // Date of issuance at bottom left
    doc.setFontSize(10);
    doc.setTextColor(128, 128, 128);
    doc.setFont("helvetica", "normal");
    doc.text(`Generated on: ${new Date().toLocaleDateString("en-US")}`, padding + 20, pageHeight - padding - 15);

    // Decorative seal/stamp area (bottom center)
    const sealX = pageWidth / 2;
    const sealY = pageHeight - padding - 30;
    
    // Outer circle - black
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(2);
    doc.circle(sealX, sealY, 12);
    
    // Inner circle - gray
    doc.setDrawColor(128, 128, 128);
    doc.setLineWidth(1);
    doc.circle(sealX, sealY, 8);
    
    // Center dot - black
    doc.setFillColor(0, 0, 0);
    doc.circle(sealX, sealY, 2, "F");

    // Generate filename with safe characters
    const safeName = safeString(
      certificate.member?.user?.fullName || certificate.name || 'certificate'
    )
      .replace(/[^a-zA-Z0-9]/g, '_')
      .replace(/_+/g, '_')
      .toLowerCase();
    
    const fileName = `certificate_${safeName}_${Date.now()}.pdf`;
    
    // Try multiple download methods
    let downloadSuccess = false;
    
    try {
      doc.save(fileName);
      downloadSuccess = true;
      console.log('Download successful using doc.save()');
    } catch (saveError) {
      console.warn('doc.save() failed:', saveError);
      downloadSuccess = downloadPDFBlob(doc, fileName);
      
      if (!downloadSuccess) {
        try {
          const pdfData = doc.output('datauristring');
          const newWindow = window.open();
          newWindow.document.write(`
            <iframe 
              width='100%' 
              height='100%' 
              src='${pdfData}'
              style='border:none;'
            ></iframe>
          `);
          downloadSuccess = true;
          console.log('PDF opened in new window');
        } catch (windowError) {
          console.error('All download methods failed:', windowError);
          throw new Error('Unable to download certificate. Please try again.');
        }
      }
    }
    
    if (downloadSuccess) {
      toast.success("Certificate downloaded successfully!");
    }
    
    return { success: downloadSuccess, fileName };
    
  } catch (error) {
    console.error("Error generating certificate:", error);
    toast.error(`Failed to download certificate: ${error.message}`);
    return { success: false, error: error.message };
  } finally {
    if (setDownloadingId) {
      setDownloadingId(null);
    }
  }
};

export default downloadCertificateFunction;
