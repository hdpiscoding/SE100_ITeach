require("dotenv").config();
import jwt from "jsonwebtoken";

const createJWT = (payload) => {
  let key = process.env.JWT_SECRET;
  let token = null;
  try {
    token = jwt.sign(payload, key);
  } catch (error) {
    console.log(error);
  }
  return token;
};

const verifyJWT = (token) => {
  let key = process.env.JWT_SECRET;
  let decoded = null;
  decoded = jwt.verify(token, key);
  return decoded;
};
module.exports = { createJWT, verifyJWT };
