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
        required: true,
    },
    items: [cartItemSchema],
    totalPrice: {
        type: Number,
        required: true,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

// Update `updatedAt` field before saving
cartSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});


export default mongoose.models.Cart || mongoose.model('Cart' , cartItemSchema)


