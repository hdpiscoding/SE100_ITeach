require("dotenv").config();
import { where } from "sequelize";
import course from "../models/course";
const { Op, fn, col, literal } = require("sequelize");
import db from "../models/index";
import nodemailer from "nodemailer";
let createNewCourse = (data) => {
  console.log(data);
  return new Promise(async (resolve, reject) => {
    try {
      let newCourse = await db.Course.create({
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
        markDown: data.markDown,
        discount: data.discount,
      });
      console.log(newCourse);
      let teacher = await db.User.findOne({
        where: { id: data.teacherId },
        raw: false, // Ensure id is an integer
      });
      if (teacher) {
        teacher.totalCourseNumber += 1;
        await teacher.save();
      }

      let newCourseId = newCourse ? newCourse.id : null;
      await sendEmailToStudent(data.teacherId, data.courseName);

      resolve({
        errCode: 0,
        errMessage: "OK",
        courseId: newCourseId,
      });
    } catch (error) {
      console.log(error);
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
          where: { id: data.id },
          where: { id: data.id },
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
let deleteACourse = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let Course = await db.Course.findOne({
        where: { id: id },
      });
      if (!Course) {
        resolve({
          errCode: 2,
          errMessage: "Invalid id",
        });
      }
      await db.Course.destroy({ where: { id: id } });
      await db.Chapter.destroy({ where: { courseId: id } });
      const destroyLesson = await db.Lesson.findAll({
        where: { courseId: id },
      });
      destroyLesson.forEach(async (lesson) => {
        await db.LessonContent.destroy({
          where: { lessonId: lesson.id },
        });
        await db.LessonComment.destroy({
          where: { lessonId: lesson.id },
        });
      });
      await db.Lesson.destroy({ where: { courseId: id } });
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
        course.markDown = data.markDown;
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
let getMyCourse = (teacherId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let courses = await db.Course.findAll({
        where: { teacherId: teacherId },
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
      let order = await db.Lesson.findOne({
        where: { courseId: data.courseId },
        order: [["lessonOrder", "DESC"]],
      });

      await db.Lesson.create(
        {
          name: data.name,
          courseId: data.courseId,
          chapter: data.chapter,
          lessonOrder: order ? order.lessonOrder + 1 : 0,
          studyTime: data.studyTime,
        },
        {
          returning: [
            "id",
            "courseId",
            "name",
            "chapter",
            "lessonOrder",
            "studyTime",
            "createdAt",
            "updatedAt",
          ], // Exclude "course"
        }
      );
      let latestLesson = await db.Lesson.findOne({
        where: { courseId: data.courseId },
        order: [["createdAt", "DESC"]],
      });
      await db.LessonContent.create({
        lessonId: latestLesson.id,
        video: data.video,
        contentHtml: data.contentHtml,
        contentMarkDown: data.contentMarkDown,
        exerciseHtml: data.exerciseHtml,
        exerciseMarkDown: data.exerciseMarkDown,
      });

      const lessonCount = await db.Lesson.count({
        where: { courseId: data.courseId },
      });

      let course = await db.Course.findOne({
        where: { id: data.courseId },
        raw: false,
      });
      if (course) {
        course.totalLesson = lessonCount;
        await course.save();
      }

      resolve({
        errCode: 0,
        errMessage: "OK",
        lessonId: latestLesson.id,
      });
    } catch (error) {
      reject(error);
    }
  });
};
let deleteALesson = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let Lesson = await db.Lesson.findOne({
        where: { id: id },
      });
      if (!Lesson) {
        resolve({
          errCode: 2,
          errMessage: "Invalid id",
        });
      }
      await db.Lesson.destroy({ where: { id: id } });
      await db.LessonContent.destroy({
        where: { lessonId: id },
      });

      const lessonCount = await db.Lesson.count({
        where: { courseId: Lesson.courseId },
      });

      let course = await db.Course.findOne({
        where: { id: Lesson.courseId },
        raw: false,
      });

      if (course) {
        course.totalLesson = lessonCount;
        await course.save();
      }
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
        where: {
          courseId: data.courseId,
          [Op.and]: [
            literal(
              `EXTRACT(YEAR FROM "date") = ${new Date(data.date).getFullYear()}`
            ),
            literal(
              `EXTRACT(MONTH FROM "date") = ${
                new Date(data.date).getMonth() + 1
              }`
            ),
            literal(
              `EXTRACT(DAY FROM "date") = ${new Date(data.date).getDate()}`
            ),
          ],
        },
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
let getAllStudentOfCourse = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let students = await db.MyCourse.findAll({
        where: { courseId: data.courseId },
        attributes: { exclude: ["createdAt", "updatedAt"] },
        include: [
          {
            model: db.User,
            attributes: { exclude: ["password", "createdAt", "updatedAt"] },
          },
        ],
        raw: true,
        nest: true,
      });

      if (!students) {
        resolve({
          errCode: 1,
          errMessage: "No students found",
        });
      } else {
        resolve({
          errCode: 0,
          errMessage: "OK",
          students,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
let createNewChapter = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let newChapter = await db.Chapter.create({
        chapterName: data.chapterName,
        courseId: data.courseId,
      });
      let newChapterId = newChapter ? newChapter.id : null;
      resolve({
        errCode: 0,
        errMessage: "OK",
        chapterId: newChapterId,
      });
    } catch (error) {
      reject(error);
    }
  });
};
let getAllChapter = (courseId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let chapters = await db.Chapter.findAll({
        where: { courseId: courseId }, // Use courseId directly
        attributes: { exclude: ["createdAt", "updatedAt"] },
        order: [["id", "ASC"]],
      });
      if (!chapters) {
        resolve({
          errCode: 1,
          errMessage: "No chapter found",
        });
      } else {
        resolve({
          errCode: 0,
          errMessage: "OK",
          chapters,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
let putAChapter = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let chapter = await db.Chapter.findOne({
        where: { id: data.id },
        raw: false, // Ensure id is an integer
      });
      if (chapter) {
        chapter.chapterName = data.chapterName;
        await chapter.save(); // Save the instance
        resolve({
          errCode: 0,
          errMessage: "Edited",
        });
      } else {
        resolve({
          errCode: 1,
          errMessage: "Chapter not found",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
let deleteAChapter = (id) => {
  return new Promise(async (resolve, reject) => {
    console.log("deleteAChapter");
    try {
      let chapter = await db.Chapter.findOne({
        where: { id: id },
      });
      console.log("fine one");
      if (!chapter) {
        resolve({
          errCode: 2,
          errMessage: "Invalid id",
        });
      }
      await db.Chapter.destroy({ where: { id: id } });
      resolve({
        errCode: 0,
        errMessage: "Deleted",
      });
    } catch (error) {
      reject(error);
    }
  });
};

let getIDEUseByMonth = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let IDEUseds = await db.IDEUsed.findAll({
        where: {
          courseId: data.courseId,
          [Op.and]: [
            literal(`EXTRACT(YEAR FROM "date") = ${data.year}`),
            literal(`EXTRACT(MONTH FROM "date") = ${data.month}`),
          ],
        },
        order: [["date", "ASC"]],
        attributes: { exclude: ["createdAt", "updatedAt"] },
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
const sendEmailToStudent = (teacherId, courseName) => {
  return new Promise(async (resolve, reject) => {
    try {
      let teacher = await db.User.findOne({
        where: { id: teacherId },
        raw: false,
      });
      let course = await db.Course.findAll({
        where: { teacherId: teacherId },
        raw: false,
      });
      let students = [];
      for (let c of course) {
        let courseStudents = await db.MyCourse.findAll({
          where: { courseId: c.id },
          include: [
            {
              model: db.User,
              attributes: ["email"],
            },
          ],
          raw: true,
          nest: true,
        });
        students = students.concat(courseStudents);
      }
      console.log("students", students);
      let studentEmails = students.map((student) => student.User.email);

      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "hung07092004@gmail.com",
          pass: process.env.EMAIL_PASSWORD,
        },
      });

      let mailOptions = {
        from: "hung07092004@gmail.com",
        to: studentEmails,
        subject: `Thông báo ra mắt khóa học ${courseName}`,
        html: `
          <h1>Xin chào,</h1>
          <p>Khóa học <strong>${courseName}</strong> của giáo viên <strong>${teacher.firstName} ${teacher.lastName}</strong> đã chính thức ra mắt.</p>
          <p>Hãy truy cập vào hệ thống để bắt đầu học ngay hôm nay!</p>
          <p>Trân trọng,</p>
          <p>Đội ngũ ITeach</p>
        `,
      };

      await transporter.sendMail(mailOptions);

      resolve({
        errCode: 0,
        errMessage: "Emails sent successfully",
      });
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
  getAllStudentOfCourse,
  createNewChapter,
  getAllChapter,
  putAChapter,
  deleteAChapter,
  getIDEUseByMonth,
  sendEmailToStudent,
};
