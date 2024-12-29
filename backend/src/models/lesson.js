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
        foreignKey: "chapter",
        as: "lessons",
      });
      Lesson.hasMany(models.VideoProgress, {
        foreignKey: "lessonId",
        as: "lesson",
      });
    }
  }
  Lesson.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      courseId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      name: DataTypes.STRING,
      chapter: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      lessonOrder: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      studyTime: DataTypes.DOUBLE,
    },
    {
      sequelize,
      modelName: "Lesson",
    }
  );
  return Lesson;
};
