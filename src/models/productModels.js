import mongoose from "mongoose";

const featuredIngredientsSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    description:{
        type: String,
    },
    weightInGram: {
       type:String
    },
    image: {
        type:String
     }
});
const productHighlightsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Color name is required'],
    },
    description: {
       type:String
    },
    icon: {
        type:String
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
    },
    productHighlights: {
        type: [productHighlightsSchema],
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
    salePrice: {
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
    servingPerBottle:{
        type: String,
    },
    isFanFavourites: {
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
