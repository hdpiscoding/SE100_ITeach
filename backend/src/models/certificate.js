"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Certificate extends Model {
    /**
     
Helper method for defining associations.
This method is not a part of Sequelize lifecycle.
The models/index file will call this method automatically.*/
    static associate(models) {}
  }
  Certificate.init(
    {
      userId: DataTypes.INTEGER,
      courseId: DataTypes.STRING,
      qr: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Certificate",
    }
  );
  return Certificate;
};
