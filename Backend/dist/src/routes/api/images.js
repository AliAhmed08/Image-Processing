"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const imgrouter = express_1.default.Router();
imgrouter.use((0, cors_1.default)({
    origin: "http://127.0.0.1:5500",
}));
imgrouter.get("/images", (req, res) => {
    const imageDir = path_1.default.join(process.cwd(), "images");
    fs_1.default.readdir(imageDir, (err, files) => {
        if (err) {
            return res.status(500).send("Unable to read image directory");
        }
        const images = files.filter((file) => /\.(jpg|jpeg|png|gif)$/i.test(file));
        res.json(images);
    });
});
exports.default = imgrouter;
