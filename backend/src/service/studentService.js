require("dotenv").config();
import bcrypt from "bcryptjs";
import db from "../models/index";
import { raw } from "body-parser";
const { Op } = require("sequelize");
let getAllCourses = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      let courses = await db.Course.findAll({
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
let getAllCoursesCategories = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      let courses = await db.CourseCategory.findAll();
      if (courses && courses.length > 0) {
        resolve({
          errCode: 0,
          data: courses,
        });
      } else {
        resolve({
          errCode: 1,
          errMessage: "No courses categories found",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let getStudentsOrders = async (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let courses = await db.Order.findAll();
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
let checkStudentBuyCourse = async (studentId, courseId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let check;
      let order = await db.Order.findAll({
        where: { userId: studentId },
        raw: true,
        include: [
          {
            model: db.OrderItem,
            where: { courseId: courseId },
          },
        ],
      });
      if (order && order.length > 0) {
        check = true;
      } else {
        check = false;
      }
      resolve({
        errCode: 0,
        check: check,
      });
    } catch (e) {
      reject(e);
    }
  });
};
let getStudentsOrdersItems = async (orderId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let orderItems = await db.OrderItem.findAll({
        where: { orderId: orderId },
      });
      if (orderItems && orderItems.length > 0) {
        resolve({
          errCode: 0,
          data: orderItems,
        });
      } else {
        resolve({
          errCode: 1,
          errMessage: "No order items found",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let getCartItems = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let cart = await db.CartItem.findAll({
        where: { userId: id },
        include: [
          {
            model: db.Course,
            attributes: ["courseName", "cost", "anhBia"],
          },
        ],
      });
      if (cart && cart.length > 0) {
        resolve({
          errCode: 0,
          data: cart,
        });
      } else {
        resolve({
          errCode: 1,
          errMessage: "No cart items found",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let getBoughtCourses = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let myCourses = await db.MyCourse.findAll({
        where: { userId: id },
        include: [
          {
            model: db.Course,
            attributes: [
              "id",
              "courseName",
              "cost",
              "discount",
              "anhBia",
              "intro",
              "level",

              "totalStudent",
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
          },
        ],
      });
      if (myCourses && myCourses.length > 0) {
        resolve({
          errCode: 0,
          data: myCourses,
        });
      } else {
        resolve({
          errCode: 1,
          errMessage: "Not found any courses",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let getUnusedCourses = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let boughtCourses = await db.Order.findAll({
        where: { userId: { [Op.ne]: id } },
        include: [
          {
            model: db.OrderItem,
            include: [
              {
                model: db.Course,
                as: "course",
                attributes: [
                  "id",
                  "courseName",
                  "cost",
                  "discount",
                  "anhBia",
                  "intro",
                  "level",

                  "totalStudent",
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
              },
            ],
          },
        ],
      });
      if (boughtCourses && boughtCourses.length > 0) {
        resolve({
          errCode: 0,
          data: boughtCourses,
        });
      } else {
        resolve({
          errCode: 1,
          errMessage: "No unused courses found",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let getAllCertificates = () => {
  return new Promise(async (resolve, reject) => {
    try {
    } catch (e) {
      reject(e);
    }
  });
};
let postLessonComments = (data) => {
  return new Promise(async (resolve, reject) => {
    let parent = data.parentId ? data.parentId : null;
    await db.LessonComment.create({
      userId: data.userId,
      lessonId: data.lessonId,
      content: data.content,
      parrentCommentId: parent,
    });
    resolve({
      errCode: 0,
      errMessage: "OK",
    });
    try {
    } catch (e) {
      reject(e);
    }
  });
};
let postReview = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.Review.create({
        userId: data.userId,
        courseId: data.courseId,
        star: data.star,
        content: data.content,
      });
      resolve({
        errCode: 0,
        errMessage: "OK",
      });
    } catch (e) {
      reject(e);
    }
  });
};
let buyCourse = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const order = await db.Order.create({
        userId: data.studentId,
        totalCost: data.totalCost,
      });
      const orderId = order.id;
      for (const item of data.oderItems) {
        await db.OrderItem.create({
          orderId: orderId,
          courseId: item,
        });
        const course = await db.Course.findOne({
          where: { id: item },
          raw: false,
        });
        if (course) {
          course.totalStudent += 1;
          await course.save();

          // Tìm Teacher tương ứng
          const teacher = await db.User.findOne({
            where: { id: course.teacherId },
            raw: false,
          });
          if (teacher) {
            teacher.totalStudentNumber += 1;
            await teacher.save();
          }
        }
      }

      resolve({
        errCode: 0,
        errMessage: "OK",
      });
    } catch (e) {
      reject(e);
    }
  });
};
let getDetailCourseInfo = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = {};
      result.course = await db.Course.findOne({
        where: { id: id },
        include: [
          {
            model: db.User,
            as: "teacher",
            attributes: ["id", "firstName", "lastName"],
          },
          {
            model: db.CourseCategory,
            as: "category",
            attributes: ["id", "categoryName"],
          },
        ],
        nest: true,
        raw: true,
      });
      result.chapters = await db.Chapter.findAll({
        where: { courseId: id },
        attributes: ["id", "chapterName", "courseId"],

        include: [
          {
            model: db.Lesson,
            as: "lessons",
            attributes: ["id", "name", "studyTime"],
          },
        ],
        nest: true,
        raw: true,
      });

      result.reviews = await db.Review.findAll({
        where: { courseId: id },
        attributes: ["content", "star"],

        include: [
          {
            model: db.User,
            as: "user",
            attributes: ["id", "firstName", "lastName", "avatar"],
          },
        ],
        nest: true,
        raw: true,
      });
      if (result) {
        resolve({
          errCode: 0,
          data: result,
        });
      } else {
        resolve({
          errCode: 1,
          errMessage: "Course not found",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let getListChapters = (courseId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let chapters = await db.Chapter.findAll({
        where: { courseId: courseId },
        attributes: ["id", "chapterName", "courseId"],

        include: [
          {
            model: db.Lesson,
            as: "lessons",
            attributes: ["id", "name", "studyTime"],
          },
        ],
        nest: true,
        raw: true,
      });
      if (chapters && chapters.length > 0) {
        resolve({
          errCode: 0,
          data: chapters,
        });
      } else {
        resolve({
          errCode: 1,
          errMessage: "No chapters found",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let getLessonContent = (lessonId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = {};
      result.content = await db.LessonContent.findOne({
        where: { lessonId: lessonId },
        attributes: [
          "lessonId",
          "video",
          "contentHtml",
          "contentMarkDown",
          "exerciseHtml",
          "exerciseMarkDown",
        ],
      });
      result.comments = await db.LessonComment.findAll({
        where: { lessonId: lessonId },
        attributes: [
          "id",
          "content",
          "userId",
          "parrentCommentId",
          "createdAt",
        ],
        include: [
          {
            model: db.User,
            as: "userInfo",
            attributes: ["id", "firstName", "lastName", "avatar"],
          },
        ],
        nest: true,
        raw: true,
      });
      if (result) {
        resolve({
          errCode: 0,
          data: result,
        });
      } else {
        resolve({
          errCode: 1,
          errMessage: "No lesson found",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  getAllCourses,
  getAllCoursesCategories,
  getStudentsOrders,
  checkStudentBuyCourse,
  getStudentsOrdersItems,
  getCartItems,
  getBoughtCourses,
  getUnusedCourses,
  getAllCertificates,
  postLessonComments,
  postReview,
  buyCourse,
  getDetailCourseInfo,
  getListChapters,
  getLessonContent,
};
