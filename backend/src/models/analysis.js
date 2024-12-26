"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Analysis extends Model {
    /**
     
Helper method for defining associations.
This method is not a part of Sequelize lifecycle.
The models/index file will call this method automatically.*/
    static associate(models) {}
  }
  Analysis.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      month: DataTypes.INTEGER,
      year: DataTypes.INTEGER,
      totalStudent: DataTypes.INTEGER,
      income: DataTypes.DOUBLE,
      totalLesson: DataTypes.INTEGER,
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
