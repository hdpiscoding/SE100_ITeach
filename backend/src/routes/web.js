import express from "express";
import auth from "../middleware/auth";
import homeController from "../controller/homeController";
const router = express.Router();
const initWebRoutes = (app) => {
  ///////////////////////
  //router.all("*", auth);
  //////////////////////
  router.get("/hello", homeController.handleHelloWorld);
  router.get("/xin-chao", homeController.hanldeXinChao);
  router.post("/api/create-new-user", homeController.handleCreateNewUser);
  router.post("/api/login", homeController.handleLogin);
  router.get("/api/account", homeController.handleGetAccount);
  return app.use("/", router);
};
export default initWebRoutes;
