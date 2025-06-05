import request from "supertest";
import path from "path";
import fs from "fs";
import app from "../src/index"; 
describe("POST /resize", () => {
  const filename = "test.jpg";
  const width = 100;
  const height = 100;
  const resizedFile = path.join(
    process.cwd(),
    "images",
    `${filename}_${width}x${height}.jpg`
  );


  it("should resize image and respond with success", async () => {
    const response = await request(app)
      .post("/resize")
      .query({ filename, width, height });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Resized successfully");
    expect(response.body.filename).toBe(`${filename}_${width}x${height}.jpg`);
    expect(fs.existsSync(resizedFile)).toBeTrue();
  });

  it("should return 500 for missing file", async () => {
    const response = await request(app)
      .post("/resize")
      .query({ filename: "nonexistent.jpg", width: 100, height: 100 });

    expect(response.status).toBe(500);
    expect(response.text).toBe("Failed to process image");
  });
});
