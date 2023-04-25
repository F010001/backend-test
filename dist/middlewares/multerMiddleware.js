"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.multerMiddleware = exports.fileFilter = exports.fileStorage = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
exports.fileStorage = multer_1.default.diskStorage({
    destination(request, file, callback) {
        callback(null, path_1.default.resolve(__dirname, '../../static'));
    },
    filename(req, file, callback) {
        const fileName = file.originalname;
        callback(null, fileName);
    },
});
const fileFilter = (request, file, callback) => {
    if (file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg') {
        callback(null, true);
    }
    else {
        callback(null, false);
    }
};
exports.fileFilter = fileFilter;
exports.multerMiddleware = (0, multer_1.default)({
    storage: exports.fileStorage,
    fileFilter: exports.fileFilter,
});
