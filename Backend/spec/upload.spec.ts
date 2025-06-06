import request from "supertest";
import path from "path";
import fs from "fs";
import app from "../src/index";

describe("POST /upload", () => {
  const testImage = path.join("spec", "test-assets", "test1.jpg");
  const uploadedImage = path.join("uploads", "test1.jpg");

  afterAll(() => {
    if (fs.existsSync(uploadedImage)) fs.unlinkSync(uploadedImage);
  });

  it("uploads an image", async () => {
    const res = await request(app).post("/upload").attach("image", testImage);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Uploaded");
    expect(fs.existsSync(uploadedImage)).toBeTrue();
  });
});
