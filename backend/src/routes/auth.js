const passport = require("passport");
require("dotenv").config();
import authController from "../controller/authController";
import express from "express";
const router = express.Router();
import {
  checkUserEmail,
  registerOAuth,
  loginOAuth,
} from "../service/authService";

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  })
);

router.get(
  "/google/callback",
  (req, res, next) => {
    passport.authenticate("google", async (err, profile) => {
      req.user = profile;
      const data = {
        email: profile.emails[0].value,
        avatar: profile.photos[0].value,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        password: "Google",
      };
      const check = await checkUserEmail(data.email);
      let id;
      if (check) {
        id = await loginOAuth(data);
      } else {
        id = await registerOAuth(data);
      }
      req.id = id;
      next();
    })(req, res, next);
  },
  (req, res) => {
    res.redirect(`${process.env.URL_CLIENT}login-success/${req.id}`);
  }
);

router.get(
  "/facebook",
  passport.authenticate("facebook", {
    session: false,
    scope: ["email"],
  })
);

router.get(
  "/facebook/callback",
  (req, res, next) => {
    passport.authenticate("facebook", async (err, profile) => {
      req.user = profile;
      console.log(profile);
      const data = {
        email: profile.emails[0].value,
        //avatar: profile.photos[0].value,
        firstName: profile.displayName,
        lastName: " ",
        password: "Facebook",
      };
      const check = await checkUserEmail(data.email);
      let id;
      if (check) {
        id = await loginOAuth(data);
      } else {
        id = await registerOAuth(data);
      }
      req.id = id;
      next();
    })(req, res, next);
  },
  (req, res) => {
    res.redirect(`${process.env.URL_CLIENT}login-success/${req.id}`);
  }
);

router.post("/login-success", authController.loginSuccess);
module.exports = router;
