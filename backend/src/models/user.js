"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     
Helper method for defining associations.
This method is not a part of Sequelize lifecycle.
The models/index file will call this method automatically.*/
    static associate(models) {
      User.hasOne(models.Course, {
        foreignKey: "teacherId",
        as: "teacher",
      });
    }
  }
  User.init(
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      avatar: DataTypes.TEXT,
      birthday: DataTypes.DATE,
      totalCourseNumber: DataTypes.INTEGER,
      totalStudentNumber: DataTypes.INTEGER,
      role: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
