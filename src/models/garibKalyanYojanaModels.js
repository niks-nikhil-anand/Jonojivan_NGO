const mongoose = require("mongoose");

const GaribKalyanYojanaSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Member name is required"],
      trim: true,
      minlength: [2, "Member name must be at least 2 characters long"],
      maxlength: [100, "Member name cannot exceed 100 characters"],
    },
    contactNumber: {
      type: String,
      required: [true, "Contact number is required"],
      trim: true,
      validate: {
        validator: function (v) {
          return /^\d{10}$/.test(v);
        },
        message: "Please enter a valid 10-digit phone number",
      },
    },
    documentNumber: {
      type: String,
      required: [true, "Document number is required"],
      trim: true,
      minlength: [5, "Document number must be at least 5 characters long"],
      maxlength: [50, "Document number cannot exceed 50 characters"],
    },
    accountNumber: {
      type: String,
      required: [true, "Account number is required"],
      trim: true,
      minlength: [8, "Account number must be at least 8 characters long"],
      maxlength: [20, "Account number cannot exceed 20 characters"],
    },
    referLinkIdCard: {
      type: String,
      trim: true,
      default: "",
      maxlength: [50, "Referral ID cannot exceed 50 characters"],
    },
    photoUpload: {
      type: String,
      required: [true, "Photo upload is required"],
      trim: true,
    },
    aadhaarCard: {
      type: String,
      required: [true, "Aadhaar card upload is required"],
      trim: true,
    },
    bankPassbook: {
      type: String,
      required: [true, "Bank passbook upload is required"],
      trim: true,
    },

    // Application status tracking
    applicationStatus: {
      type: String,
      enum: ["pending", "under_review", "approved", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const GaribKalyan =
  mongoose.models.GaribKalyan ||
  mongoose.model("GaribKalyan", GaribKalyanYojanaSchema);

export default GaribKalyan;
