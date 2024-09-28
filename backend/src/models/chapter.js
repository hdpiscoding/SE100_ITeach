"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Chapter extends Model {
    /**
     
Helper method for defining associations.
This method is not a part of Sequelize lifecycle.
The models/index file will call this method automatically.*/
    static associate(models) {
      Chapter.hasMany(models.Lesson, {
        foreignKey: "chapter",
        as: "lessons",
      });
    }
  }
  Chapter.init(
    {
      chapterName: DataTypes.STRING,
      courseId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Chapter",
    }
  );
  return Chapter;
};
