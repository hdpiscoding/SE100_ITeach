"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     
Helper method for defining associations.
This method is not a part of Sequelize lifecycle.
The models/index file will call this method automatically.*/
    static associate(models) {
      // define association here
      Order.hasMany(models.OrderItem, {
        foreignKey: "orderId",
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
