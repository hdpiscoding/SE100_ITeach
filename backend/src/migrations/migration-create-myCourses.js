"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("MyCourses", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.STRING,
      },
      courseId: {
        type: Sequelize.STRING,
      },
      process: {
        type: Sequelize.STRING,
      }, // bài mấy chương mấy
      numberOfProcess: {
        type: Sequelize.INTEGER,
      }, // bài sô bao nhiêu trên tổng số bài

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
    await queryInterface.dropTable("MyCourses");
  },
};
