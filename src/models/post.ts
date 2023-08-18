import { DataTypes } from "sequelize";
import { sequelize } from "../config";
import { User } from ".";

const Post = sequelize.define(
    'Post', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    like_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    }
}
    ,
    {
        timestamps: true,
        paranoid: true,
    }
)

export default Post