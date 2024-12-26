"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class LessonContent extends Model {
    /**
     
Helper method for defining associations.
This method is not a part of Sequelize lifecycle.
The models/index file will call this method automatically.*/
    static associate(models) {}
  }
  LessonContent.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      lessonId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      video: DataTypes.STRING,
      contentHtml: DataTypes.TEXT("long"),
      contentMarkDown: DataTypes.TEXT("long"),
      exerciseHtml: DataTypes.TEXT("long"),
      exerciseMarkDown: DataTypes.TEXT("long"),
    },
    {
      sequelize,
      modelName: "LessonContent",
    }
  );
  return LessonContent;
};
