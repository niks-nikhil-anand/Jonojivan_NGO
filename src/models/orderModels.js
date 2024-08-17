import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    nameOfAddressHolder: {
        type: String,
        required: [true, 'Name of the address holder is required'], // Added a required field with a custom message
    },
    streetAddress: {
        type: String,
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
        required: [true, 'Pin Code is required'], // Added a required field with a custom message
    },
    landmark: {
        type: String,
    },
    typeOfAddress: {
        type: String,
        enum: ['Home', 'Work'],
        default: 'Home',
    },
    default: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true
});

export default mongoose.models.Order || mongoose.model('Order', orderSchema);
