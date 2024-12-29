"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.MyCourse, {
        foreignKey: "userId",
      });

      User.hasOne(models.Course, {
        foreignKey: "teacherId",
        as: "teacher",
      });
      User.hasMany(models.Review, {
        foreignKey: "userId",
        as: "user",
      });
      User.hasMany(models.LessonComment, {
        foreignKey: "userId",
        as: "userInfo",
      });
      User.hasOne(models.VideoProgress, {
        foreignKey: "userId",
        as: "videoProgress",
      });
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      avatar: DataTypes.STRING,
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
