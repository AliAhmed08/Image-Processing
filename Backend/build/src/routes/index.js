"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const resize_1 = __importDefault(require("./api/resize"));
const upload_1 = __importDefault(require("./api/upload"));
const images_1 = __importDefault(require("./api/images"));
const routes = express_1.default.Router();
routes.get("/api", (req, res) => {
    res.send("Main Api route");
});
routes.use(upload_1.default);
routes.use(resize_1.default);
routes.use(images_1.default);
exports.default = routes;
