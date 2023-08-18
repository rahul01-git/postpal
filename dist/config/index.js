"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = exports.dbConfig = void 0;
const dbConfig_1 = __importDefault(require("./dbConfig"));
exports.dbConfig = dbConfig_1.default;
const connection_1 = require("./connection");
Object.defineProperty(exports, "sequelize", { enumerable: true, get: function () { return connection_1.sequelize; } });
