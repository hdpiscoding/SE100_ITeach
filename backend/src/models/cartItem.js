"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CartItem extends Model {
    /**
     
Helper method for defining associations.
This method is not a part of Sequelize lifecycle.
The models/index file will call this method automatically.*/
    static associate(models) {
      CartItem.belongsTo(models.User, {
        foreignKey: "userId",
        targetKey: "id",
        as: "user",
      });
      CartItem.belongsTo(models.Course, {
        foreignKey: "courseId",
        targetKey: "id",
        as: "cartItemsData",
      });
    }
  }
  CartItem.init(
    {
      userId: DataTypes.STRING,
      courseId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "CartItem",
    }
  );
  return CartItem;
};
