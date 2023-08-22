import { DataTypes } from "sequelize";
import { sequelize } from "../config";
import { Post, User } from ".";

const Like = sequelize.define(
    'Like',
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
        is_liked: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        }
    }
    ,
    {
        timestamps: true,
        paranoid: true,
    }
)

export default Like