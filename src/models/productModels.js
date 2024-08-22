import mongoose from "mongoose";

const colorSchema = new mongoose.Schema({
    colorName: {
        type: String,
        required: [true, 'Color name is required'],
    },
    stock: {
        type: Number,
        required: [true, 'Stock quantity is required'],
        min: [0, 'Stock cannot be negative'],
        default: 0,
    }
});

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product name is required'],
        trim: true,
    },
    colors: {
        type: [colorSchema],
        default: undefined, // Makes the colors array optional
    },
    stock: {
        type: Number,
        required: function () {
            return !this.colors || this.colors.length === 0;
        },
        min: [0, 'Stock cannot be negative'],
        default: 0,
    },
    description: {
        type: String,
        required: [true, 'Product description is required'],
    },
    actualPrice: {
        type: Number,
        required: [true, 'Product price is required'],
        min: [0, 'Price cannot be negative'],
    },
    originalPrice: {
        type: Number,
        required: [true, 'Product price is required'],
        min: [0, 'Price cannot be negative'],
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
    },
    images: [{
        url: {
            type: String,
            required: [true, 'Image URL is required'],
        },
    }],
    featuredImage: {
        type: String,
        required: [true, 'Featured image URL is required'],
    },
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
    isOnSale: {
        type: Boolean,
        default: false,
    },
    tags: [{
        type: String,
    }],
}, {
    timestamps: true
});

export default mongoose.models.Product || mongoose.model('Product', productSchema);
