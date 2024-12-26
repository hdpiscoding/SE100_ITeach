"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class IDEUsed extends Model {
    /**
     
Helper method for defining associations.
This method is not a part of Sequelize lifecycle.
The models/index file will call this method automatically.*/
    static associate(models) {}
  }
  IDEUsed.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      date: DataTypes.DATE,
      courseId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      number: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "IDEUsed",
    }
  );
  return IDEUsed;
};
