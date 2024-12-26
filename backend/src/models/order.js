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
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      totalCost: DataTypes.DOUBLE,
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
