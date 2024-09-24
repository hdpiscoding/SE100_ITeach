"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class MyCourse extends Model {
    static associate(models) {
      MyCourse.belongsTo(models.User, {
        foreignKey: "userId",
        targetKey: "id",
        as: "userData",
      });
      MyCourse.belongsTo(models.Course, {
        foreignKey: "courseId",
        targetKey: "id",
        as: "courseData",
      });
      MyCourse.belongsTo(models.Allcode, {
        foreignKey: "courseRole",
        targetKey: "key",
        as: "courseRoleData",
      });
    }
  }
  MyCourse.init(
    {
      userId: DataTypes.STRING,
      courseId: DataTypes.STRING,
      process: DataTypes.STRING, // bài mấy chương mấy
      numberOfprocess: DataTypes.INTERGER, // bài sô bao nhiêu trên tổng số bài

      courseRole: DataTypes.STRING, // CR1=giaoVien CR2=hocSinh
    },
    {
      sequelize,
      modelName: "MyCourse",
    }
  );
  return MyCourse;
};
