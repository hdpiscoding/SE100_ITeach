"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Lessons", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      courseId: {
        type: Sequelize.UUID,
      },
      chapter: {
        type: Sequelize.INTEGER,
      },
      name: {
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
