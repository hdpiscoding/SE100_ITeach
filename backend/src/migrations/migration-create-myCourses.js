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
        type: Sequelize.INTEGER,
      },
      courseId: {
        type: Sequelize.INTEGER,
      },
      process: {
        type: Sequelize.STRING,
      }, // bài mấy chương mấy
      numberOfProcess: {
        type: Sequelize.INTEGER,
      }, // bài sô bao nhiêu trên tổng số bài

      courseRole: {
        type: Sequelize.STRING,
      }, // CR1=giaoVien CR2=hocSinh
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
