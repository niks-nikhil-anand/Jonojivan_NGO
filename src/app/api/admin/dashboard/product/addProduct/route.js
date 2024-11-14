const mongoose = require("mongoose");
import connectDB from "@/lib/dbConnect";
import uploadImage from "@/lib/uploadImages";
import categoryModels from "@/models/categoryModels";
import productModels from "@/models/productModels";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    await connectDB();

    const formData = await req.formData();

    // Helper function to safely get and trim values
    const getTrimmedValue = (key) => {
      const value = formData.get(key);
      return value ? value.trim() : '';
    };

    const name = getTrimmedValue("name");
    const description = getTrimmedValue("description");
    const salePrice = getTrimmedValue("salePrice");
    const originalPrice = getTrimmedValue("originalPrice");
    const category = getTrimmedValue("category");
    const subCategory = formData.get("subcategories");  
    const stock = parseInt(getTrimmedValue("stock"), 10);
    const tags = getTrimmedValue("tags");
    const isFanFavourites = formData.get("isFanFavourites") === 'true';
    const isOnSale = formData.get("isOnSale") === 'true';
    const weight = getTrimmedValue("weight");
    const unit = getTrimmedValue("unit");

    if (!name || !category) {
      return NextResponse.json({ msg: "Please provide all the required fields." }, { status: 400 });
    }

    const images = formData.getAll("images");
    const featuredImage = formData.get("featuredImage");

    // Log image uploads
    console.log("Uploading images...");
    const imageUploads = await Promise.all(
      images.map(async (image) => {
        const result = await uploadImage(image, "productImages");
        if (!result.secure_url) {
          throw new Error("Image upload failed.");
        }
        return result.secure_url;
      })
    );

    // Upload featured image
    let featuredImageUrl = null;
    if (featuredImage) {
      const featuredImageResult = await uploadImage(featuredImage, "featuredImage");
      if (!featuredImageResult.secure_url) {
        return NextResponse.json({ msg: "Featured image upload failed." }, { status: 500 });
      }
      featuredImageUrl = featuredImageResult.secure_url;
    }

   

    // Construct product data
    const productData = {
      name,
      description,
      salePrice,
      originalPrice,
      category,
      subCategory,  
      stock,
      isFanFavourites,
      isOnSale,
      tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
      images: imageUploads,
      featuredImage: featuredImageUrl,
      weight: {
        value: weight,  
        unit: unit,    
      },
    };

    console.log("Final product data:", productData);
    const newProduct = await productModels.create(productData);

    console.log("Subcategory data found:", category);
    console.log("Subcategory array length:", subCategory.length);
    console.log("Category data found:", subCategory[0][0]);



    // Step 1: Find the category based on the provided category ID
const categoryData = await categoryModels.findById(category).populate('subcategories.product');
if (!categoryData) {
  console.log("Category not found:", category);
  return NextResponse.json({ msg: "Category not found." }, { status: 400 });
}

console.log("Category data found:", categoryData);

// Step 2: Check if subCategory is an array or single ID
const subCategoryId = Array.isArray(subCategory) ? subCategory[0] : subCategory;
console.log("Using subcategory ID:", subCategoryId);

if (!mongoose.Types.ObjectId.isValid(subCategoryId)) {
  console.log("Invalid subcategory ID:", subCategoryId);
  return NextResponse.json({ msg: "Invalid subcategory ID." }, { status: 400 });
}

// Step 3: Find the subcategory inside the category
const subCategoryData = categoryData.subcategories.find(subcat => 
  subcat._id.toString() === subCategoryId.toString()
);

if (!subCategoryData) {
  console.log("Subcategory not found for ID:", subCategoryId);
  return NextResponse.json({ msg: "Subcategory not found." }, { status: 400 });
}

console.log("Subcategory data found:", subCategoryData);

// Step 4: Add the product ID to the subcategory's product array
// Step 5: Add the product ID to the subcategory's product array
if (subCategoryData.product) {
  subCategoryData.product.push(newProduct._id);
  console.log("Adding product ID to subcategory's product array:", newProduct._id);
} else {
  console.log("Subcategory 'product' array not found, initializing it.");
  subCategoryData.product = [newProduct._id]; // If product array doesn't exist, initialize it
}

console.log("Adding product ID to subcategory's product array:", newProduct._id);

// Step 5: Save the category with the updated subcategory
await categoryData.save();
console.log("Category data saved with updated subcategory:", categoryData);

    
    return NextResponse.json({ msg: "Product added successfully", product: newProduct }, { status: 200 });
  } catch (error) {
    console.error("Error adding product:", error);  // More detailed error logging
    return NextResponse.json({ msg: "Error adding product", error: error.message }, { status: 500 });
  }
};
