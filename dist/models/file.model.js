"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileModel = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../db");
class FileModel extends sequelize_1.Model {
}
exports.FileModel = FileModel;
FileModel.init({
    id: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    extension: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    mime: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    size: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    sequelize: db_1.connection,
    tableName: 'files',
});
