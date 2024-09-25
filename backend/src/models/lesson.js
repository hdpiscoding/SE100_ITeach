"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Lesson extends Model {
    /**
     
Helper method for defining associations.
This method is not a part of Sequelize lifecycle.
The models/index file will call this method automatically.*/
    static associate(models) {
      Lesson.belongsTo(models.Chapter, {
        foreignKey: "chapterId",
        targetKey: "id",
        as: "chapter",
      });
      Lesson.hasMany(models.LessonComment, {
        foreignKey: "id",
        as: "lesson",
      });
      Lesson.hasMany(models.Certificate, {
        foreignKey: "id",
        as: "lesson",
      });
    }
  }
  Lesson.init(
    {
      id: DataTypes.STRING,
      chapterId: DataTypes.STRING,
      name: DataTypes.STRING,
      video: DataTypes.TEXT("long"),
      contentHtml: DataTypes.TEXT("long"),
      contentMarkDown: DataTypes.TEXT("long"),
      exerciseHtml: DataTypes.TEXT("long"),
      exerciseMarkDown: DataTypes.TEXT("long"),
      studyTime: DataTypes.DOUBLE,
    },
    {
      sequelize,
      modelName: "Lesson",
    }
  );
  return Lesson;
};
