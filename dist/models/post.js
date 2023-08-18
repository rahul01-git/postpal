"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = require("../config");
const _1 = require(".");
const Post = config_1.sequelize.define('Post', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    like_count: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 0
    },
    user_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: _1.User,
            key: 'id'
        }
    }
}, {
    timestamps: true,
    paranoid: true,
});
exports.default = Post;
