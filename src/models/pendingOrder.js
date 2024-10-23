const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the PendingOrder schema
const pendingOrderSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart', 
        required: true,
    },
    address: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address', // Reference to the Address model
        required: true,
    },
    isCheckoutCompleted: {
        type: Boolean,
        default: false, // True when checkout is completed
    },
    isDeliveryConfirmed: {
        type: Boolean,
        default: false, // True when delivery details are confirmed
    },
    isPaymentCompleted: {
        type: Boolean,
        default: false, // True when payment is completed
    },
    orderStatus: {
        type: String,
        enum: ['Pending', 'Failed', 'Completed'],
        default: 'Pending', 
    },
},{
    timestamps: true
});



export default mongoose.models.PendingOrder || mongoose.model('PendingOrder', pendingOrderSchema);
