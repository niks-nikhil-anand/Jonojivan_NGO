import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product name is required'],
        trim: true,
    },
    description: {
        type: String,
        required: [true, 'Product description is required'],
    },
    price: {
        type: Number,
        required: [true, 'Product price is required'],
        min: [0, 'Price cannot be negative'],
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
    },
    stock: {
        type: Number,
        required: [true, 'Stock quantity is required'],
        min: [0, 'Stock cannot be negative'],
        default: 0,
    },
    images: [{
        url: {
            type: String,
            required: [true, 'Image URL is required'],
        },
    }],
    featuredImage: [{
        url: {
            type: String,
            required: [true, 'FeaturesImage URL is required'],
        },
    }],
    ratings: {
        average: {
            type: Number,
            default: 0,
            min: [0, 'Rating cannot be less than 0'],
            max: [5, 'Rating cannot be more than 5'],
        },
        numberOfRatings: {
            type: Number,
            default: 0,
        }
    },
    brand: {
        type: String,
    },
    sku: {
        type: String,
        unique: true,
    },
    isFeatured: {
        type: Boolean,
        default: false,
    },
    tags: [{
        type: String,
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
}, {
    timestamps: true
});

export default mongoose.models.Product || mongoose.model('Product', productSchema);
