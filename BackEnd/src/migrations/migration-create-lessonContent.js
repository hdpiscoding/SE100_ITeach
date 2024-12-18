"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("LessonContents", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      lessonId: {
        type: Sequelize.INTEGER,
      },
      video: {
        type: Sequelize.TEXT("long"),
      },
      contentHtml: {
        type: Sequelize.TEXT("long"),
      },
      contentMarkDown: {
        type: Sequelize.TEXT("long"),
      },
      exerciseHtml: {
        type: Sequelize.TEXT("long"),
      },
      exerciseMarkDown: {
        type: Sequelize.TEXT("long"),
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
    await queryInterface.dropTable("lessonContents");
  },
};
