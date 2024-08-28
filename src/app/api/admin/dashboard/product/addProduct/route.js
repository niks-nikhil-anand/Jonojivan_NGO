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
    console.log("Form data received:", formData);

    // Helper function to safely get and trim values
    const getTrimmedValue = (key) => {
      const value = formData.get(key);
      return value ? value.trim() : '';
    };

    const name = getTrimmedValue("name");
    const description = getTrimmedValue("description");
    const actualPrice = getTrimmedValue("actualPrice");
    const originalPrice = getTrimmedValue("originalPrice");
    const category = getTrimmedValue("category");
    const stock = parseInt(getTrimmedValue("stock"), 10);
    const colors = formData.get("colors"); // Colors is a JSON string
    const brand = getTrimmedValue("brand");
    const sku = getTrimmedValue("sku");
    const isFeatured = formData.get("isFeatured") === 'true';
    const isOnSale = formData.get("isOnSale") === 'true';
    const tags = getTrimmedValue("tags");

    console.log("Extracted fields:", {
      name,
      description,
      actualPrice,
      originalPrice,
      category,
      stock,
      colors,
      brand,
      sku,
      isFeatured,
      isOnSale,
      tags
    });

    if (!name || !category) {
      console.error("Missing required fields.");
      return NextResponse.json({ msg: "Please provide all the required fields." }, { status: 400 });
    }

    const images = formData.getAll("images");
    const featuredImage = formData.get("featuredImage");

    console.log("Images received:", images);
    console.log("Featured image received:", featuredImage);

    const imageUploads = await Promise.all(
      images.map(async (image, index) => {
        console.log(`Uploading image ${index + 1}...`);
        const result = await uploadImage(image, "productImages");
        console.log(`Image ${index + 1} upload result:`, result);
        if (!result.secure_url) {
          console.error("Image upload failed.");
          throw new Error("Image upload failed.");
        }
        return result.secure_url;
      })
    );

    console.log("Image URLs uploaded:", imageUploads);

    let featuredImageUrl = null;
    if (featuredImage) {
      console.log("Uploading featured image...");
      const featuredImageResult = await uploadImage(featuredImage, "featuredImage");
      console.log("Featured image upload result:", featuredImageResult);
      if (!featuredImageResult.secure_url) {
        console.error("Featured image upload failed.");
        return NextResponse.json({ msg: "Featured image upload failed." }, { status: 500 });
      }
      featuredImageUrl = featuredImageResult.secure_url;
    }

    // Parsing colors as an array of objects from JSON string
    const colorsArray = colors ? JSON.parse(colors) : [];

    const productData = {
      name,
      description,
      actualPrice,
      originalPrice,
      category,
      stock,
      colors: colorsArray,
      brand,
      sku,
      isFeatured,
      isOnSale,
      tags: tags ? tags.split(',').map(tag => tag.trim()) : [], // Handle tags if provided
      images: imageUploads, // Ensure images array is passed here
      featuredImage: featuredImageUrl,
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
