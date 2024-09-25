"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    static associate(models) {}
  }

  Course.init(
    {
      courseName: DataTypes.STRING,
      categoryId: DataTypes.INTEGER,
      cost: DataTypes.DOUBLE,
      discount: DataTypes.DOUBLE,
      totalStars: DataTypes.INTEGER,
      reviewers: DataTypes.INTEGER,
      courseStatus: DataTypes.STRING,
      intro: DataTypes.TEXT,
      finishTime: DataTypes.STRING,
      gioiThieu: DataTypes.TEXT("long"),
      anhBia: DataTypes.TEXT("long"),
      chungchiId: DataTypes.STRING,
      teacherId: DataTypes.STRING,
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
