import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    member: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member",
    },
    email: {
      type: String,
    },
    category: {
      enum: ["Achievement", "Participation", "Excellence"],
    },
    status: {
      type: String,
      enum: ["Draft", "Active", "Blocked", "Pending"],
      default: "Draft",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Certificate ||
  mongoose.model("Certificate", certificateSchema);
