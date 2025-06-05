"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const path_1 = __importDefault(require("path"));
const index_1 = __importDefault(require("../src/index"));
describe("Image Processing API", () => {
  it("should upload an image", (done) => {
    (0, supertest_1.default)(index_1.default)
      .post("/upload")
      .attach("images", path_1.default.join(__dirname, "test.jpg"))
      .expect(200)
      .end((err, res) => {
        expect(res.status).toBe(200);
        done();
      });
  });
  it("should return list of images", (done) => {
    (0, supertest_1.default)(index_1.default)
      .get("/images")
      .expect(200)
      .end((err, res) => {
        expect(Array.isArray(res.body)).toBeTrue();
        done();
      });
  });
  it("should resize an uploaded image", (done) => {
    const filename = "test.jpg"; // make sure it's uploaded already
    (0, supertest_1.default)(index_1.default)
      .post(`/resize?filename=${filename}&width=100&height=100`)
      .expect(200)
      .end((err, res) => {
        expect(res.status).toBe(200);
        done();
      });
  });
});
