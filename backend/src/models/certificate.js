"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Certificate extends Model {
    /**
     
Helper method for defining associations.
This method is not a part of Sequelize lifecycle.
The models/index file will call this method automatically.*/
    static associate(models) {
      Certificate.belongsTo(models.User, {
        foreignKey: "userId",
        targetKey: "id",
        as: "user",
      });
      Certificate.belongsTo(models.Lesson, {
        foreignKey: "lessonId",
        targetKey: "id",
        as: "lesson",
      });
    }
  }
  Certificate.init(
    {
      userId: DataTypes.STRING,
      lessonId: DataTypes.STRING,
      qr: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Certificate",
    }
  );
  return Certificate;
};
