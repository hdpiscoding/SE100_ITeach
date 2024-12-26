"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     
Helper method for defining associations.
This method is not a part of Sequelize lifecycle.
The models/index file will call this method automatically.*/
    static associate(models) {
      Review.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
      });
    }
  }
  Review.init(
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
      content: DataTypes.TEXT,
      star: DataTypes.INTEGER,
      courseId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      teacherId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
    },
    {
      sequelize,
      modelName: "Review",
    }
  );
  return Review;
};
