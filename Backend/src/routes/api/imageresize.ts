import express, { type Request, type Response} from "express";
import sharp from "sharp";
import path from "path";
import cors from "cors";

const resize = express.Router();

resize.use(
  cors({
    origin: "http://127.0.0.1:5500",
  }),
);

resize.post("/resize", async (req: Request, res: Response): Promise<void> => {
  try {
    const { filename, width, height } = req.query;

    const imagePath = path.join(process.cwd(), "uploads", filename as string);
    const newFileName = `${filename as string}_${width}x${height}.jpg`;
    const outputPath = path.join(process.cwd(), "images", newFileName);

    await sharp(imagePath)
      .resize(parseInt(width as string, 10), parseInt(height as string, 10))
      .toFormat("jpg")
      .toFile(outputPath);
    res.json({
      message: "Resized successfully",
      filename: newFileName,
    });
  } catch (err: any) {
    console.error(err);
    res.status(500).send("Failed to process image");
  }
});

export default resize;
