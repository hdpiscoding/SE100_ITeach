"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Chapter extends Model {
    /**
     
Helper method for defining associations.
This method is not a part of Sequelize lifecycle.
The models/index file will call this method automatically.*/
    static associate(models) {
      Chapter.belongsTo(models.Course, {
        foreignKey: "courseId",
        as: "courseData",
      });
      Chapter.hasMany(models.Lesson, {
        foreignKey: "id",
        as: "chapter",
      });
    }
  }
  Chapter.init(
    {
      chapterName: DataTypes.STRING,
      courseId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Chapter",
    }
  );
  return Chapter;
};
