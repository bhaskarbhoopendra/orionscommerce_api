"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileFilter = exports.fileStorage = void 0;
const multer_1 = __importDefault(require("multer"));
exports.fileStorage = multer_1.default.diskStorage({
    destination: (request, file, callback) => {
        callback(null, "./public/uploads/");
    },
    filename: (req, file, callback) => {
        callback(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
    },
});
const fileFilter = (request, file, callback) => {
    if (file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg") {
        callback(null, true);
    }
    else {
        callback(null, false);
    }
};
exports.fileFilter = fileFilter;
