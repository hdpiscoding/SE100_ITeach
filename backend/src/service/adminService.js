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

      let totalStudents = await db.User.count({
        where: {
          role: "R1",
        },
      });

      let studentsThisMonth = await db.User.count({
        where: {
          role: "R1",
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

      let studentsLastMonth = await db.User.count({
        where: {
          role: "R1",
          createdAt: {
            [db.Sequelize.Op.and]: [
              db.Sequelize.where(
                db.Sequelize.fn(
                  "EXTRACT",
                  db.Sequelize.literal(`MONTH FROM "createdAt"`)
                ),
                data.month - 1
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

      let studentGrowthRate =
        ((studentsThisMonth - studentsLastMonth) / studentsLastMonth) * 100;
      if (!studentGrowthRate) studentGrowthRate = 0;
      if (!totalCost) totalCost = 0;
      if (!totalCourseSell) totalCourseSell = 0;
      if (!totalLessons) totalLessons = 0;
      if (!totalCourses) totalCourses = 0;
      if (!totalTeachers) totalTeachers = 0;
      if (!studentsThisMonth) studentsThisMonth = 0;
      if (!studentGrowthRate) studentGrowthRate = 0;
      if (!totalStudents) totalStudents = 0;

      resolve({
        errCode: 0,
        errMessage: "OK",
        totalTeachers,
        totalCourses,
        totalLessons,
        totalCourseSell,
        totalCost,
        studentsThisMonth,
        studentGrowthRate,
      });
    } catch (error) {
      reject(error);
    }
  });
};
let getAllReviews = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let reviews = await db.Review.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });
      if (!reviews) {
        resolve({
          errCode: 1,
          errMessage: "No reviews found",
        });
      } else {
        resolve({
          errCode: 0,
          errMessage: "OK",
          reviews,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
let approveCourse = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.courseId) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameters",
        });
      } else {
        let course = await db.Course.update(
          { courseStatus: "CS1" },
          { where: { id: data.courseId } }
        );
        resolve({
          errCode: 0,
          errMessage: "OK",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
let stopCourse = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.courseId) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameters",
        });
      } else {
        let course = await db.Course.update(
          { courseStatus: "CS3" },
          { where: { id: data.courseId } }
        );
        resolve({
          errCode: 0,
          errMessage: "OK",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
let deleteCourse = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.courseId) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameters",
        });
      } else {
        let course = await db.Course.destroy({ where: { id: data.courseId } });
        await db.Chapter.destroy({ where: { courseId: data.courseId } });
        const destroyLesson = await db.Lesson.findAll({
          where: { courseId: data.courseId },
        });
        destroyLesson.forEach(async (lesson) => {
          await db.LessonContent.destroy({
            where: { lessonId: lesson.id },
          });
          await db.LessonComment.destroy({
            where: { lessonId: lesson.id },
          });
        });
        await db.Lesson.destroy({ where: { courseId: data.courseId } });

        resolve({
          errCode: 0,
          errMessage: "OK",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
const getAllCourseOfTeacher = (teacherId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let courses = await db.Course.findAll({
        where: {
          teacherId: teacherId,
        },
        attributes: [
          "id",
          "courseName",
          "cost",
          "discount",
          "anhBia",
          "intro",
          "level",
          "totalStudent",
          "totalStars",
          "createdAt",
          "courseStatus",
          "totalStudent",
          "finishTime",
          "level",
        ],
        include: [
          {
            model: db.CourseCategory,
            as: "category",
            attributes: ["id", "categoryName"],
          },
        ],
        nest: true,
        raw: true,
      });
      if (courses && courses.length > 0) {
        resolve({
          errCode: 0,
          data: courses,
        });
      } else {
        resolve({
          errCode: 1,
          errMessage: "No courses found",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
const createNewCourseCategory = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.name) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameters",
        });
      } else {
        let category = await db.CourseCategory.create({
          categoryName: data.name,
        });
        resolve({
          errCode: 0,
          errMessage: "OK",
          id: category.id,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
const getChartData = (year) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = [];
      for (let i = 1; i <= 12; i++) {
        let totalCost = await db.Order.sum("totalCost", {
          where: {
            createdAt: {
              [db.Sequelize.Op.and]: [
                db.Sequelize.where(
                  db.Sequelize.fn(
                    "EXTRACT",
                    db.Sequelize.literal(`MONTH FROM "createdAt"`)
                  ),
                  i
                ),
                db.Sequelize.where(
                  db.Sequelize.fn(
                    "EXTRACT",
                    db.Sequelize.literal(`YEAR FROM "createdAt"`)
                  ),
                  year
                ),
              ],
            },
          },
        });
        if (!totalCost) totalCost = 0;
        {
          let dataa = {
            month: i,
            totalCost: totalCost,
          };
          data.push(dataa);
        }
      }
      resolve({
        errCode: 0,
        data,
      });
    } catch (e) {
      reject(e);
    }
  });
};
const deleteCourseCategories = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameters",
        });
      } else {
        let category = await db.CourseCategory.destroy({
          where: { id: data.id },
        });
        resolve({
          errCode: 0,
          errMessage: "OK",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
const postCourseCategories = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.name) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameters",
        });
      } else {
        let category = await db.CourseCategory.create({
          categoryName: data.name,
        });
        resolve({
          errCode: 0,
          errMessage: "OK",
          id: category.id,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
const putCourseCategories = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.name) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameters",
        });
      } else {
        let category = await db.CourseCategory.update(
          { categoryName: data.name },
          { where: { id: data.id } }
        );
        resolve({
          errCode: 0,
          errMessage: "OK",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  getAllTeacher,
  getPopularTeacher,
  getPopularCourse,
  getAnalysisInformation,
  getAllReviews,
  approveCourse,
  stopCourse,
  deleteCourse,
  getAllCourseOfTeacher,
  createNewCourseCategory,
  getChartData,
  deleteCourseCategories,
  postCourseCategories,
  putCourseCategories,
};
