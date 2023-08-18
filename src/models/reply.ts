import { DataTypes } from "sequelize";
import { sequelize } from "../config";
import { Comment, Post, User } from ".";

const Reply = sequelize.define(
    'Reply',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: 'id'
            },
        },
        comment_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Comment,
                key: 'id'
            },
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        }
        
    }
    ,
    {
        timestamps: true,
        paranoid: true,
    }
)

export default Reply