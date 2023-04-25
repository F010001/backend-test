"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const authRouter_1 = require("./authRouter");
const fileRouter_1 = require("./fileRouter");
exports.router = (0, express_1.Router)({});
exports.router.use('/auth', authRouter_1.authRouter);
exports.router.use('/file', fileRouter_1.fileRouter);
