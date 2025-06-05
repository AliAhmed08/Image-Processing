import multer from "multer";
import express, { type Request, type Response} from "express";
import cors from "cors";
import path from "path";

const upload = express.Router();

upload.use(
  cors({
    origin: "http://127.0.0.1:5500",
  }),
);

const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext);
    cb(null, `${name}${ext}`);
  },
});

const uploadMiddleware = multer({ storage });

upload.post("/upload", uploadMiddleware.single("image"), (req: Request, res: Response): void => {
  res.json({ message: "Uploaded", filename: req.file });
});

export default upload;
