"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const upload = express_1.default.Router();
upload.use((0, cors_1.default)({
    origin: "http://127.0.0.1:5500",
}));
const storage = multer_1.default.diskStorage({
    destination: "./uploads/",
    filename: function (req, file, cb) {
        const ext = path_1.default.extname(file.originalname);
        const name = path_1.default.basename(file.originalname, ext);
        cb(null, `${name}${ext}`);
    },
});
const uploadMiddleware = (0, multer_1.default)({ storage });
upload.post("/upload", uploadMiddleware.single("image"), (req, res) => {
    res.json({ message: "Uploaded", filename: req.file });
});
exports.default = upload;
