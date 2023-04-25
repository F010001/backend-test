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
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileRepository = void 0;
const file_model_1 = require("../models/file.model");
exports.fileRepository = {
    createFile(newFile) {
        return __awaiter(this, void 0, void 0, function* () {
            return file_model_1.FileModel.create(newFile);
        });
    },
    findFileById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return file_model_1.FileModel.findByPk(id);
        });
    },
    getAllFiles(amount) {
        return __awaiter(this, void 0, void 0, function* () {
            return file_model_1.FileModel.findAll({ limit: amount });
        });
    },
    deleteFile(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return file_model_1.FileModel.destroy({ where: { id } });
        });
    },
    updateFile(id, newName) {
        return __awaiter(this, void 0, void 0, function* () {
            const file = yield this.findFileById(id);
            file === null || file === void 0 ? void 0 : file.set({ name: newName });
            file === null || file === void 0 ? void 0 : file.save();
            return file;
        });
    },
};
