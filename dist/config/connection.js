"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
require("dotenv/config");
const index_1 = require("./index");
const { username, password, database, host, dialect, port } = index_1.dbConfig.development;
const sequelize = new sequelize_1.Sequelize(database, username, password, {
    host: host,
    port: +!port,
    dialect: dialect,
});
exports.sequelize = sequelize;
