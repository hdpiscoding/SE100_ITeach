"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class OrderItem extends Model {
    /**
     
Helper method for defining associations.
This method is not a part of Sequelize lifecycle.
The models/index file will call this method automatically.*/
    static associate(models) {
      OrderItem.belongsTo(models.Order, {
        foreignKey: "orderId",
        targetKey: "id",
        as: "orderItems",
      });
      OrderItem.belongsTo(models.Course, {
        foreignKey: "courseId",
        targetKey: "id",
        as: "course",
      });
      OrderItem.belongsTo(models.Review, {
        foreignKey: "reviewId",
        targetKey: "id",
        as: "review",
      });
    }
  }
  OrderItem.init(
    {
      orderId: DataTypes.STRING,
      courseId: DataTypes.STRING,
      reviewId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "OrderItem",
    }
  );
  return OrderItem;
};
