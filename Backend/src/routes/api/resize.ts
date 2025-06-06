import express, { type Request, type Response } from "express";
import cors from "cors";
import { resizeImage } from "../api/imageresize";

const resize = express.Router();

resize.use(
  cors({
    origin: "http://127.0.0.1:5500",
  }),
);

resize.post("/resize", async (req: Request, res: Response): Promise<void> => {
  try {
    const { filename, width, height } = req.query;

    if (!filename || !width || !height) {
      res.status(400).send("Missing required query parameters");
      return;
    }

    const resizedFile = await resizeImage(
      filename as string,
      parseInt(width as string, 10),
      parseInt(height as string, 10),
    );

    res.json({
      message: "Resized successfully",
      filename: resizedFile,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to process image");
  }
});

export default resize;
