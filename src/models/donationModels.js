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
    default: 1000, 
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: ["Online", "Offline", "TestDonation"], // Allowed payment methods
    default: "Online",
  },
  razorpay_order_id: {
    type: String,
    trim: true,
  },
  razorpay_payment_id: {
    type: String,
    trim: true,
  },
  Campaign:{
     type: mongoose.Schema.Types.ObjectId,
    ref: 'Campaign',
  }
},{
  timestamps:true
});

const Donation = mongoose.models.Donation || mongoose.model('Donation', DonationSchema);


export default Donation;
