import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    nameOfAddressHolder: {
        type: String,
        required: [true, 'Name of the address holder is required'], // Added a required field with a custom message
    },
    streetAddress: {
        type: String,
    },
    email:{
        type: String,
        required: [true, 'Email is required'],
        match: [/.+\@.+\..+/, 'Please provide a valid email address'],
        unique: true,
        lowercase: true,
        trim: true,
    },
    state: {
        type: String,
        required: [true, 'State is required'],
    },
    city: {
        type: String,
        required: [true, 'City is required'],
    },
    pinCode: {
        type: String,
        required: [true, 'Pin Code is required'], 
    },
    landmark: {
        type: String,
    },
    typeOfAddress: {
        type: String,
        enum: ['Home', 'Work'],
        default: 'Home',
    },
    User:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
}, {
    timestamps: true
});

export default mongoose.models.Address || mongoose.model('Address', addressSchema);
