"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     
Helper method for defining associations.
This method is not a part of Sequelize lifecycle.
The models/index file will call this method automatically.*/
    static associate(models) {
      Order.belongsTo(models.User, {
        foreignKey: "userId",
        targetKey: "id",
        as: "user",
      });
      Order.hasMany(models.OrderItem, {
        foreignKey: "id",
        as: "orderItems",
      });
    }
  }
  Order.init(
    {
      userId: DataTypes.STRING,
      date: DataTypes.DATE,
      totalCost: DataTypes.DOUBLE,
      paymentMethod: DataTypes.STRING,
      shipping: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
