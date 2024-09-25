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
        foreignKey: "userID",
        targetKey: "id",
        as: "userData",
      });
      Review.belongsTo(models.Course, {
        foreignKey: "courseId",
        targetKey: "id",
        as: "courseData",
      });
      Review.hasOne(models.OrderItem, {
        foreignKey: "id",
        as: "review",
      });
    }
  }
  Review.init(
    {
      userID: DataTypes.STRING,
      content: DataTypes.TEXT,
      star: DataTypes.INTEGER,
      courseId: DataTypes.STRING,
      teacherId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Review",
    }
  );
  return Review;
};
