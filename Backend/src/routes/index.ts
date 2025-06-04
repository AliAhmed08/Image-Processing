import express from "express";
import resize from "./api/imageresize";
import upload from "./api/upload";
import imgrouter from "./api/images";

const routes = express.Router();

routes.get("/api", (req, res) => {
  res.send("Main Api route");
});

routes.use(upload);
routes.use(resize);
routes.use(imgrouter);

export default routes;
