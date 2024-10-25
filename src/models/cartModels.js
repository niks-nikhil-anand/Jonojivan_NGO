// cartModels.js

const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the CartItem schema
const cartItemSchema = new Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
    },
    price: {
        type: Number,
        required: true,
    },
}, { _id: false }); 

const cartSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    items: {
        type: [cartItemSchema],
        default: [], 
    },
    
} ,{ 
    timestamps: true // Automatically adds createdAt and updatedAt
});

export default mongoose.models.Cart || mongoose.model('Cart', cartSchema);
