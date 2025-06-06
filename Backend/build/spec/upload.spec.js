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
describe("POST /upload", () => {
    const testImage = path_1.default.join("spec", "test-assets", "test1.jpg");
    const uploadedImage = path_1.default.join("uploads", "test1.jpg");
    afterAll(() => {
        if (fs_1.default.existsSync(uploadedImage))
            fs_1.default.unlinkSync(uploadedImage);
    });
    it("uploads an image", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default).post("/upload").attach("image", testImage);
        expect(res.status).toBe(200);
        expect(res.body.message).toBe("Uploaded");
        expect(fs_1.default.existsSync(uploadedImage)).toBeTrue();
    }));
});
