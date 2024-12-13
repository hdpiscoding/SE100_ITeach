require("dotenv").config();
import bcrypt from "bcryptjs";
//import db from "../models/index";
import { createJWT, verifyJWT } from "../middleware/JWTAction";
const salt = bcrypt.genSaltSync(10);

let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    // try {
    //   let hashPassword = await bcrypt.hashSync(password, salt);
    //   resolve(hashPassword);
    // } catch (error) {
    //   reject(error);
    // }
  });
};

let createNewUser = (data) => {
  return new Promise(async (resolve, reject) => {
    // let hashPassword = await hashUserPassword(data.password);
    // try {
    //   await db.User.create({
    //     email: data.email,
    //     password: hashPassword,
    //     firstName: data.firstName,
    //     lastName: data.lastName,
    //     language: data.language,
    //   });
    //   resolve({
    //     errCode: 0,
    //     errMessage: "OK",
    //   });
    // } catch (error) {
    //   reject(error);
    // }
  });
};
let checkUserEmail = (userEmail) => {
  return new Promise(async (resolve, reject) => {
    // try {
    //   let user = await db.User.findOne({ where: { email: userEmail } });
    //   if (user) resolve(true);
    //   else resolve(false);
    // } catch (e) {
    //   reject(e);
    // }
  });
};
let login = (email, password) => {
  return new Promise(async (resolve, reject) => {
    // try {
    //   let isExist = await checkUserEmail(email);
    //   let userData = {};
    //   if (isExist) {
    //     let user = await db.User.findOne({
    //       where: { email: email },
    //       attributes: [
    //         "id",
    //         "email",
    //         "password",
    //         "firstName",
    //         "lastName",
    //         "language",
    //       ],
    //       raw: true,
    //     });
    //     if (user) {
    //       let check = await bcrypt.compareSync(password, user.password);
    //       if (check) {
    //         userData.errCode = 0;
    //         userData.errMessage = "OK";
    //         delete user.password;
    //         userData.user = user;
    //         let payload = {
    //           userId: user.id,
    //           email: user.email,
    //           firstName: user.firstName,
    //           lastName: user.lastName,
    //           language: user.language,
    //           expiresIn: process.env.JWT_EXPIRES_IN,
    //         };
    //         userData.access_token = await createJWT(payload);
    //       } else {
    //         userData.errCode = 3;
    //         userData.errMessage =
    //           "Your password is incorrect. Please try again!";
    //       }
    //     } else {
    //       userData.errCode = 2;
    //       userData.errMessage =
    //         "Your email isn`t exist in system. Please try again!";
    //     }
    //   } else {
    //     userData.errCode = 1;
    //     userData.errMessage =
    //       "Your email isn`t exist in system. Please try again!";
    //   }
    //   resolve(userData);
    // } catch (error) {
    //   console.log(error);
    //   reject(error);
    // }
  });
};
module.exports = {
  createNewUser,
  login,
};
