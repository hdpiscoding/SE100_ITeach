"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Lessons", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      chapterId: {
        type: Sequelize.STRING,
      },
      name: {
        type: Sequelize.STRING,
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
        type: Sequelize.STRING,
      },
      exerciseMarkDown: {
        type: Sequelize.STRING,
      },
      studyTime: {
        type: Sequelize.DOUBLE,
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
    await queryInterface.dropTable("lessons");
  },
};
