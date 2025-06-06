import sharp from "sharp";
import path from "path";

export async function resizeImage(
  filename: string,
  width: number,
  height: number,
): Promise<string> {
  const inputPath = path.join(process.cwd(), "uploads", filename);

  const { name } = path.parse(filename);
  const outputFilename = `${name}_${width}x${height}.jpg`;
  const outputPath = path.join(process.cwd(), "images", outputFilename);

  await sharp(inputPath)
    .resize(width, height)
    .toFormat("jpg")
    .toFile(outputPath);

  return outputFilename;
}
