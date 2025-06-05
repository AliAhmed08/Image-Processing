import sharp from "sharp";
import path from "path";

export async function resizeImage(
  filename: string,
  width: number,
  height: number
): Promise<string> {
  const imagePath = path.join(process.cwd(), "uploads", filename);
  const newFileName = `${path.parse(filename).name}_${width}x${height}.jpg`;
  const outputPath = path.join(process.cwd(), "images", newFileName);

  await sharp(imagePath)
    .resize(width, height)
    .toFormat("jpg")
    .toFile(outputPath);

  return newFileName;
}
