"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class MyCourse extends Model {
    static associate(models) {
      MyCourse.belongsTo(models.User, {
        foreignKey: "userId",
      });

      // define association here
      MyCourse.belongsTo(models.Course, {
        foreignKey: "courseId",
      });
    }
  }
  MyCourse.init(
    {
      userId: DataTypes.INTEGER,
      courseId: DataTypes.INTEGER,
      currentLessonId: DataTypes.INTEGER,
      numberOfProcess: DataTypes.INTEGER, // bài sô bao nhiêu trên tổng số bài
    },
    {
      sequelize,
      modelName: "MyCourse",
    }
  );
  return MyCourse;
};
