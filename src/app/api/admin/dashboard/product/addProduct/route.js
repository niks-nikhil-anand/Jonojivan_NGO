import connectDB from "@/lib/dbConnect";
import uploadImage from "@/lib/uploadImages";
import productModels from "@/models/productModels";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    console.log("Connecting to the database...");
    await connectDB();
    console.log("Connected to the database.");

    const formData = await req.formData();
    console.log("Form data received.");

    const name = formData.get("name");
    const description = formData.get("description");
    const price = formData.get("price");
    const actualPrice = formData.get("actualPrice"); // Updated to actualPrice
    const finalPrice = formData.get("finalPrice");   // Added finalPrice
    const category = formData.get("category");
    const stock = formData.get("stock");
    const brand = formData.get("brand");
    const sku = formData.get("sku");
    const isFeatured = formData.get("isFeatured") === "true";
    const isOnSale = formData.get("isOnSale") === "true";
    const tags = JSON.parse(formData.get("tags") || '[]');
    
    // Parsing colors and images from FormData
    const colors = JSON.parse(formData.get("colors") || '[]');
    const images = JSON.parse(formData.get("images") || '[]');

    const featuredImage = formData.get("featuredImage");
    console.log(stock)
    console.log(images)

    // Handle featured image upload
    let featuredImageUrl = '';
    if (featuredImage && featuredImage instanceof File) {
      console.log("Uploading featured image...");
      const featuredImageResult = await uploadImage(featuredImage, "productImages");
      if (!featuredImageResult.secure_url) {
        console.error("Featured image upload failed.");
        return NextResponse.json({ msg: "Featured image upload failed." }, { status: 500 });
      }
      featuredImageUrl = featuredImageResult.secure_url;
      console.log("Featured image uploaded successfully:", featuredImageUrl);
    } else {
      console.log("No featured image provided or invalid file.");
    }

    // Handle additional images upload
    let additionalImagesUrls = [];
    for (const image of images) {
      if (image instanceof File) {
        console.log("Uploading additional image...");
        const imageResult = await uploadImage(image, "productImages");
        if (imageResult.secure_url) {
          additionalImagesUrls.push(imageResult.secure_url);
          console.log("Additional image uploaded successfully:", imageResult.secure_url);
        } else {
          console.error("Image upload failed for:", image);
          return NextResponse.json({ msg: "Image upload failed." }, { status: 500 });
        }
      } else {
        console.log("Invalid image file:", image);
      }
    }

    // Prepare product data
    const productData = {
      name,
      description,
      price: parseFloat(price),
      originalPrice: parseFloat(actualPrice), // Renamed to match actualPrice
      finalPrice: parseFloat(finalPrice),
      category,
      stock: parseInt(stock, 10) || 0, // Convert stock to number
      brand,
      sku,
      isFeatured,
      isOnSale,
      tags,
      colors,
      images: additionalImagesUrls,
      featuredImage: featuredImageUrl
    };

    console.log("Product data to be saved:", productData);

    await productModels.create(productData);
    console.log("Product added successfully.");
    return NextResponse.json({ msg: "Product added successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error adding product:", error);
    return NextResponse.json({ msg: "Error adding product", error: error.message }, { status: 500 });
  }
};

export const GET = async (req) => {
  try {
    console.log("Connecting to the database...");
    await connectDB();
    console.log("Connected to the database.");

    const products = await productModels.find();
    console.log("Fetched products:", products);
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ msg: "Error fetching products", error: error.message }, { status: 500 });
  }
};
