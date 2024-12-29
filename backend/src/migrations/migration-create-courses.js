"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Courses", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      courseName: {
        type: Sequelize.STRING,
      },
      courseCategoryId: {
        type: Sequelize.UUID,
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
        type: Sequelize.DOUBLE,
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
        type: Sequelize.STRING,
      },
      chungchiId: {
        type: Sequelize.UUID,
      },
      teacherId: {
        type: Sequelize.UUID,
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
