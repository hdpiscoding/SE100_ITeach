require("dotenv").config();
import bcrypt from "bcryptjs";
import db from "../models/index";
import { raw } from "body-parser";
const { Op } = require("sequelize");

import { createJWT, verifyJWT } from "../middleware/JWTAction";
const loginSuccess = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: userId },
        attributes: {
          exclude: ["password", "createdAt", "updatedAt"],
        },
      });
      let payload = {
        userId: user.id,
        email: user.email,
        role: user.role,
        expiresIn: process.env.JWT_EXPIRES_IN,
      };

      if (!user) {
        resolve({
          errCode: 2,
          errMessage: "User not found",
        });
      } else {
        resolve({
          errCode: 0,
          errMessage: "OK",
          user,
          access_token: await createJWT(payload),
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
const checkUserEmail = (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: {
          email: email,
          password: {
            [Op.or]: ["Google", "Facebook"],
          },
        },
      });

      if (!user) {
        resolve(false);
      } else {
        resolve(true);
      }
    } catch (error) {
      reject(error);
    }
  });
};
const registerOAuth = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await db.User.create({
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
        avatar: data.avatar,
      });
      resolve(user.id);
    } catch (error) {
      reject(error);
    }
  });
};
const loginOAuth = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { email: data.email },
      });
      if (!user) {
        resolve({
          errCode: 1,
          errMessage: "User not found",
        });
      } else {
        resolve(user.id);
      }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  loginSuccess,
  checkUserEmail,
  registerOAuth,
  loginOAuth,
};
