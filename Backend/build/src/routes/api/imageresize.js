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
exports.resizeImage = resizeImage;
const sharp_1 = __importDefault(require("sharp"));
const path_1 = __importDefault(require("path"));
function resizeImage(filename, width, height) {
    return __awaiter(this, void 0, void 0, function* () {
        const inputPath = path_1.default.join(process.cwd(), "uploads", filename);
        const { name } = path_1.default.parse(filename);
        const outputFilename = `${name}_${width}x${height}.jpg`;
        const outputPath = path_1.default.join(process.cwd(), "images", outputFilename);
        yield (0, sharp_1.default)(inputPath)
            .resize(width, height)
            .toFormat("jpg")
            .toFile(outputPath);
        return outputFilename;
    });
}
