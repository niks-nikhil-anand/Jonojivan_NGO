"use client";
import React, { useRef, useEffect, useState } from 'react';
import { X, Download, CreditCard, RotateCcw } from 'lucide-react';
import jsPDF from 'jspdf';

const IdCardGenerator = ({ membershipData, onClose }) => {
  const frontCanvasRef = useRef(null);
  const backCanvasRef = useRef(null);
  const [showFront, setShowFront] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [logoImg, setLogoImg] = useState(null);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    let mounted = true;

    const ensureCanvasReady = () => {
      return new Promise((resolve) => {
        const checkCanvas = () => {
          if (frontCanvasRef.current && backCanvasRef.current) {
            resolve(true);
          } else {
            setTimeout(checkCanvas, 50);
          }
        };
        checkCanvas();
      });
    };

    const initializeCard = async () => {
      try {
        if (!membershipData) {
          console.error('No membership data provided');
          setIsLoading(false);
          return;
        }

        setLoadingProgress(25);
        await ensureCanvasReady();
        
        if (mounted) {
          setLoadingProgress(50);
          generateFrontCard(null);
          setLoadingProgress(75);
          generateBackCard(null);
          setLoadingProgress(100);
          setIsLoading(false);

          // Load logo separately and re-render if successful
          loadLogoAndRegenerate();
        }
      } catch (error) {
        console.error('Error initializing card:', error);
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    const loadLogoAndRegenerate = async () => {
      try {
        const logoPromise = new Promise((resolve) => {
          const img = new Image();
          const timeout = setTimeout(() => {
            resolve(null);
          }, 2000);

          img.onload = () => {
            clearTimeout(timeout);
            resolve(img);
          };

          img.onerror = () => {
            clearTimeout(timeout);
            resolve(null);
          };

          img.src = '/logo/logo.png';
        });

        const logoResult = await logoPromise;
        
        if (mounted && logoResult && frontCanvasRef.current && backCanvasRef.current) {
          setLogoImg(logoResult);
          generateFrontCard(logoResult);
          generateBackCard(logoResult);
        }
      } catch (error) {
        console.error('Logo loading error:', error);
      }
    };

    initializeCard();

    return () => {
      mounted = false;
    };
  }, [membershipData]);

  // Force complete loading after 5 seconds
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (isLoading) {
        console.log('Force completing card generation due to timeout');
        setIsLoading(false);
      }
    }, 5000);

    return () => {
      clearTimeout(timeout);
    };
  }, [isLoading]);

  const generateFrontCard = (logo) => {
    try {
      if (!frontCanvasRef.current) {
        console.error('Front canvas ref is not available');
        setIsLoading(false);
        return;
      }

      const canvas = frontCanvasRef.current;
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        console.error('Could not get canvas context');
        setIsLoading(false);
        return;
      }

      // Set canvas size (ID card dimensions)
      canvas.width = 600;
      canvas.height = 380;

      // Create beautiful blue gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#1E40AF');
      gradient.addColorStop(0.3, '#3B82F6');
      gradient.addColorStop(0.7, '#60A5FA');
      gradient.addColorStop(1, '#93C5FD');

      // Fill background
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add decorative border
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 6;
      ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);

      // Inner border with blue accent
      ctx.strokeStyle = '#1D4ED8';
      ctx.lineWidth = 2;
      ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);

      // Header section with white background
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(30, 30, canvas.width - 60, 70);

      // Add subtle shadow to header
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(32, 32, canvas.width - 64, 70);
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(30, 30, canvas.width - 60, 70);

      // Logo placement
      if (logo) {
        try {
          const logoSize = 50;
          ctx.drawImage(logo, 40, 40, logoSize, logoSize);
        } catch (error) {
          console.error('Error drawing logo:', error);
        }
      }

      // Organization name
      ctx.fillStyle = '#1E40AF';
      ctx.font = 'bold 26px Arial, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('JONOJIVAN FOUNDATION', canvas.width / 2, 55);

      ctx.font = 'bold 18px Arial, sans-serif';
      ctx.fillStyle = '#3B82F6';
      ctx.fillText('Garib Kalyan Member Card', canvas.width / 2, 80);

      // Member photo section with elegant frame
      const photoX = 40, photoY = 125, photoW = 120, photoH = 150;
      
      // Photo frame with gradient
      const photoGradient = ctx.createLinearGradient(photoX, photoY, photoX + photoW, photoY + photoH);
      photoGradient.addColorStop(0, '#E5E7EB');
      photoGradient.addColorStop(1, '#F3F4F6');
      
      ctx.fillStyle = photoGradient;
      ctx.fillRect(photoX, photoY, photoW, photoH);
      
      // Photo border
      ctx.strokeStyle = '#3B82F6';
      ctx.lineWidth = 3;
      ctx.strokeRect(photoX, photoY, photoW, photoH);

      // Photo placeholder or actual photo
      if (membershipData?.photoUpload) {
        const img = new Image();
        img.onload = () => {
          try {
            ctx.save();
            ctx.beginPath();
            ctx.rect(photoX + 3, photoY + 3, photoW - 6, photoH - 6);
            ctx.clip();
            ctx.drawImage(img, photoX + 3, photoY + 3, photoW - 6, photoH - 6);
            ctx.restore();
          } catch (error) {
            console.error('Error drawing member photo:', error);
          }
        };
        const reader = new FileReader();
        reader.onload = (e) => {
          img.src = e.target.result;
        };
        reader.readAsDataURL(membershipData.photoUpload);
      } else {
        ctx.fillStyle = '#6B7280';
        ctx.font = '14px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('MEMBER', photoX + photoW/2, photoY + photoH/2 - 10);
        ctx.fillText('PHOTO', photoX + photoW/2, photoY + photoH/2 + 10);
      }

      // Member details section with elegant styling
      const detailsX = 180;
      let yPos = 140;

      // Details background
      ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
      ctx.fillRect(detailsX - 10, 125, canvas.width - detailsX - 20, 150);
      
      // Details border
      ctx.strokeStyle = '#3B82F6';
      ctx.lineWidth = 2;
      ctx.strokeRect(detailsX - 10, 125, canvas.width - detailsX - 20, 150);

      const details = [
        { label: 'ID:', value: membershipData?.membershipId || 'N/A' },
        { label: 'Name:', value: membershipData?.memberName || 'N/A' },
        { label: 'Mobile:', value: membershipData?.contactNumber || 'N/A' },
        { label: 'Document:', value: membershipData?.documentNumber || 'N/A' },
        { label: 'Account:', value: membershipData?.accountNumber ? `****${membershipData.accountNumber.slice(-4)}` : 'N/A' },
        { label: 'Issue Date:', value: membershipData?.issueDate || new Date().toLocaleDateString('en-IN') },
        { label: 'Valid Till:', value: membershipData?.expiryDate || new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN') },
      ];

      details.forEach((detail) => {
        ctx.fillStyle = '#1E40AF';
        ctx.font = 'bold 15px Arial, sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(detail.label, detailsX, yPos);
        
        ctx.fillStyle = '#374151';
        ctx.font = '14px Arial, sans-serif';
        ctx.fillText(detail.value, detailsX + 80, yPos);
        yPos += 22;
      });

      // Footer with elegant design
      ctx.fillStyle = 'rgba(30, 64, 175, 0.9)';
      ctx.fillRect(30, canvas.height - 60, canvas.width - 60, 40);

      ctx.fillStyle = '#FFFFFF';
      ctx.font = '12px Arial, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('This card is valid for Jonojivan Garib Kalyan benefits', canvas.width / 2, canvas.height - 35);
      ctx.font = '11px Arial, sans-serif';
      ctx.fillText('Contact: +91 9435266783 | Email: csprozana@gmail.com', canvas.width / 2, canvas.height - 18);

    } catch (error) {
      console.error('Error in generateFrontCard:', error);
      setIsLoading(false);
    }
  };

  const generateBackCard = (logo) => {
    try {
      if (!backCanvasRef.current) {
        console.error('Back canvas ref is not available');
        setIsLoading(false);
        return;
      }

      const canvas = backCanvasRef.current;
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        console.error('Could not get canvas context');
        setIsLoading(false);
        return;
      }

      // Set canvas size
      canvas.width = 600;
      canvas.height = 380;

      // Create beautiful blue gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#DBEAFE');
      gradient.addColorStop(0.5, '#BFDBFE');
      gradient.addColorStop(1, '#93C5FD');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add decorative border
      ctx.strokeStyle = '#1E40AF';
      ctx.lineWidth = 6;
      ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);

      // Inner decorative elements
      ctx.strokeStyle = '#3B82F6';
      ctx.lineWidth = 2;
      ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);

      // Header section
      ctx.fillStyle = '#1E40AF';
      ctx.fillRect(30, 30, canvas.width - 60, 60);

      // Logo on back
      if (logo) {
        try {
          ctx.drawImage(logo, 40, 40, 40, 40);
        } catch (error) {
          console.error('Error drawing logo on back:', error);
        }
      }

      // Header text
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 22px Arial, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Jonojivan Garib Kalyan', canvas.width / 2, 55);
      ctx.font = 'bold 16px Arial, sans-serif';
      ctx.fillText('ID Card', canvas.width / 2, 75);

      // Content sections with better organization
      ctx.fillStyle = '#1E40AF';
      ctx.textAlign = 'left';
      
      // Left column
      let leftX = 40;
      let rightX = 320;
      let currentY = 110;

      // Card Information Section
      ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
      ctx.fillRect(30, 100, 260, 120);
      ctx.strokeStyle = '#3B82F6';
      ctx.lineWidth = 2;
      ctx.strokeRect(30, 100, 260, 120);

      ctx.fillStyle = '#1E40AF';
      ctx.font = 'bold 14px Arial, sans-serif';
      ctx.fillText('CARD INFORMATION', leftX, currentY);
      
      ctx.font = '12px Arial, sans-serif';
      ctx.fillStyle = '#374151';
      currentY += 20;
      ctx.fillText('Card Type: Free', leftX, currentY);
      currentY += 15;
      ctx.fillText('Card Validity: 11 Months', leftX, currentY);
      currentY += 20;
      
      ctx.font = '10px Arial, sans-serif';
      ctx.fillText('Usage: Strictly for Jonojivan NGO official', leftX, currentY);
      currentY += 12;
      ctx.fillText('purposes only. Not valid for personal or', leftX, currentY);
      currentY += 12;
      ctx.fillText('commercial use.', leftX, currentY);

      currentY += 20;
      ctx.font = 'bold 12px Arial, sans-serif';
      ctx.fillStyle = '#1E40AF';
      ctx.fillText('Eligibility Categories:', leftX, currentY);
      currentY += 15;
      ctx.font = '10px Arial, sans-serif';
      ctx.fillStyle = '#374151';
      ctx.fillText('• Senior Citizen  • Widow', leftX, currentY);
      currentY += 12;
      ctx.fillText('• Person with Disability (Handicap)', leftX, currentY);

      // Right column - Services and Contact
      ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
      ctx.fillRect(300, 100, 270, 120);
      ctx.strokeStyle = '#3B82F6';
      ctx.lineWidth = 2;
      ctx.strokeRect(300, 100, 270, 120);

      currentY = 110;
      ctx.fillStyle = '#1E40AF';
      ctx.font = 'bold 14px Arial, sans-serif';
      ctx.fillText('SERVICES & CONTACT', rightX, currentY);

      currentY += 20;
      ctx.font = 'bold 11px Arial, sans-serif';
      ctx.fillText('Seva Programs:', rightX, currentY);
      currentY += 15;
      ctx.font = '10px Arial, sans-serif';
      ctx.fillStyle = '#374151';
      ctx.fillText('→ Human Rights Support', rightX, currentY);
      currentY += 12;
      ctx.fillText('→ Anti-Corruption Initiatives', rightX, currentY);
      currentY += 12;
      ctx.fillText('→ Social Welfare Services', rightX, currentY);
      currentY += 12;
      ctx.fillText('→ Free Food Distribution', rightX, currentY);

      currentY += 15;
      ctx.font = 'bold 11px Arial, sans-serif';
      ctx.fillStyle = '#1E40AF';
      ctx.fillText('Office Details:', rightX, currentY);
      currentY += 12;
      ctx.font = '9px Arial, sans-serif';
      ctx.fillStyle = '#374151';
      ctx.fillText('Time: 9:00 AM - 6:00 PM', rightX, currentY);
      currentY += 10;
      ctx.fillText('Emergency: 24/7', rightX, currentY);

      // Footer section with contact information
      ctx.fillStyle = '#1E40AF';
      ctx.fillRect(30, 240, canvas.width - 60, 110);

      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 12px Arial, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('CONTACT INFORMATION', canvas.width / 2, 260);

      ctx.font = '11px Arial, sans-serif';
      ctx.textAlign = 'left';
      currentY = 275;
      ctx.fillText('Office Address: Uttar Khatowal, Rupahihat, Nagaon, Assam – 782124', 40, currentY);
      currentY += 15;
      ctx.fillText('Website: www.jonojivan.in | Email: csprozana@gmail.com', 40, currentY);
      currentY += 15;
      ctx.fillText('Phone: 9435266783 | Emergency Helpline: 8133997722', 40, currentY);

      ctx.font = 'bold 10px Arial, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Certification: ISO 9001:2015 | Emergency Services: Available 24/7', canvas.width / 2, 325);

      // Terms & Conditions
      ctx.font = '8px Arial, sans-serif';
      ctx.fillText('Terms: Card is non-transferable • Report loss immediately • Valid for genuine beneficiaries only • Misuse may result in cancellation', canvas.width / 2, 340);

    } catch (error) {
      console.error('Error in generateBackCard:', error);
      setIsLoading(false);
    }
  };

  const downloadAsPDF = () => {
    if (!frontCanvasRef.current || !backCanvasRef.current) {
      alert('ID cards are not ready yet. Please wait a moment and try again.');
      return;
    }

    try {
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: [85.6, 54]
      });

      // Front side
      const frontCanvas = frontCanvasRef.current;
      const frontImgData = frontCanvas.toDataURL('image/png');
      
      pdf.addImage(frontImgData, 'PNG', 0, 0, 85.6, 54);
      
      // Add new page for back side
      pdf.addPage();
      const backCanvas = backCanvasRef.current;
      const backImgData = backCanvas.toDataURL('image/png');
      
      pdf.addImage(backImgData, 'PNG', 0, 0, 85.6, 54);
      
      // Download the PDF
      pdf.save(`Jonojivan_ID_Card_${membershipData?.membershipId || Date.now()}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    }
  };

  const flipCard = () => {
    setShowFront(!showFront);
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8 flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <span className="text-lg font-semibold text-gray-800">Generating ID Card...</span>
          <span className="text-sm text-gray-600 mt-2">Please wait while we create your beautiful ID card</span>
          
          {/* Progress bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${loadingProgress}%` }}
            ></div>
          </div>
          <span className="text-xs text-gray-500 mt-2">{loadingProgress}% Complete</span>
          
          {/* Debug button - remove in production */}
          <button 
            onClick={() => setIsLoading(false)}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded text-sm hover:bg-red-600"
          >
            Force Complete (Debug)
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[95vh] overflow-auto">
        <div className="flex justify-between items-center p-4 sm:p-6 border-b bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex items-center gap-3">
            <CreditCard className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
            <h2 className="text-lg sm:text-2xl font-bold text-gray-900">
              Membership ID Card {showFront ? '(Front)' : '(Back)'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        <div className="p-4 sm:p-6">
          <div className="text-center mb-4 sm:mb-6">
            <p className="text-green-600 font-semibold mb-2 flex items-center justify-center gap-2">
              <span className="w-5 h-5 bg-green-500 text-white rounded-full flex items-center justify-center text-xs">✓</span>
              Your membership application has been submitted successfully!
            </p>
            <p className="text-gray-600 text-sm sm:text-base">
              Your beautiful ID card has been generated. Download as PDF with both sides included.
            </p>
          </div>

          <div className="flex justify-center mb-4 sm:mb-6">
            <div className="relative bg-gradient-to-br from-blue-100 to-indigo-100 p-4 rounded-xl shadow-lg">
              <canvas
                ref={frontCanvasRef}
                className={`border-2 border-blue-300 rounded-lg shadow-lg transition-all duration-500 transform ${
                  showFront ? 'opacity-100 scale-100' : 'opacity-0 scale-95 absolute'
                }`}
                style={{ 
                  maxWidth: '100%', 
                  height: 'auto',
                  width: '100%',
                  maxHeight: '300px'
                }}
              />
              <canvas
                ref={backCanvasRef}
                className={`border-2 border-blue-300 rounded-lg shadow-lg transition-all duration-500 transform ${
                  !showFront ? 'opacity-100 scale-100' : 'opacity-0 scale-95 absolute'
                }`}
                style={{ 
                  maxWidth: '100%', 
                  height: 'auto',
                  width: '100%',
                  maxHeight: '300px'
                }}
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-6">
            <button
              onClick={flipCard}
              disabled={isLoading}
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
              Flip Card
            </button>
            <button
              onClick={downloadAsPDF}
              disabled={isLoading}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download className="w-4 h-4 sm:w-5 sm:h-5" />
              Download PDF (Both Sides)
            </button>
            <button
              onClick={onClose}
              className="bg-gradient-to-r from-gray-500 to-gray-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold hover:from-gray-600 hover:to-gray-700 transition-all duration-300 text-sm sm:text-base shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Close
            </button>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-3 sm:p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-blue-900 mb-2 text-sm sm:text-base flex items-center gap-2">
                <CreditCard className="w-4 h-4" />
                Important Notes:
              </h3>
              <ul className="text-xs sm:text-sm text-blue-800 space-y-1">
                <li>• Keep this ID card safe for future reference</li>
                <li>• Your membership ID is: <strong>{membershipData?.membershipId || 'N/A'}</strong></li>
                <li>• This card is valid until: <strong>{membershipData?.expiryDate || 'N/A'}</strong></li>
                <li>• Contact us for any queries related to your membership</li>
              </ul>
            </div>

            <div className="p-3 sm:p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border border-green-200">
              <h3 className="font-semibold text-green-900 mb-2 text-sm sm:text-base">Emergency Contact:</h3>
              <ul className="text-xs sm:text-sm text-green-800 space-y-1">
                <li>• Office: <strong>9435266783</strong></li>
                <li>• Emergency: <strong>8133997722</strong></li>
                <li>• Email: <strong>csprozana@gmail.com</strong></li>
                <li>• Available 24/7 for emergencies</li>
              </ul>
            </div>
          </div>

          <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg">
            <h3 className="font-semibold text-yellow-900 mb-2 text-sm sm:text-base">Terms & Conditions:</h3>
            <ul className="text-xs sm:text-sm text-yellow-800 space-y-1">
              <li>• This card is strictly for Jonojivan NGO official purposes only</li>
              <li>• Not valid for personal or commercial use</li>
              <li>• Card is non-transferable and must be presented when availing services</li>
              <li>• Loss of card should be reported immediately to the office</li>
              <li>• Misuse of card may result in cancellation of membership</li>
              <li>• Valid only for genuine beneficiaries under specified categories</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdCardGenerator;
