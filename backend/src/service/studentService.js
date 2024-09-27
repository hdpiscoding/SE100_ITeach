require("dotenv").config();
import bcrypt from "bcryptjs";
import db from "../models/index";
const { Op } = require("sequelize");
let getAllCourses = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      let courses = await db.Course.findAll();
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
      let boughtCourses = await db.Order.findAll({
        where: { userId: id },
        include: [
          {
            model: db.OrderItem,
            include: [
              {
                model: db.Course,
                as: "course",
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
          errMessage: "No bought courses found",
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
};
