import request from "supertest";
import path from "path";
import app from "../src/index";


describe("Image Processing API", () => {

  it("should upload an image", (done) => {
    request(app)
      .post("/upload")
      .attach("images", path.join(__dirname, "test.jpg"))
      .expect(200)
      .end((err, res) => {
        expect(res.status).toBe(200);
        done();
      });
  });

  it("should return list of images", (done) => {
    request(app)
      .get("/images")
      .expect(200)
      .end((err, res) => {
        expect(Array.isArray(res.body)).toBeTrue();
        done();
      });
  });

  it("should resize an uploaded image", (done) => {
    const filename = "test.jpg"; // make sure it's uploaded already

    request(app)
      .post(`/resize?filename=${filename}&width=100&height=100`)
      .expect(200)
      .end((err, res) => {
        expect(res.status).toBe(200);
        done();
      });
  });

});
