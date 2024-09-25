import express from "express";
import teacherController from "../controller/teacherController";

const router = express.Router();

const initARoutes = (app) => {
  router.post(
    "/api/create-new-course",
    teacherController.handleCreateNewCourse
  );

  return app.use("/", router);
};
export default initARoutes;
