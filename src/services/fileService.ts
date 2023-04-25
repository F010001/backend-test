import { fileRepository } from '../repositories/file.repository';
import { RequestFileType } from '../types/models.types';
import { v4 as uuidv4 } from 'uuid';
import { unlink, rename } from 'fs';
import path from 'path';

export class FileService {
  async createFile(data: RequestFileType) {
    const fileExtesion = data.originalname.substring(
      data.originalname.length - 3
    );
    const fileName = data.originalname.substring(
      0,
      data.originalname.length - 4
    );
    const newFile = await fileRepository.createFile({
      id: uuidv4(),
      name: fileName,
      extension: fileExtesion,
      mime: data.mimetype,
      size: data.size,
    });
    return newFile;
  }

  async deleteFile(id: string) {
    const file = await fileRepository.findFileById(id);
    unlink(
      path.resolve('static') +
        '/' +
        file?.dataValues.name +
        '.' +
        file?.dataValues.extension,
      (err) => {
        if (err) {
          console.log(err);
        }
      }
    );
    await fileRepository.deleteFile(id);
  }

  async getfileInformation(id: string) {
    const file = await fileRepository.findFileById(id);
    return file;
  }

  async getFilesList(list_size: string) {
    return +list_size === 1
      ? fileRepository.getAllFiles(10)
      : fileRepository.getAllFiles(+list_size * 10);
  }

  async downLoadFile(id: string) {
    const file = await fileRepository.findFileById(id);
    const filePath =
      path.resolve('static') +
      '/' +
      file?.dataValues.name +
      '.' +
      file?.dataValues.extension;
    return filePath;
  }

  async updateFile(id: string, name: string) {
    const file = await fileRepository.findFileById(id);
    const updatedFile = await fileRepository.updateFile(id, name);
    rename(
      path.resolve('static') +
        '/' +
        file?.dataValues.name +
        '.' +
        file?.dataValues.extension,
      path.resolve('static') + '/' + name + '.' + file?.dataValues.extension,
      (err) => {
        if (err) {
          console.log(err);
        }
      }
    );
    return updatedFile;
  }
}

export const fileService = new FileService();
