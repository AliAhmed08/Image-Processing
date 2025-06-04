"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sharp_1 = __importDefault(require("sharp"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const resize = express_1.default.Router();
resize.use(
  (0, cors_1.default)({
    origin: "http://127.0.0.1:5500",
  }),
);
resize.post("/resize", (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const { filename, width, height } = req.query;
      const imagePath = path_1.default.join(process.cwd(), "uploads", filename);
      const newFileName = `${filename}_${width}x${height}.jpg`;
      const outputPath = path_1.default.join(
        process.cwd(),
        "images",
        newFileName,
      );
      yield (0, sharp_1.default)(imagePath)
        .resize(parseInt(width, 10), parseInt(height, 10))
        .toFormat("jpg")
        .toFile(outputPath);
      // console.log(buffer)
      // res.set("Content-Type", "image/jpg");
      // res.set("Content-Disposition", `inline; filename=batman${width}x${height}.jpg`);
      res.json({
        message: "Resized successfully",
        filename: newFileName,
      });
    } catch (err) {
      console.error(err);
      res.status(500).send("Failed to process image");
    }
  }),
);
exports.default = resize;
