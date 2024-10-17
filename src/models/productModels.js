import mongoose from "mongoose";

const featuredIngredientsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Color name is required'],
    },
    weightInGram: {
       tupe:String
    },
    image: {
        tupe:String
     }
});
const productHighlightsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Color name is required'],
    },
    description: {
       tupe:String
    },
    icon: {
        tupe:String
     }
});

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product name is required'],
        trim: true,
    },
    ingredients: {
        type: [featuredIngredientsSchema],
        default: undefined, // Makes the colors array optional
    },
    productHighlights: {
        type: [productHighlightsSchema],
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
    featuredImage: {
        type: String,
        required: [true, 'Featured image URL is required'],
    },
    descriptionImage: {
        type: String,
        required: [true, 'Featured image URL is required'],
    },
    images: [{
        type: String
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
    suggestedUse: {
        type: String,
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
