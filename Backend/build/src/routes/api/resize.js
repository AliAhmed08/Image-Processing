"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const imageresize_1 = require("../api/imageresize");
const resize = express_1.default.Router();
resize.use((0, cors_1.default)({
    origin: "http://127.0.0.1:5500",
}));
resize.post("/resize", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { filename, width, height } = req.query;
        if (!filename || !width || !height) {
            res.status(400).send("Missing required query parameters");
            return;
        }
        const resizedFile = yield (0, imageresize_1.resizeImage)(filename, parseInt(width, 10), parseInt(height, 10));
        res.json({
            message: "Resized successfully",
            filename: resizedFile,
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Failed to process image");
    }
}));
exports.default = resize;
