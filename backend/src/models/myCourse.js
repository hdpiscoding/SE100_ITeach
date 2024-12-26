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
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      courseId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      currentLessonId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      numberOfProcess: DataTypes.INTEGER, // bài sô bao nhiêu trên tổng số bài
    },
    {
      sequelize,
      modelName: "MyCourse",
    }
  );
  return MyCourse;
};
