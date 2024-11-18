const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
require("dotenv").config();
import passport from "passport";
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, cb) {
      //add user
      //nào gọi từ client thì xem video này :
      //https://www.youtube.com/watch?v=0V3Cf0bko7k&list=PLGcINiGdJE90yhXdDBNnfMcEjTZdeeJ1L&index=3
      console.log(profile);
      return cb(null, profile);
    }
  )
);
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: "/api/auth/facebook/callback",
      profileFields: ["email", "id", "photos", "displayName"],
    },
    function (accessToken, refreshToken, profile, cb) {
      //add user
      console.log(profile);
      cb(null, profile);
    }
  )
);
//http://localhost:8080/api/auth/facebook
//Hiện tại làm được tới bước truy cập đường link trên sau đó log ra profile
