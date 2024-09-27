"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CartItem extends Model {
    /**
     
Helper method for defining associations.
This method is not a part of Sequelize lifecycle.
The models/index file will call this method automatically.*/
    static associate(models) {}
  }
  CartItem.init(
    {
      userId: DataTypes.INTEGER,
      courseId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "CartItem",
    }
  );
  return CartItem;
};
