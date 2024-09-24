"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Allcode extends Model {
    /**
     
Helper method for defining associations.
This method is not a part of Sequelize lifecycle.
The models/index file will call this method automatically.*/
    static associate(models) {
      Allcode.hasMany(models.User, {
        foreignKey: "role",
        as: "roleData",
      });
      Allcode.hasMany(models.Course, {
        foreignKey: "courseStatus",
        as: "statusData",
      });
      Allcode.hasMany(models.MyCourse, {
        foreignKey: "courseRole",
        as: "courseRoleData",
      });
    }
  }
  Allcode.init(
    {
      key: DataTypes.STRING,
      type: DataTypes.STRING,
      value: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Allcode",
    }
  );
  return Allcode;
};
