"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class CourseCategory extends Model {
    static associate(models) {
      CourseCategory.hasMany(models.Course, {
        foreignKey: "courseCategoryId",
        as: "category",
      });
    }
  }

  CourseCategory.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      categoryName: DataTypes.STRING,
      number: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "CourseCategory",
    }
  );

  return CourseCategory;
};
