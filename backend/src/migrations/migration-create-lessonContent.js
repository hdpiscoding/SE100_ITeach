"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("LessonContents", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      lessonId: {
        type: Sequelize.UUID,
      },
      video: {
        type: Sequelize.STRING,
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
