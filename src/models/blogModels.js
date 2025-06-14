import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  featuredImage: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
}, {
  timestamps: true
});


export const Blog = mongoose.models.Blog || mongoose.model("Blog" , blogSchema)



