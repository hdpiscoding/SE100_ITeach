"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class IDEUsed extends Model {
    /**
     
Helper method for defining associations.
This method is not a part of Sequelize lifecycle.
The models/index file will call this method automatically.*/
    static associate(models) {
      IDEUsed.belongsTo(models.Course, {
        foreignKey: "courseId",
        targetKey: "id",
        as: "course",
      });
    }
  }
  IDEUsed.init(
    {
      date: DataTypes.DATE,
      courseId: DataTypes.STRING,
      number: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "IDEUsed",
    }
  );
  return IDEUsed;
};
