"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Lesson extends Model {
    /**
     
Helper method for defining associations.
This method is not a part of Sequelize lifecycle.
The models/index file will call this method automatically.*/
    static associate(models) {}
  }
  Lesson.init(
    {
      courseId: DataTypes.INTEGER,
      name: DataTypes.STRING,
      chapter: DataTypes.INTEGER,
      studyTime: DataTypes.DOUBLE,
    },
    {
      sequelize,
      modelName: "Lesson",
    }
  );
  return Lesson;
};
