import { FileModel } from '../models/file.model';
import { FileType } from '../types/models.types';

export const fileRepository = {
  async createFile(newFile: FileType) {
    return FileModel.create(newFile);
  },

  async findFileById(id: string) {
    return FileModel.findByPk(id);
  },

  async getAllFiles(amount: number) {
    return FileModel.findAll({ limit: amount });
  },

  async deleteFile(id: string) {
    return FileModel.destroy({ where: { id } });
  },

  async updateFile(id: string, newName: string) {
    const file = await this.findFileById(id);
    file?.set({ name: newName });
    file?.save();
    return file;
  },
};
