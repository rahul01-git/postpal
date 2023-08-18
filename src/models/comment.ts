import { DataTypes } from "sequelize";
import { sequelize } from "../config";
import { Post, User } from ".";

const Comment = sequelize.define(
    'Comment',
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
        post_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Post,
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

export default Comment