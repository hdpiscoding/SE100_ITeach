require("dotenv").config();
import bcrypt from "bcryptjs";
import db from "../models/index";
import { createJWT, verifyJWT } from "../middleware/JWTAction";
const salt = bcrypt.genSaltSync(10);

let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (error) {
      reject(error);
    }
  });
};

let createNewUser = (data) => {
  return new Promise(async (resolve, reject) => {
    let checkExistEmail = await checkUserEmail(data.email);
    let totalStudents;
    let firstName;
    let lastName;
    if (data.role === "R2") {
      totalStudents = 0;
      firstName = data.firstName;
      lastName = data.lastName;
    } else {
      totalStudents = null;
      firstName = null;
      lastName = null;
    }
    if (checkExistEmail === false) {
      let hashPassword = await hashUserPassword(data.password);
      try {
        await db.User.create({
          email: data.email,
          password: hashPassword,
          role: data.role,
          totalStudentNumber: totalStudents,
          firstName: firstName,
          lastName: lastName,
        });
        resolve({
          errCode: 0,
          errMessage: "OK",
        });
      } catch (error) {
        reject(error);
      }
    } else {
      resolve({
        errCode: 1,
        errMessage: "Your email is already in used. Please try another!",
      });
    }
  });
};
let checkUserEmail = (userEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({ where: { email: userEmail } });
      if (user) resolve(true);
      else resolve(false);
    } catch (e) {
      reject(e);
    }
  });
};
let login = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let isExist = await checkUserEmail(email);
      let userData = {};
      if (isExist) {
        let user = await db.User.findOne({
          where: { email: email },
          attributes: [
            "id",
            "email",
            "password",
            "firstName",
            "lastName",
            "phoneNumber",
            "avatar",
            "birthday",
            "totalCourseNumber",
            "totalStudentNumber",
            "role",
          ],
          raw: true,
        });
        if (user) {
          let check = bcrypt.compareSync(password, user.password);
          if (check) {
            userData.errCode = 0;
            userData.errMessage = "OK";
            delete user.password;
            userData.user = user;
            let payload = {
              userId: user.id,
              email: user.email,
              role: user.role,
              expiresIn: process.env.JWT_EXPIRES_IN,
            };
            userData.access_token = await createJWT(payload);
          } else {
            userData.errCode = 3;
            userData.errMessage =
              "Mật khẩu không chính xác. Vui lòng nhập lại!";
          }
        } else {
          userData.errCode = 2;
          userData.errMessage =
            "Email không tồn tại trong hệ thống. Vui lòng thử lại!";
        }
      } else {
        userData.errCode = 1;
        userData.errMessage =
          "Email không tồn tại trong hệ thống. Vui lòng thử lại!";
      }
      resolve(userData);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};
let updateUserInfo = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id || !data.email) {
        resolve({
          errCode: 1,
          errMessage: "Missing required fields",
        });
      }
      let user = await db.User.findOne({ where: { id: data.id }, raw: false });
      if (user) {
        user.firstName = data.firstName;
        user.lastName = data.lastName;
        user.phoneNumber = data.phoneNumber;
        user.avatar = data.avatar;
        user.email = data.email;
        user.birthday = data.birthday;
        await user.save();
        resolve({
          errCode: 0,
          errMessage: "Update user successfully",
        });
      } else {
        resolve({
          errCode: 2,
          errMessage: "User is not found",
        });
      }
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};
let changePassword = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id || !data.oldPassword || !data.newPassword) {
        resolve({
          errCode: 1,
          errMessage: "Missing required fields",
        });
      }
      let user = await db.User.findOne({ where: { id: data.id }, raw: false });
      let check = bcrypt.compareSync(data.oldPassword, user.password);
      if (user) {
        if (!check) {
          resolve({
            errCode: 3,
            errMessage: "Your old password is incorrect. Please try again!",
          });
        }
        user.password = bcrypt.hashSync(data.newPassword, salt);
        await user.save();
        resolve({
          errCode: 0,
          errMessage: "Change password successfully",
        });
      } else {
        resolve({
          errCode: 2,
          errMessage: "User is not found",
        });
      }
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};
module.exports = {
  createNewUser,
  login,
  updateUserInfo,
  changePassword,
};
