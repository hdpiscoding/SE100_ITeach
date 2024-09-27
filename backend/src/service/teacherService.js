require("dotenv").config();
import { where } from "sequelize";
import course from "../models/course";
import db from "../models/index";
let createNewCourse = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.Course.create({
        courseName: data.courseName,
        courseCategoryId: data.courseCategoryId,
        cost: data.cost,
        level: data.level,
        intro: data.intro,
        gioiThieu: data.gioiThieu,
        anhBia: data.anhBia,
        teacherId: data.teacherId,
        totalStars: 0,
        totalStudent: 0,
        totalLesson: 0,
        courseStatus: "CS2",
      });
      let teacher = await db.User.findOne({
        where: { id: data.teacherId },
        raw: false, // Ensure id is an integer
      });
      if (teacher) {
        teacher.totalCourseNumber += 1;
        await teacher.save();
      }
      resolve({
        errCode: 0,
        errMessage: "OK",
      });
    } catch (error) {
      reject(error);
    }
  });
};
let getAllCourses = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let courses = "";
      if (data.id === "ALL") {
        courses = await db.Course.findAll();
      }
      resolve({
        errCode: 0,
        errMessage: "OK",
        courses,
      });
      if (data.id & (data.id !== "All")) {
        courses = await db.Course.findOne({
          where: { id: parseInt(data.id) },
        });
        if (!courses) {
          resolve({
            errCode: 1,
            errMessage: "Invalid id",
          });
        } else {
          resolve({
            errCode: 0,
            errMessage: "OK",
            courses,
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};
let deleteACourse = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let Course = await db.Course.findOne({
        where: { id: parseInt(data.id) },
      });
      if (!Course) {
        resolve({
          errCode: 2,
          errMessage: "Invalid id",
        });
      }
      await db.Course.destroy({ where: { id: parseInt(data.id) } });
      resolve({
        errCode: 0,
        errMessage: "Deleted",
      });
    } catch (error) {
      reject(error);
    }
  });
};
let editACourse = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({ errCode: 2, errMessage: "Invalid id" });
      }
      let course = await db.Course.findOne({
        where: { id: data.id },
        raw: false, // Ensure id is an integer
      });

      if (course) {
        course.courseName = data.courseName;
        course.courseCategoryId = data.courseCategoryId; // Corrected assignment
        course.cost = data.cost;
        course.level = data.level;
        course.discount = data.discount;
        course.intro = data.intro;
        course.finishTime = data.finishTime;
        course.gioiThieu = data.gioiThieu;
        course.anhBia = data.anhBia;
        course.chungchiId = data.chungchiId;
        await course.save(); // Save the instance
        resolve({
          errCode: 0,
          errMessage: "Edited",
        });
      } else {
        resolve({
          errCode: 1,
          errMessage: "Course not found",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
let getMyCourse = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let courses = await db.Course.findAll({
        where: { teacherId: data.teacherId },
      });
      if (!courses) {
        resolve({
          errCode: 1,
          errMessage: "No course found",
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
let PutALesson = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let lesson = await db.Lesson.findOne({
        where: { id: data.id },
        raw: false, // Ensure id is an integer
      });
      let lessonContent = await db.LessonContent.findOne({
        where: { lessonId: data.id },
        raw: false,
      });
      if (lesson) {
        lesson.name = data.name;
        lesson.chapter = data.chapter;
        lesson.studyTime = data.studyTime;

        lessonContent.video = data.video;
        lessonContent.contentHtml = data.contentHtml;
        lessonContent.contentMarkDown = data.contentMarkDown;
        lessonContent.exerciseHtml = data.exerciseHtml;
        lessonContent.exerciseMarkDown = data.exerciseMarkDown;
        await lesson.save(); // Save the instance
        await lessonContent.save();

        resolve({
          errCode: 0,
          errMessage: "Edited",
        });
      } else {
        resolve({
          errCode: 1,
          errMessage: "lesson not found",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
let PostALesson = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.Lesson.create({
        name: data.name,
        courseId: data.courseId,
        chapter: data.chapter,
        studyTime: data.studyTime,
      });
      let latestLesson = await db.Lesson.findOne({
        where: { courseId: data.courseId },
        order: [["id", "DESC"]],
      });
      await db.LessonContent.create({
        lessonId: latestLesson.id,
        video: data.video,
        contentHtml: data.contentHtml,
        contentMarkDown: data.contentMarkDown,
        exerciseHtml: data.exerciseHtml,
        exerciseMarkDown: data.exerciseMarkDown,
      });
      let course = await db.Course.findOne({
        where: { id: data.courseId },
        raw: false,
      });
      if (course) {
        course.totalLesson += 1;
        await course.save();
      }

      resolve({
        errCode: 0,
        errMessage: "OK",
      });
    } catch (error) {
      reject(error);
    }
  });
};
let deleteALesson = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let Lesson = await db.Lesson.findOne({
        where: { id: parseInt(data.id) },
      });
      if (!Lesson) {
        resolve({
          errCode: 2,
          errMessage: "Invalid id",
        });
      }
      await db.Lesson.destroy({ where: { id: parseInt(data.id) } });
      await db.LessonContent.destroy({
        where: { lessonId: data.id },
      });
      resolve({
        errCode: 0,
        errMessage: "Deleted",
      });
    } catch (error) {
      reject(error);
    }
  });
};
let getIDEUse = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let IDEUseds = await db.IDEUsed.findAll({
        where: { courseId: data.courseId },
        order: [["date", "ASC"]],
        attributes: { exclude: ["createdAt", "updatedAt"] }, // Exclude the createdAt field
      });
      if (!IDEUseds) {
        resolve({
          errCode: 1,
          errMessage: "No IDE use found",
        });
      } else {
        resolve({
          errCode: 0,
          errMessage: "OK",
          IDEUseds,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
let postIDEUse = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let IDEUsed = await db.IDEUsed.findOne({
        where: { courseId: data.courseId, date: data.date },
        raw: false,
      });
      if (IDEUsed) {
        IDEUsed.number += 1;
        await IDEUsed.save();
      } else {
        await db.IDEUsed.create({
          courseId: data.courseId,
          date: data.date,
          number: 1,
        });
      }
      resolve({
        errCode: 0,
        errMessage: "OK",
      });
    } catch (error) {
      reject(error);
    }
  });
};
let getMyAccountInformation = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let teacher = await db.User.findOne({
        where: { id: data.teacherId },
        attributes: { exclude: ["password", "createdAt", "updatedAt"] },
      });
      if (!teacher) {
        resolve({
          errCode: 1,
          errMessage: "No teacher found",
        });
      } else {
        resolve({
          errCode: 0,
          errMessage: "OK",
          teacher,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = {
  createNewCourse,
  getAllCourses,
  deleteACourse,
  editACourse,
  getMyCourse,
  PutALesson,
  PostALesson,
  deleteALesson,
  getIDEUse,
  postIDEUse,
  getMyAccountInformation,
};
