"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     
Helper method for defining associations.
This method is not a part of Sequelize lifecycle.
The models/index file will call this method automatically.*/
    static associate(models) {
      User.belongsTo(models.Allcode, {
        foreignKey: "role",
        targetKey: "key",
        as: "roleData",
      });
      User.hasOne(models.Review, {
        foreignKey: "userID",
        as: "reviewsData",
      });
      User.hasMany(models.MyCourse, {
        foreignKey: "courseId",
        as: "myCoursesData",
      });
      User.hasMany(models.LessonComment, {
        foreignKey: "id",
        as: "user",
      });
      User.hasMany(models.Certificate, {
        foreignKey: "id",
        as: "user",
      });
      User.hasMany(models.CartItem, {
        foreignKey: "id",
        as: "user",
      });
      User.hasMany(models.Order, {
        foreignKey: "id",
        as: "user",
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
