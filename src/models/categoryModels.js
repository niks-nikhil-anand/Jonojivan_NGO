const mongoose = require('mongoose');
const { Schema } = mongoose;


// Define the schema for Category
const categorySchema = new Schema(
  {
    name: {
      type: String,
    },
    image: {
      type: String,
    },
    
    subcategories: [
      {
        name: {
          type: String,
          required: true,
        },
        image: {
          type: String,
          required: true,
        },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Export the models with default export
export default mongoose.models.Category || mongoose.model('Category', categorySchema);

