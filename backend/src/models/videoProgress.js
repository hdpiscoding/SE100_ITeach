"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class VideoProgress extends Model {
    /**
     
Helper method for defining associations.
This method is not a part of Sequelize lifecycle.
The models/index file will call this method automatically.*/
    static associate(models) {
      // define association here
        VideoProgress.belongsTo(models.Lesson, {
        foreignKey: "lessonId",
        as: "lesson",
      });
        VideoProgress.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
      });
    }
  }
    VideoProgress.init(
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
      progress: DataTypes.DOUBLE,
      isFinished: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      }
    },
    {
      sequelize,
      modelName: "VideoProgress",
    }
  );
  return VideoProgress;
};
