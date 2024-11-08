import connectDB from "@/lib/dbConnect";
import uploadImage from "@/lib/uploadImages";
import categoryModels from "@/models/categoryModels";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    console.log("Connecting to database...");
    await connectDB();

    const formData = await req.formData();

    // Helper function to safely get and trim values
    const getTrimmedValue = (key) => {
      const value = formData.get(key);
      return value ? value.trim() : '';
    };

    const categoryId = getTrimmedValue("category"); // Should be category ID if updating
    console.log("Received category ID:", categoryId);

    // Parsing and uploading subcategories
    const subCategories = [];
    let subCategoryCount = 0;
    while (formData.has(`subCategories[${subCategoryCount}][name]`)) {
      const subCategoryName = formData.get(`subCategories[${subCategoryCount}][name]`);
      const subCategoryImage = formData.get(`subCategories[${subCategoryCount}][image]`);
      
      if (subCategoryName) {
        console.log(`Processing subcategory ${subCategoryCount}:`, subCategoryName);
        const subCategoryImageUrl = subCategoryImage ? await uploadImage(subCategoryImage, 'subCategoryImages') : null;
        console.log(`Subcategory ${subCategoryCount} image URL:`, subCategoryImageUrl?.secure_url);
        
        subCategories.push({ name: subCategoryName, image: subCategoryImageUrl?.secure_url });
      }
      subCategoryCount++;
    }

    // Log subcategories to check if they are captured correctly
    console.log("Parsed subcategories:", subCategories);

    if (categoryId) {
      // Find the existing category and update it
      const existingCategory = await categoryModels.findById(categoryId);
      console.log("Existing category found:", existingCategory);

      if (existingCategory) {
        console.log("Updating existing category...");
        existingCategory.subcategories = subCategories; // Set the subcategories array
        await existingCategory.save();
        return NextResponse.json({ msg: "Category updated successfully" }, { status: 200 });
      } else {
        return NextResponse.json({ msg: "Category not found" }, { status: 404 });
      }
    } else {
      // Create a new category if categoryId is not provided
      console.log("Creating new category...");
      const newCategory = new categoryModels({
        name: categoryId, // Assuming categoryId contains the category name, adjust if needed
        subcategories: subCategories,
      });
      await newCategory.save();
      return NextResponse.json({ msg: "Category created successfully" }, { status: 201 });
    }
  } catch (error) {
    console.error("Error adding category:", error); // More detailed error logging
    return NextResponse.json({ msg: "Error adding category", error: error.message }, { status: 500 });
  }
};
