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
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      courseId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      qr: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Certificate",
    }
  );

  return Certificate;
};
