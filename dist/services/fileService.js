"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileService = exports.FileService = void 0;
const file_repository_1 = require("../repositories/file.repository");
const uuid_1 = require("uuid");
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
class FileService {
    createFile(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const fileExtesion = data.originalname.substring(data.originalname.length - 3);
            const fileName = data.originalname.substring(0, data.originalname.length - 4);
            const newFile = yield file_repository_1.fileRepository.createFile({
                id: (0, uuid_1.v4)(),
                name: fileName,
                extension: fileExtesion,
                mime: data.mimetype,
                size: data.size,
            });
            return newFile;
        });
    }
    deleteFile(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const file = yield file_repository_1.fileRepository.findFileById(id);
            (0, fs_1.unlink)(path_1.default.resolve('static') +
                '/' +
                (file === null || file === void 0 ? void 0 : file.dataValues.name) +
                '.' +
                (file === null || file === void 0 ? void 0 : file.dataValues.extension), (err) => {
                if (err) {
                    console.log(err);
                }
            });
            yield file_repository_1.fileRepository.deleteFile(id);
        });
    }
    getfileInformation(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const file = yield file_repository_1.fileRepository.findFileById(id);
            return file;
        });
    }
    getFilesList(list_size) {
        return __awaiter(this, void 0, void 0, function* () {
            return +list_size === 1
                ? file_repository_1.fileRepository.getAllFiles(10)
                : file_repository_1.fileRepository.getAllFiles(+list_size * 10);
        });
    }
    downLoadFile(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const file = yield file_repository_1.fileRepository.findFileById(id);
            const filePath = path_1.default.resolve('static') +
                '/' +
                (file === null || file === void 0 ? void 0 : file.dataValues.name) +
                '.' +
                (file === null || file === void 0 ? void 0 : file.dataValues.extension);
            return filePath;
        });
    }
    updateFile(id, name) {
        return __awaiter(this, void 0, void 0, function* () {
            const file = yield file_repository_1.fileRepository.findFileById(id);
            const updatedFile = yield file_repository_1.fileRepository.updateFile(id, name);
            (0, fs_1.rename)(path_1.default.resolve('static') +
                '/' +
                (file === null || file === void 0 ? void 0 : file.dataValues.name) +
                '.' +
                (file === null || file === void 0 ? void 0 : file.dataValues.extension), path_1.default.resolve('static') + '/' + name + '.' + (file === null || file === void 0 ? void 0 : file.dataValues.extension), (err) => {
                if (err) {
                    console.log(err);
                }
            });
            return updatedFile;
        });
    }
}
exports.FileService = FileService;
exports.fileService = new FileService();
