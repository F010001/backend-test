"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConfig = void 0;
exports.dbConfig = {
    HOST: 'localhost',
    USER: 'root',
    PASSWORD: 'root',
    DB: 'test',
    DIALECT: 'mysql',
    PORT: 3306,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
};
