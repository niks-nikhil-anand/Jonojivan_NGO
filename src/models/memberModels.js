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
      enum: ["Main Body", "Women's Front", "Youth Front", "Minority Front"],
    },
    joiningState: {
      type: String,
      required: [true, "Joining state is required"],
      trim: true,
    },
    post: {
      type: String,
      required: [true, "Post is required"],
      enum: [
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
      ],
    },
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

    // Membership ID (auto-generated)
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

// Pre-save middleware to generate membership ID
memberSchema.pre("save", async function (next) {
  if (this.isNew && !this.membershipId) {
    const count = await mongoose.model("Member").countDocuments();
    const year = new Date().getFullYear();
    this.membershipId = `JJF${year}${String(count + 1).padStart(6, "0")}`;
  }
  next();
});
// Virtual for full member details with user info
memberSchema.virtual("fullDetails", {
  ref: "User",
  localField: "user",
  foreignField: "_id",
  justOne: true,
});

// Ensure virtual fields are serialized
memberSchema.set("toJSON", { virtuals: true });
memberSchema.set("toObject", { virtuals: true });

export default mongoose.models.Member || mongoose.model("Member", memberSchema);
