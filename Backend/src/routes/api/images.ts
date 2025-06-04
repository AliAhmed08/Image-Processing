import express from "express";
import fs from "fs";
import cors from "cors";
import path from "path";

const imgrouter = express.Router();

imgrouter.use(
  cors({
    origin: "http://127.0.0.1:5500",
  }),
);

imgrouter.get("/images", (req, res) => {
  const imageDir = path.join(process.cwd(), "images");

  fs.readdir(imageDir, (err, files) => {
    if (err) {
      return res.status(500).send("Unable to read image directory");
    }

    const images = files.filter((file) => /\.(jpg|jpeg|png|gif)$/i.test(file));

    res.json(images);
  });
});

export default imgrouter;
