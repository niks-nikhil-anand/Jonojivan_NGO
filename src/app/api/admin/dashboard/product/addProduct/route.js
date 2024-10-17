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
    const stock = parseInt(getTrimmedValue("stock"), 10);
    const brand = getTrimmedValue("brand");
    const tags = getTrimmedValue("tags");
    const suggestedUse = getTrimmedValue("suggestedUse");
    const servingPerBottle = getTrimmedValue("servingPerBottle");
    const isFanFavourites = formData.get("isFanFavourites") === 'true';
    const isOnSale = formData.get("isOnSale") === 'true';

    if (!name || !category) {
      return NextResponse.json({ msg: "Please provide all the required fields." }, { status: 400 });
    }

    const images = formData.getAll("images");
    const featuredImage = formData.get("featuredImage");
    const descriptionImage = formData.get("descriptionImage");

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

    // Upload description image
    let descriptionImageUrl = null;
    if (descriptionImage) {
      const descriptionImageResult = await uploadImage(descriptionImage, "descriptionImage");
      if (!descriptionImageResult.secure_url) {
        return NextResponse.json({ msg: "Description image upload failed." }, { status: 500 });
      }
      descriptionImageUrl = descriptionImageResult.secure_url;
    }

    // Parsing and uploading ingredients
    const ingredients = [];
    let ingredientCount = 0;
    while (formData.has(`ingredients[${ingredientCount}][name]`)) {
      const ingredientName = formData.get(`ingredients[${ingredientCount}][name]`);
      const ingredientWeight = formData.get(`ingredients[${ingredientCount}][weightInGram]`);
      const ingredientImage = formData.get(`ingredients[${ingredientCount}][image]`);
      
      if (ingredientName && ingredientWeight) {
        const ingredientImageUrl = ingredientImage ? await uploadImage(ingredientImage, 'ingredientImages') : null;
        ingredients.push({ name: ingredientName, weightInGram: ingredientWeight, image: ingredientImageUrl });
      }
      ingredientCount++;
    }

    // Log ingredients to check if they are captured correctly
    console.log("Parsed ingredients:", ingredients);

    // Process product highlights
    const productHighlights = [];
    let highlightCount = 0;
    while (formData.has(`productHighlights[${highlightCount}][title]`)) {
      const highlightTitle = formData.get(`productHighlights[${highlightCount}][title]`);
      const highlightDescription = formData.get(`productHighlights[${highlightCount}][description]`);
      const highlightIcon = formData.get(`productHighlights[${highlightCount}][icon]`);

      if (highlightTitle) {
        const highlightIconUrl = highlightIcon ? await uploadImage(highlightIcon, 'highlightIcons') : null;
        productHighlights.push({ title: highlightTitle, description: highlightDescription, icon: highlightIconUrl });
      }
      highlightCount++;
    }

    // Log product highlights to ensure they are captured correctly
    console.log("Parsed product highlights:", productHighlights);

    // Log product highlights to ensure they are captured correctly
    console.log("Parsed product highlights:", productHighlights);

    const productData = {
      name,
      description,
      salePrice,
      originalPrice,
      category,
      stock,
      brand,
      suggestedUse,
      servingPerBottle,
      isFanFavourites,
      isOnSale,
      tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
      images: imageUploads,
      featuredImage: featuredImageUrl,
      descriptionImage: descriptionImageUrl,
      ingredients,
      productHighlights,
    };

    console.log("Final product data:", productData); // Log the final product data before saving

    await productModels.create(productData);
    return NextResponse.json({ msg: "Product added successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error adding product:", error); // More detailed error logging
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
