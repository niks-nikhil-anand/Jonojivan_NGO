import connectDB from "@/lib/dbConnect";
import uploadImage from "@/lib/uploadImages";
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
    const subcategories = formData.get("subcategories");  // Handle subcategories
    const stock = parseInt(getTrimmedValue("stock"), 10);
    const tags = getTrimmedValue("tags");
    const isFanFavourites = formData.get("isFanFavourites") === 'true';
    const isOnSale = formData.get("isOnSale") === 'true';

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
      subcategories,  
      stock,
      isFanFavourites,
      isOnSale,
      tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
      images: imageUploads,
      featuredImage: featuredImageUrl,
    };

    console.log("Final product data:", productData);

    // Create product in database
    // await productModels.create(productData);
    return NextResponse.json({ msg: "Product added successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error adding product:", error);  // More detailed error logging
    return NextResponse.json({ msg: "Error adding product", error: error.message }, { status: 500 });
  }
};
