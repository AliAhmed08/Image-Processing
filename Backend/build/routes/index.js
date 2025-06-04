"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const imageresize_1 = __importDefault(require("./api/imageresize"));
const upload_1 = __importDefault(require("./api/upload"));
const routes = express_1.default.Router();
routes.get("/api", (req, res) => {
  res.send("Main Api route");
});
routes.use(imageresize_1.default);
routes.use(upload_1.default);
exports.default = routes;
