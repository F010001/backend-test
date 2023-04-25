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
exports.fileController = void 0;
const fileService_1 = require("../services/fileService");
class FileController {
    uploadFile(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const filedata = req.file;
            if (filedata) {
                const newFile = yield fileService_1.fileService.createFile(filedata);
                return res.send(newFile);
            }
            res.status(404).end;
        });
    }
    getListFiles(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if ((_a = req.query.list_size) === null || _a === void 0 ? void 0 : _a.toString()) {
                const list = yield fileService_1.fileService.getFilesList(req.query.list_size.toString());
                return res.send({ list, page: req.query.list_size });
            }
            else {
                const list = yield fileService_1.fileService.getFilesList('1');
                return res.send({ list, page: 1 });
            }
        });
    }
    deleteFile(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            yield fileService_1.fileService.deleteFile(req.params.id);
            return res.status(200).end();
        });
    }
    getFileInformation(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const file = yield fileService_1.fileService.getfileInformation(req.params.id);
            return res.send(file);
        });
    }
    downloadFile(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const file = yield fileService_1.fileService.downLoadFile(req.params.id);
            res.download(file);
        });
    }
    updateFile(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name } = req.body;
            const file = yield fileService_1.fileService.updateFile(req.params.id, name);
            return res.send(file);
        });
    }
}
exports.fileController = new FileController();
