"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Courses", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      courseName: {
        type: Sequelize.STRING,
      },
      courseCategoryId: {
        type: Sequelize.INTEGER,
      },
      courseCategoryId: {
        type: Sequelize.INTEGER,
      },
      cost: {
        type: Sequelize.DOUBLE,
      },

      level: {
        type: Sequelize.STRING,
      },
      discount: {
        type: Sequelize.DOUBLE,
      },
      totalStars: {
        type: Sequelize.INTEGER,
      },
      reviewers: {
        type: Sequelize.INTEGER,
      },
      courseStatus: {
        type: Sequelize.STRING,
      },
      intro: {
        type: Sequelize.TEXT,
      },
      finishTime: {
        type: Sequelize.STRING,
      },
      gioiThieu: {
        type: Sequelize.TEXT("long"),
      },
      anhBia: {
        type: Sequelize.BLOB("long"),
      },
      chungchiId: {
        type: Sequelize.STRING,
      },
      teacherId: {
        type: Sequelize.INTEGER,
      },
      totalLesson: {
        type: Sequelize.INTEGER,
      },
      totalStudent: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("courses");
  },
};
