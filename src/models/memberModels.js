import mongoose from "mongoose";

const memberSchema = new mongoose.Schema(
  {
    // Reference to User model
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User reference is required"],
    },

    // Personal Details
    gender: {
      type: String,
      required: [true, "Gender is required"],
      enum: ["male", "female", "other"],
    },
    whatsappNumber: {
      type: String,
      trim: true,
    },
    adhaarNumber: {
      type: String,
      required: [true, "Adhaar number is required"],
      unique: true,
      trim: true,
    },
    guardianName: {
      type: String,
      required: [true, "Guardian name is required"],
      trim: true,
    },
    guardianMobile: {
      type: String,
      required: [true, "Guardian mobile number is required"],
      trim: true,
    },
    maritalStatus: {
      type: String,
      required: [true, "Marital status is required"],
      enum: ["single", "married", "divorced", "widowed"],
    },

    // Address Details
    address: {
      type: String,
      required: [true, "Address is required"],
      trim: true,
    },
    country: {
      type: String,
      default: "India",
      trim: true,
    },
    state: {
      type: String,
      required: [true, "State is required"],
      trim: true,
    },
    district: {
      type: String,
      required: [true, "District is required"],
      trim: true,
    },
    pincode: {
      type: String,
      required: [true, "Pincode is required"],
      trim: true,
    },

    // Joining Details
    committee: {
      type: String,
      required: [true, "Committee is required"],
      enum: [
        "Executive Committee",
        "National Committee",
        "State Committee",
        "Mandal Committee",
        "District Committee",
        "Tehsil Committee",
        "Block Committee",
        "Board of Guardians",
        "Member",
        "Chairman",
      ],
    },
    subCommittee: {
      type: String,
      required: [true, "Sub committee is required"],
      enum: ["Main Body", "National Body", "State Body", "District Body" , "Sub Body"],
    },
    joiningState: {
      type: String,
      required: [true, "Joining state is required"],
      trim: true,
    },
    post: {
      type: String,
      required: [true, "Post is required"],
      enum : [
  "Area District Manager",
  "Assistant Event Manager",
  "Assistant Manager",
  "Associate Public Relations Head",
  "Chairman",
  "Co Media In Charge",
  "Co-Convener",
  "Co-head of Training",
  "Committee President",
  "Committee Puyun",
  "Convener",
  "District Manager",
  "Event Manager",
  "Executive Member",
  "Financier",
  "General",
  "General Secretary",
  "IT Manager",
  "Legal Adviser",
  "Media In Charge",
  "Member",
  "Nagar Chairman",
  "Public Relations Head",
  "Secretary",
  "Spokesperson",
  "Team Manager",
  "Team Service Manager",
  "Training Manager",
  "Vice Chairman",

  // Human Rights Committee
  "HUMAN RIGHTS COMMITTEE PRESIDENT",
  "HUMAN RIGHTS COMMITTEE SECRETARY",
  "HUMAN RIGHTS COMMITTEE MEMBER",

  // Anti-Corruption Committee
  "ANTI CORRUPTION COMMITTEE PRESIDENT",
  "ANTI CORRUPTION COMMITTEE SECRETARY",
  "ANTI CORRUPTION COMMITTEE MEMBER",

  // School Committee
  "SCHOOL COMMITTEE PRESIDENT",
  "SCHOOL COMMITTEE SECRETARY",
  "SCHOOL COMMITTEE MEMBER",

  // Social Welfare Committee
  "SOCIAL WELFARE COMMITTEE PRESIDENT",
  "SOCIAL WELFARE COMMITTEE SECRETARY",
  "SOCIAL WELFARE MEMBER",

  // Sarva Shiksha
  "SARVA SHIKSHA SCHOOL TEACHER",
  "SARVA SHIKSHA SCHOOL STUDENT",

  // Nari Shakti Group
  "NARI SHAKTI GROUP PRESIDENT",
  "NARI SHAKTI GROUP SECRETARY",
  "NARI SHAKTI GROUP MEMBER",

  // Garib Kalyan Seva Committee
  "GARIB KALYAN SEVA COMMITTEE PRESIDENT",
  "GARIB KALYAN SEVA COMMITTEE SECRETARY",
  "GARIB KALYAN SEVA COMMITTEE MEMBER",
]},
    supportingAmount: {
      type: Number,
      required: [true, "Supporting amount is required"],
      min: [0, "Supporting amount cannot be negative"],
    },

    // Profile Image
    profileImage: {
      type: String,
      default: "",
    },

    membershipStatus: {
      type: String,
      enum: ["Pending", "Active", "Suspended", "Inactive"],
      default: "Pending",
    },
    membershipId: {
      type: String,
      unique: true,
    },

    // Registration Date
    registrationDate: {
      type: Date,
      default: Date.now,
    },

    // Approval Details
    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    approvedAt: {
      type: Date,
      default: null,
    },

    // Payment Status
    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Partial", "Failed"],
      default: "Pending",
    },

    // Additional Notes
    notes: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);


export default mongoose.models.Member || mongoose.model("Member", memberSchema);
