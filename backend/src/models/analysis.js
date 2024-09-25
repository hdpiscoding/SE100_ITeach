"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Analysis extends Model {
    /**
     
Helper method for defining associations.
This method is not a part of Sequelize lifecycle.
The models/index file will call this method automatically.*/
    static associate(models) {
      Analysis.belongsTo(models.User, {
        foreignKey: "userId",
        targetKey: "id",
        as: "user",
      });
      Analysis.belongsTo(models.Lesson, {
        foreignKey: "lessonId",
        targetKey: "id",
        as: "lesson",
      });
    }
  }
  Analysis.init(
    {
      month: DataTypes.INTEGER,
      year: DataTypes.INTEGER,
      totalStudent: DataTypes.INTEGER,
      income: DataTypes.DOUBLE,
      lesson: DataTypes.INTEGER,
      newteacher: DataTypes.INTEGER,
      newcourse: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Analysis",
    }
  );
  return Analysis;
};
