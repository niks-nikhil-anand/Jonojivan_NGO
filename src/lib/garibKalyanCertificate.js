"use client";
import React, { useRef, useEffect, useState } from "react";
import { X, Download, CreditCard, RotateCcw, RefreshCw } from "lucide-react";
import jsPDF from "jspdf";

const IdCardGenerator = ({ membershipData, onClose }) => {
  const frontCanvasRef = useRef(null);
  const backCanvasRef = useRef(null);
  const [showFront, setShowFront] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [logoImg, setLogoImg] = useState(null);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isRegenerating, setIsRegenerating] = useState(false);

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
          console.error("No membership data provided");
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
        console.error("Error initializing card:", error);
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

          img.src = "/logo/logo.png";
        });

        const logoResult = await logoPromise;

        if (
          mounted &&
          logoResult &&
          frontCanvasRef.current &&
          backCanvasRef.current
        ) {
          setLogoImg(logoResult);
          generateFrontCard(logoResult);
          generateBackCard(logoResult);
        }
      } catch (error) {
        console.error("Logo loading error:", error);
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
        console.log("Force completing card generation due to timeout");
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
      console.error("Front canvas ref is not available");
      setIsLoading(false);
      return;
    }

    const canvas = frontCanvasRef.current;
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      console.error("Could not get canvas context");
      setIsLoading(false);
      return;
    }

    // Set canvas size
    canvas.width = 600;
    canvas.height = 380;

    // Use same blue background as back side
    ctx.fillStyle = "#3B82F6";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Header section - white background (same as back)
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(20, 20, canvas.width - 40, 60);

    // Logo on front with shadow (same as back)
    if (logo) {
      try {
        // Add shadow to logo
        ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
        ctx.shadowBlur = 8;
        ctx.shadowOffsetX = 3;
        ctx.shadowOffsetY = 3;
        ctx.drawImage(logo, 30, 30, 40, 40);

        // Reset shadow for other elements
        ctx.shadowColor = "transparent";
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
      } catch (error) {
        console.error("Error drawing logo on front:", error);
      }
    }

    // Header text - main title starts after logo, subtitle centered (same as back)
    ctx.fillStyle = "#000000";
    ctx.font = "bold 26px Arial, sans-serif";
    ctx.textAlign = "left";
    ctx.fillText("JonoJivan Gramin Vikash Foundation", 80, 48); // Left-aligned after logo

    ctx.font = "bold 18px Arial, sans-serif";
    ctx.textAlign = "center"; // Changed to center alignment
    ctx.fillText("Jonojivan Garib Kalyan ID Card", canvas.width / 2, 68); // Centered

    // Main content section - white background
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(20, 90, canvas.width - 40, 200);

    // Member photo section
    const photoX = 40,
      photoY = 110,
      photoW = 120,
      photoH = 150;

    // Photo frame
    ctx.fillStyle = "#F3F4F6";
    ctx.fillRect(photoX, photoY, photoW, photoH);

    // Photo border
    ctx.strokeStyle = "#3B82F6";
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
          console.error("Error drawing member photo:", error);
        }
      };
      const reader = new FileReader();
      reader.onload = (e) => {
        img.src = e.target.result;
      };
      reader.readAsDataURL(membershipData.photoUpload);
    } else {
      ctx.fillStyle = "#6B7280";
      ctx.font = "14px Arial";
      ctx.textAlign = "center";
      ctx.fillText("MEMBER", photoX + photoW / 2, photoY + photoH / 2 - 10);
      ctx.fillText("PHOTO", photoX + photoW / 2, photoY + photoH / 2 + 10);
    }

    // Member details section
    const detailsX = 180;
    let yPos = 125;

    ctx.fillStyle = "#000000";
    ctx.font = "bold 20px Arial, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("MEMBER INFORMATION", canvas.width / 2, yPos);

    yPos = 150;

    const details = [
      { label: "ID:", value: membershipData?.membershipId || "N/A" },
      { label: "Name:", value: membershipData?.memberName || "N/A" },
      { label: "Mobile:", value: membershipData?.contactNumber || "N/A" },
      { label: "Document:", value: membershipData?.documentNumber || "N/A" },
      {
        label: "Account:",
        value: membershipData?.accountNumber
          ? `****${membershipData.accountNumber.slice(-4)}`
          : "N/A",
      },
      {
        label: "Issue Date:",
        value:
          membershipData?.issueDate || new Date().toLocaleDateString("en-IN"),
      },
      {
        label: "Valid Till:",
        value:
          membershipData?.expiryDate ||
          new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toLocaleDateString(
            "en-IN"
          ),
      },
    ];

    ctx.font = "16px Arial, sans-serif";
    ctx.fillStyle = "#000000";
    ctx.textAlign = "left";

    details.forEach((detail) => {
      ctx.fillStyle = "#000000";
      ctx.font = "bold 14px Arial, sans-serif";
      ctx.fillText(detail.label, detailsX, yPos);

      ctx.fillStyle = "#000000";
      ctx.font = "14px Arial, sans-serif";
      ctx.fillText(detail.value, detailsX + 80, yPos);
      yPos += 18;
    });

    // Contact Information Section - white background (same as back)
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(20, 300, canvas.width - 40, 90);

    ctx.fillStyle = "#000000";
    ctx.font = "bold 12px Arial, sans-serif";
    ctx.textAlign = "center";
    let currentY = 325;

    // Updated contact information - centered and bold
    ctx.fillText(
      "Jonojivan Garib Kalyan Seva: Human Rights, Anti-Corruption, Social Welfare,",
      canvas.width / 2,
      currentY
    );
    currentY += 18;

    ctx.fillText(
      "Free Food Distribution (Bhandara).",
      canvas.width / 2,
      currentY
    );
    currentY += 25;

    // Copyright line
    ctx.font = "bold 12px Arial, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(
      "© 2025 JonoJivan Gramin Vikash Foundation . All Rights Reserved.",
      canvas.width / 2,
      currentY
    );
  } catch (error) {
    console.error("Error in generateFrontCard:", error);
    setIsLoading(false);
  }
};



  const generateBackCard = (logo) => {
    try {
      if (!backCanvasRef.current) {
        console.error("Back canvas ref is not available");
        setIsLoading(false);
        return;
      }

      const canvas = backCanvasRef.current;
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        console.error("Could not get canvas context");
        setIsLoading(false);
        return;
      }

      // Set canvas size
      canvas.width = 600;
      canvas.height = 380;

      // Use blue background
      ctx.fillStyle = "#3B82F6";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Header section - white background
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(20, 20, canvas.width - 40, 60);

      // Logo on back with shadow
      if (logo) {
        try {
          // Add shadow to logo
          ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
          ctx.shadowBlur = 8;
          ctx.shadowOffsetX = 3;
          ctx.shadowOffsetY = 3;
          ctx.drawImage(logo, 30, 30, 40, 40);

          // Reset shadow for other elements
          ctx.shadowColor = "transparent";
          ctx.shadowBlur = 0;
          ctx.shadowOffsetX = 0;
          ctx.shadowOffsetY = 0;
        } catch (error) {
          console.error("Error drawing logo on back:", error);
        }
      }

      // Header text - main title starts after logo, subtitle centered
      ctx.fillStyle = "#000000";
      ctx.font = "bold 26px Arial, sans-serif";
      ctx.textAlign = "left";
      ctx.fillText("JonoJivan Gramin Vikash Foundation", 80, 48); // Left-aligned after logo

      ctx.font = "bold 18px Arial, sans-serif";
      ctx.textAlign = "center"; // Changed to center alignment
      ctx.fillText("Jonojivan Garib Kalyan ID Card", canvas.width / 2, 68); // Centered

      // Card Information Section
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(20, 90, canvas.width - 40, 200);

      ctx.fillStyle = "#000000";
      ctx.font = "bold 20px Arial, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("CARD INFORMATION", canvas.width / 2, 115);

      ctx.font = "16px Arial, sans-serif";
      ctx.fillStyle = "#000000";
      ctx.textAlign = "left";

      let currentY = 140;
      ctx.fillText("Card Type: Free", 35, currentY);
      currentY += 20;
      ctx.fillText("Validity: 11 Months", 35, currentY);

      currentY += 25;
      ctx.font = "bold 14px Arial, sans-serif";
      ctx.fillStyle = "#000000";
      ctx.fillText("Usage:", 35, currentY);
      currentY += 18;

      // Usage with bullet points and increased line height
      ctx.font = "14px Arial, sans-serif";
      ctx.fillStyle = "#000000";
      ctx.fillText(
        "• This card is strictly for Jonojivan NGO official purposes only.",
        35,
        currentY
      );
      currentY += 18;
      ctx.fillText(
        "• It is non-transferable; loss must be reported immediately, and",
        35,
        currentY
      );
      currentY += 18;
      ctx.fillText("  misuse may lead to cancellation.", 35, currentY);
      currentY += 18;
      ctx.fillText("• Only genuine beneficiaries are eligible —", 35, currentY);
      currentY += 18;
      ctx.fillText(
        "  including Senior Citizens, Widows, and Persons with Disabilities.",
        35,
        currentY
      );

      // Contact Information Section - white background with increased height
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(20, 300, canvas.width - 40, 90); // Increased height from 70 to 90 to accommodate copyright

      ctx.fillStyle = "#000000";
      ctx.font = "bold 12px Arial, sans-serif";
      ctx.textAlign = "left";
      currentY = 320;

      // First line of contact information
      ctx.fillText(
        "Office: Uttar Khatowal, Rupahihat, Nagaon, Assam – 782124 | www.jonojivan.in",
        35,
        currentY
      );
      currentY += 18;

      // Second line of contact information
      ctx.fillText(
        "Contact: Mobile: 9435266783 | Emergency: 8133997722 | ISO: 9001:2015 | Support: 24/7",
        35,
        currentY
      );
      currentY += 20;

      // Copyright line
      ctx.font = "bold 12px Arial, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(
        "© 2025 JonoJivan Gramin Vikash Foundation . All Rights Reserved.",
        canvas.width / 2,
        currentY
      );
    } catch (error) {
      console.error("Error in generateBackCard:", error);
      setIsLoading(false);
    }
  };

  const regenerateCard = async () => {
    setIsRegenerating(true);
    setLoadingProgress(0);

    try {
      setLoadingProgress(25);

      // Clear canvases
      if (frontCanvasRef.current) {
        const ctx = frontCanvasRef.current.getContext("2d");
        ctx.clearRect(
          0,
          0,
          frontCanvasRef.current.width,
          frontCanvasRef.current.height
        );
      }
      if (backCanvasRef.current) {
        const ctx = backCanvasRef.current.getContext("2d");
        ctx.clearRect(
          0,
          0,
          backCanvasRef.current.width,
          backCanvasRef.current.height
        );
      }

      setLoadingProgress(50);

      // Regenerate cards
      await new Promise((resolve) => setTimeout(resolve, 500)); // Small delay for visual feedback
      generateFrontCard(logoImg);

      setLoadingProgress(75);
      generateBackCard(logoImg);

      setLoadingProgress(100);

      // Show success feedback
      setTimeout(() => {
        setIsRegenerating(false);
        setLoadingProgress(0);
      }, 500);
    } catch (error) {
      console.error("Error regenerating card:", error);
      setIsRegenerating(false);
      setLoadingProgress(0);
    }
  };

  const downloadAsPDF = () => {
    if (!frontCanvasRef.current || !backCanvasRef.current) {
      alert("ID cards are not ready yet. Please wait a moment and try again.");
      return;
    }

    try {
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: [85.6, 54],
      });

      // Front side
      const frontCanvas = frontCanvasRef.current;
      const frontImgData = frontCanvas.toDataURL("image/png");

      pdf.addImage(frontImgData, "PNG", 0, 0, 85.6, 54);

      // Add new page for back side
      pdf.addPage();
      const backCanvas = backCanvasRef.current;
      const backImgData = backCanvas.toDataURL("image/png");

      pdf.addImage(backImgData, "PNG", 0, 0, 85.6, 54);

      // Download the PDF
      pdf.save(
        `Jonojivan_ID_Card_${membershipData?.membershipId || Date.now()}.pdf`
      );
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Error generating PDF. Please try again.");
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
          <span className="text-lg font-semibold text-gray-800">
            Generating ID Card...
          </span>
          <span className="text-sm text-gray-600 mt-2">
            Please wait while we create your beautiful ID card
          </span>

          {/* Progress bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${loadingProgress}%` }}
            ></div>
          </div>
          <span className="text-xs text-gray-500 mt-2">
            {loadingProgress}% Complete
          </span>

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
              Jonojivan Garib Kalyan ID Card {showFront ? "(Front)" : "(Back)"}
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
              <span className="w-5 h-5 bg-green-500 text-white rounded-full flex items-center justify-center text-xs">
                ✓
              </span>
              Your application has been submitted successfully!
            </p>
            <p className="text-gray-600 text-sm sm:text-base">
              Your beautiful ID card has been generated. Download as PDF with
              both sides included.
            </p>
          </div>

          <div className="flex justify-center mb-4 sm:mb-6">
            <div className="relative bg-gradient-to-br from-blue-100 to-indigo-100 p-4 rounded-xl shadow-lg">
              {isRegenerating && (
                <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center rounded-xl z-10">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                    <span className="text-sm font-medium text-gray-700">
                      Regenerating...
                    </span>
                    <div className="w-32 bg-gray-200 rounded-full h-2 mt-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${loadingProgress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
              <canvas
                ref={frontCanvasRef}
                className={`border-2 border-blue-300 rounded-lg shadow-lg transition-all duration-500 transform ${
                  showFront
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-95 absolute"
                }`}
                style={{
                  maxWidth: "100%",
                  height: "auto",
                  width: "100%",
                  maxHeight: "300px",
                }}
              />
              <canvas
                ref={backCanvasRef}
                className={`border-2 border-blue-300 rounded-lg shadow-lg transition-all duration-500 transform ${
                  !showFront
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-95 absolute"
                }`}
                style={{
                  maxWidth: "100%",
                  height: "auto",
                  width: "100%",
                  maxHeight: "300px",
                }}
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-6">
            <button
              onClick={flipCard}
              disabled={isLoading || isRegenerating}
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
              Flip Card
            </button>

            <button
              onClick={regenerateCard}
              disabled={isLoading || isRegenerating}
              className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RefreshCw
                className={`w-4 h-4 sm:w-5 sm:h-5 ${
                  isRegenerating ? "animate-spin" : ""
                }`}
              />
              {isRegenerating ? "Regenerating..." : "Generate Again"}
            </button>

            <button
              onClick={downloadAsPDF}
              disabled={isLoading || isRegenerating}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download className="w-4 h-4 sm:w-5 sm:h-5" />
              Download as PDF (Both Sides)
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
                <li>
                  • Your membership ID is:{" "}
                  <strong>{membershipData?.membershipId || "N/A"}</strong>
                </li>
                <li>
                  • This card is valid until:{" "}
                  <strong>{membershipData?.expiryDate || "N/A"}</strong>
                </li>
                <li>• Contact us for any queries related to your membership</li>
              </ul>
            </div>

            <div className="p-3 sm:p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border border-green-200">
              <h3 className="font-semibold text-green-900 mb-2 text-sm sm:text-base">
                Emergency Contact:
              </h3>
              <ul className="text-xs sm:text-sm text-green-800 space-y-1">
                <li>
                  • Office: <strong>9435266783</strong>
                </li>
                <li>
                  • Emergency: <strong>8133997722</strong>
                </li>
                <li>
                  • Email: <strong>csprozana@gmail.com</strong>
                </li>
                <li>• Available 24/7 for emergencies</li>
              </ul>
            </div>
          </div>

          <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg">
            <h3 className="font-semibold text-yellow-900 mb-2 text-sm sm:text-base">
              Terms & Conditions:
            </h3>
            <ul className="text-xs sm:text-sm text-yellow-800 space-y-1">
              <li>
                • This card is strictly for Jonojivan NGO official purposes only
              </li>
              <li>• Not valid for personal or commercial use</li>
              <li>
                • Card is non-transferable and must be presented when availing
                services
              </li>
              <li>
                • Loss of card should be reported immediately to the office
              </li>
              <li>• Misuse of card may result in cancellation of membership</li>
              <li>
                • Valid only for genuine beneficiaries under specified
                categories
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdCardGenerator;
