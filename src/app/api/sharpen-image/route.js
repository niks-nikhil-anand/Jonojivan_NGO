import sharp from "sharp";
import path from "path";
import { NextResponse } from "next/server";

export async function GET() {
  const imagePath = path.resolve("./public/frontend/heroSection/slide1.jpg");
  const outputPath = path.resolve("./public/frontend/heroSection/slide1-sharp.jpg");

  try {
    // Apply sharp processing
    await sharp(imagePath)
      .sharpen()
      .toFile(outputPath);

    return NextResponse.json({
      message: "Image sharpened successfully!",
      imageUrl: "/frontend/heroSection/slide1-sharp.jpg",
    });
  } catch (error) {
    console.error("Error sharpening image:", error);
    return NextResponse.json(
      { error: "Failed to sharpen image" },
      { status: 500 }
    );
  }
}
