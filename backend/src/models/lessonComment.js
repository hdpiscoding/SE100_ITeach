"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class LessonComment extends Model {
    /**
     
Helper method for defining associations.
This method is not a part of Sequelize lifecycle.
The models/index file will call this method automatically.*/
    static associate(models) {}
  }
  LessonComment.init(
    {
      lessonId: DataTypes.STRING,
      parrentCommentId: DataTypes.STRING,
      userId: DataTypes.STRING,
      content: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "LessonComment",
    }
  );
  return LessonComment;
};
