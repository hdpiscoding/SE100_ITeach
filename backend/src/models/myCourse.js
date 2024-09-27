"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class MyCourse extends Model {
    static associate(models) {
      // define association here
      MyCourse.belongsTo(models.Course, {
        foreignKey: "courseId",
      });
    }
  }
  MyCourse.init(
    {
      userId: DataTypes.STRING,
      courseId: DataTypes.STRING,
      process: DataTypes.STRING, // bài mấy chương mấy
      numberOfProcess: DataTypes.INTEGER, // bài sô bao nhiêu trên tổng số bài
    },
    {
      sequelize,
      modelName: "MyCourse",
    }
  );
  return MyCourse;
};
