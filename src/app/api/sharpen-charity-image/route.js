import sharp from "sharp";
import path from "path";
import { NextResponse } from "next/server";

export async function GET() {
  // Define image paths
  const images = [
    {
      input: path.resolve("./public/frontend/CharityPhotos/image1.jpg"),
      output: path.resolve("./public/frontend/CharityPhotos/image1-sharp.jpg"),
    },
    {
      input: path.resolve("./public/frontend/CharityPhotos/image2.jpg"),
      output: path.resolve("./public/frontend/CharityPhotos/image2-sharp.jpg"),
    },
    {
      input: path.resolve("./public/frontend/CharityPhotos/image3.jpg"),
      output: path.resolve("./public/frontend/CharityPhotos/image3-sharp.jpg"),
    },
    {
      input: path.resolve("./public/frontend/CharityPhotos/image4.jpg"),
      output: path.resolve("./public/frontend/CharityPhotos/image4-sharp.jpg"),
    },
    {
      input: path.resolve("./public/frontend/CharityPhotos/image5.jpg"),
      output: path.resolve("./public/frontend/CharityPhotos/image5-sharp.jpg"),
    },
    {
      input: path.resolve("./public/frontend/CharityPhotos/image6.jpg"),
      output: path.resolve("./public/frontend/CharityPhotos/image6-sharp.jpg"),
    },
    
  ];

  try {
    // Process each image
    const results = await Promise.all(
      images.map(async ({ input, output }) => {
        try {
          await sharp(input).sharpen().toFile(output);

          // Return relative path for the output image
          return path.relative("./public", output);
        } catch (err) {
          console.error(`Error processing image: ${input}`, err);
          throw new Error(`Failed to process image: ${path.basename(input)}`);
        }
      })
    );

    return NextResponse.json({
      message: "Images sharpened successfully!",
      images: results.map((result) => `/${result}`), // Format as relative URLs
    });
  } catch (error) {
    console.error("Error sharpening images:", error);
    return NextResponse.json(
      { error: error.message || "Failed to sharpen images" },
      { status: 500 }
    );
  }
}
