"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("MyCourses", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      userId: {
        type: Sequelize.UUID,
      },
      courseId: {
        type: Sequelize.UUID,
      },
      currentLessonId: {
        type: Sequelize.UUID,
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
