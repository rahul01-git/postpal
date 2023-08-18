import { DataTypes } from "sequelize";
import { sequelize } from "../config";

const User = sequelize.define(
  'User', {
    id:{
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    }, 
    full_name:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email_verified:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    otp: {
      type: DataTypes.INTEGER
    },
    password:{
      type: DataTypes.STRING,
      allowNull: false,
    }
  }
 ,
  {
    timestamps: true,
    paranoid: true,
  }
)

export default User