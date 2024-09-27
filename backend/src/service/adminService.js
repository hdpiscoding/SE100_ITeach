require("dotenv").config();
import { where } from "sequelize";
import course from "../models/course";
import db from "../models/index";
let getAllTeacher = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let teachers = await db.User.findAll({
        where: { role: "R2" },
        attributes: { exclude: ["password", "createdAt", "updatedAt"] },
      });
      if (!teachers) {
        resolve({
          errCode: 1,
          errMessage: "No teacher found",
        });
      } else {
        resolve({
          errCode: 0,
          errMessage: "OK",
          teachers,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
let getPopularTeacher = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let teachers = await db.User.findAll({
        where: {
          role: "R2",
          // Exclude records where totalStudentNumber is null
        }, // Exclude records where totalStudentNumber is null,
        attributes: { exclude: ["password", "createdAt", "updatedAt"] },
        order: [["totalStudentNumber", "DESC"]],
        limit: 10,
      });
      if (!teachers) {
        resolve({
          errCode: 1,
          errMessage: "No teacher found",
        });
      } else {
        resolve({
          errCode: 0,
          errMessage: "OK",
          teachers,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
let getPopularCourse = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let courses = await db.Course.findAll({
        where: {}, // Exclude records where totalStudentNumber is null,

        order: [["totalStudent", "DESC"]],
        attributes: { exclude: ["createdAt", "updatedAt", "chungchiId"] },
        limit: 10,
      });
      if (!courses) {
        resolve({
          errCode: 1,
          errMessage: "No courses found",
        });
      } else {
        resolve({
          errCode: 0,
          errMessage: "OK",
          courses,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
let getAnalysisInformation = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let totalTeachers = await db.User.count({
        where: {
          role: "R2",
          createdAt: {
            [db.Sequelize.Op.and]: [
              db.Sequelize.where(
                db.Sequelize.fn(
                  "EXTRACT",
                  db.Sequelize.literal(`MONTH FROM "createdAt"`)
                ),
                data.month
              ),
              db.Sequelize.where(
                db.Sequelize.fn(
                  "EXTRACT",
                  db.Sequelize.literal(`YEAR FROM "createdAt"`)
                ),
                data.year
              ),
            ],
          },
        },
      });
      let totalCourses = await db.Course.count({
        where: {
          createdAt: {
            [db.Sequelize.Op.and]: [
              db.Sequelize.where(
                db.Sequelize.fn(
                  "EXTRACT",
                  db.Sequelize.literal(`MONTH FROM "createdAt"`)
                ),
                data.month
              ),
              db.Sequelize.where(
                db.Sequelize.fn(
                  "EXTRACT",
                  db.Sequelize.literal(`YEAR FROM "createdAt"`)
                ),
                data.year
              ),
            ],
          },
        },
      });
      let totalLessons = await db.Lesson.count({
        where: {
          createdAt: {
            [db.Sequelize.Op.and]: [
              db.Sequelize.where(
                db.Sequelize.fn(
                  "EXTRACT",
                  db.Sequelize.literal(`MONTH FROM "createdAt"`)
                ),
                data.month
              ),
              db.Sequelize.where(
                db.Sequelize.fn(
                  "EXTRACT",
                  db.Sequelize.literal(`YEAR FROM "createdAt"`)
                ),
                data.year
              ),
            ],
          },
        },
      });
      let totalCourseSell = await db.OrderItem.count({
        where: {
          createdAt: {
            [db.Sequelize.Op.and]: [
              db.Sequelize.where(
                db.Sequelize.fn(
                  "EXTRACT",
                  db.Sequelize.literal(`MONTH FROM "createdAt"`)
                ),
                data.month
              ),
              db.Sequelize.where(
                db.Sequelize.fn(
                  "EXTRACT",
                  db.Sequelize.literal(`YEAR FROM "createdAt"`)
                ),
                data.year
              ),
            ],
          },
        },
      });
      let totalCost = await db.Order.sum("totalCost", {
        where: {
          createdAt: {
            [db.Sequelize.Op.and]: [
              db.Sequelize.where(
                db.Sequelize.fn(
                  "EXTRACT",
                  db.Sequelize.literal(`MONTH FROM "createdAt"`)
                ),
                data.month
              ),
              db.Sequelize.where(
                db.Sequelize.fn(
                  "EXTRACT",
                  db.Sequelize.literal(`YEAR FROM "createdAt"`)
                ),
                data.year
              ),
            ],
          },
        },
      });

      resolve({
        errCode: 0,
        errMessage: "OK",
        totalTeachers,
        totalCourses,
        totalLessons,
        totalCourseSell,
      });

      resolve({
        errCode: 0,
        errMessage: "OK",
        totalTeachers,
      });
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = {
  getAllTeacher,
  getPopularTeacher,
  getPopularCourse,
  getAnalysisInformation,
};
