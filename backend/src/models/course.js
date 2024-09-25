"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     
Helper method for defining associations.
This method is not a part of Sequelize lifecycle.
The models/index file will call this method automatically.*/
    static associate(models) {
      Course.belongsTo(models.CourseCategory, {
        foreignKey: "categoryId",
        targetKey: "id ",
        as: "categoryData",
      });
      Course.belongsTo(models.AllCode, {
        foreignKey: "courseStatus ",
        targetKey: "key ",
        as: "statusData",
      });
      Course.hasMany(models.Review, {
        foreignKey: "id",
        as: "reviewsData",
      });
      Course.hasMany(models.MyCourse, {
        foreignKey: "id",
        as: "myCoursesData",
      });
      Course.hasMany(models.Chapter, {
        foreignKey: "id",
        as: "chaptersData",
      });
      Course.hasMany(models.CartItem, {
        foreignKey: "id",
        as: "cartItemsData",
      });
      Course.hasOne(models.OrderItem, {
        foreignKey: "id",
        as: "course",
      });
      Course.hasMany(models.IDEUsed, {
        foreignKey: "id",
        as: "course",
      });
    }
  }
  Course.init(
    {
      courseName: DataTypes.STRING,

      categoryId: DataTypes.STRING,

      cost: DataTypes.DOUBLE,

      discount: DataTypes.DOUBLE,

      totalStars: DataTypes.INTEGER,

      reviewers: DataTypes.INTEGER,

      courseStatus: DataTypes.STRING,

      intro: DataTypes.TEXT,

      finishTime: DataTypes.STRING,

      gioiThieu: DataTypes.TEXT("long"),
      anhBia: DataTypes.TEXT("long"),

      chungchiId: DataTypes.STRING,

      teacherId: DataTypes.STRING,

      totalLesson: DataTypes.INTEGER,

      totalStudent: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Course",
    }
  );
  return Course;
};
