import request from "supertest";
import path from "path";
import fs from "fs";
import app from "../src/index";

describe("POST /resize", () => {
  const filename = "test.jpg";
  const width = 100;
  const height = 100;
  const outputFile = "test_100x100.jpg";

  it("should resize the image and return the new filename", async () => {
    const response = await request(app)
      .post("/resize")
      .query({ filename, width, height });

    expect(response.status).toBe(200);
    expect(response.body.filename).toBe(outputFile);

    const outputPath = path.join(process.cwd(), "images", outputFile);
    expect(fs.existsSync(outputPath)).toBeTrue();

    fs.unlinkSync(outputPath);
  });

  it("should return 400 for missing query parameters", async () => {
    const response = await request(app).post("/resize");
    expect(response.status).toBe(400);
  });
});
