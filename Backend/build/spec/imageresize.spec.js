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
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const imageresize_1 = require("../src/routes/api/imageresize");
describe("resizeImage", () => {
    const testFile = "test.jpg";
    const width = 100;
    const height = 100;
    const outputFile = "test_100x100.jpg";
    const uploadPath = path_1.default.join(process.cwd(), "uploads", testFile);
    const outputPath = path_1.default.join(process.cwd(), "images", outputFile);
    beforeAll(() => {
        if (!fs_1.default.existsSync(uploadPath)) {
            throw new Error(`Test image not found at ${uploadPath}`);
        }
    });
    afterAll(() => {
        if (fs_1.default.existsSync(outputPath)) {
            fs_1.default.unlinkSync(outputPath);
        }
    });
    it("should resize image and save output file", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield (0, imageresize_1.resizeImage)(testFile, width, height);
        expect(result).toBe(outputFile);
        expect(fs_1.default.existsSync(outputPath)).toBeTrue();
    }));
});
