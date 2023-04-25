import { NextFunction, Request, Response } from 'express';
import { fileService } from '../services/fileService';

class FileController {
  async uploadFile(req: Request, res: Response, next: NextFunction) {
    const filedata = req.file;
    if (filedata) {
      const newFile = await fileService.createFile(filedata);
      return res.send(newFile);
    }
    res.status(404).end;
  }

  async getListFiles(req: Request, res: Response, next: NextFunction) {
    if (req.query.list_size?.toString()) {
      const list = await fileService.getFilesList(
        req.query.list_size.toString()
      );
      return res.send({ list, page: req.query.list_size });
    } else {
      const list = await fileService.getFilesList('1');
      return res.send({ list, page: 1 });
    }
  }

  async deleteFile(req: Request, res: Response, next: NextFunction) {
    await fileService.deleteFile(req.params.id);
    return res.status(200).end();
  }

  async getFileInformation(req: Request, res: Response, next: NextFunction) {
    const file = await fileService.getfileInformation(req.params.id);
    return res.send(file);
  }

  async downloadFile(req: Request, res: Response, next: NextFunction) {
    const file = await fileService.downLoadFile(req.params.id);
    res.download(file);
  }

  async updateFile(req: Request, res: Response, next: NextFunction) {
    const { name } = req.body;
    const file = await fileService.updateFile(req.params.id, name);
    return res.send(file);
  }
}

export const fileController = new FileController();
