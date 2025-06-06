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
const supertest_1 = __importDefault(require("supertest"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const index_1 = __importDefault(require("../src/index"));
describe("POST /resize", () => {
    const filename = "test.jpg";
    const width = 100;
    const height = 100;
    const outputFile = "test_100x100.jpg";
    it("should resize the image and return the new filename", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(index_1.default)
            .post("/resize")
            .query({ filename, width, height });
        expect(response.status).toBe(200);
        expect(response.body.filename).toBe(outputFile);
        const outputPath = path_1.default.join(process.cwd(), "images", outputFile);
        expect(fs_1.default.existsSync(outputPath)).toBeTrue();
        fs_1.default.unlinkSync(outputPath);
    }));
    it("should return 400 for missing query parameters", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(index_1.default).post("/resize");
        expect(response.status).toBe(400);
    }));
});
