"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class VideoProgess extends Model {
    /**
     
Helper method for defining associations.
This method is not a part of Sequelize lifecycle.
The models/index file will call this method automatically.*/
    static associate(models) {
      // define association here
      VideoProgess.belongsTo(models.Lesson, {
        foreignKey: "lessonId",
        as: "lesson",
      });
      VideoProgess.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
      });
    }
  }
  VideoProgess.init(
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
      lessonId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      progess: DataTypes.DOUBLE,
    },
    {
      sequelize,
      modelName: "VideoProgess",
    }
  );
  return VideoProgess;
};
