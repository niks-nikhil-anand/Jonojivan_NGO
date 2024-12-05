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
   
  },
  panCardNumber: {
    type: String,
    trim: true,
  },
  phoneNumber: {
    type: String,
    trim: true,
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
