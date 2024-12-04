const mongoose = require('mongoose');

const DonationSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      "Please provide a valid email address",
    ],
  },
  panCardNumber: {
    type: String,
    trim: true,
    match: [/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Please provide a valid PAN card number"],
  },
  phoneNumber: {
    type: String,
    trim: true,
    match: [/^\d{10}$/, "Please provide a valid 10-digit phone number"],
  },
  amount: {
    type: Number,
    required: true,
    min: [1, "Amount must be greater than 0"],
    default: 1000, // Default donation amount
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: ["Online", "Offline", "TestDonation"], // Allowed payment methods
    default: "Online",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Donation = mongoose.models.Donation || mongoose.model('Donation', DonationSchema);


export default Donation;
