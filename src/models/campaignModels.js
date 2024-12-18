import mongoose from "mongoose";

const CampaignSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    image:{
      type: String,
    },

    goal: {
      type: Number,
      required: true,
      min: 0,
    },
    raised: {
      type: Number,
      default: 0,
      min: 0,
      validate: {
        validator: function (value) {
          return value <= this.goal;
        },
        message: "Raised amount cannot exceed the goal amount.",
      },
    },
  },
  {
    timestamps: true, 
  }
);

// Virtual for progress
CampaignSchema.virtual("progress").get(function () {
  return this.goal > 0 ? (this.raised / this.goal) * 100 : 0;
});

module.exports = mongoose.models.Campaign || mongoose.model("Campaign", CampaignSchema);
