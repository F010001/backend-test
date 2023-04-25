import { DataTypes, Model } from 'sequelize';
import { connection } from '../db';
import { FileType } from '../types/models.types';

export class FileModel extends Model<FileType> {}

FileModel.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    extension: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mime: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    size: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: connection,
    tableName: 'files',
  }
);
