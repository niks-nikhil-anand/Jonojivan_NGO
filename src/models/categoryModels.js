const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the schema for Terms and Conditions
const categorySchema = new Schema(
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
    subcategories: [
      {
        name: {
          type: String,
          required: true,
        },
        image: {
          type: String,
          default: '',
        },
      }
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Category || mongoose.model('Category', categorySchema);
