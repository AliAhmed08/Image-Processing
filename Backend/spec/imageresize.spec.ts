import fs from "fs";
import path from "path";
import { resizeImage } from "../src/routes/api/imageresize";

describe("resizeImage", () => {
  const testFile = "test.jpg";
  const width = 100;
  const height = 100;
  const outputFile = "test_100x100.jpg";
  const uploadPath = path.join(process.cwd(), "uploads", testFile);
  const outputPath = path.join(process.cwd(), "images", outputFile);

  beforeAll(() => {
    if (!fs.existsSync(uploadPath)) {
      throw new Error(`Test image not found at ${uploadPath}`);
    }
  });

  afterAll(() => {
    if (fs.existsSync(outputPath)) {
      fs.unlinkSync(outputPath);
    }
  });

  it("should resize image and save output file", async () => {
    const result = await resizeImage(testFile, width, height);
    expect(result).toBe(outputFile);
    expect(fs.existsSync(outputPath)).toBeTrue();
  });
});
