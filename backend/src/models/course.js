"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    static associate(models) {
      Course.hasOne(models.CartItem, {
        foreignKey: "courseId",
      });
      Course.hasOne(models.OrderItem, {
        foreignKey: "courseId",
        as: "course",
      });
      Course.hasMany(models.MyCourse, {
        foreignKey: "courseId",
      });
      Course.belongsTo(models.CourseCategory, {
        foreignKey: "courseCategoryId",
        as: "category",
      });
      Course.belongsTo(models.User, {
        foreignKey: "teacherId",
        as: "teacher",
      });
    }
  }

  Course.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      courseName: DataTypes.STRING,
      courseCategoryId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      cost: DataTypes.DOUBLE,
      level: DataTypes.STRING,
      discount: DataTypes.DOUBLE,
      totalStars: DataTypes.INTEGER,
      reviewers: DataTypes.INTEGER,
      courseStatus: DataTypes.STRING,
      intro: DataTypes.TEXT,
      finishTime: DataTypes.STRING,
      gioiThieu: DataTypes.TEXT("long"),
      anhBia: DataTypes.STRING,
      markDown: DataTypes.STRING,
      chungchiId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      teacherId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      totalLesson: DataTypes.INTEGER,
      totalStudent: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Course",
    }
  );

  return Course;
};
