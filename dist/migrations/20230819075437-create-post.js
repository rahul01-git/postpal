"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = {
    up: async (queryInterface, DataTypes) => {
        await queryInterface.createTable("Posts", {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            description: {
                type: DataTypes.STRING,
                allowNull: false
            },
            like_count: {
                type: DataTypes.INTEGER,
                default: 0
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            deletedAt: {
                type: DataTypes.DATE,
                allowNull: true,
            }
        });
    },
    down: async (queryInterface, DataTypes) => {
        await queryInterface.dropTable("Posts");
    }
};
