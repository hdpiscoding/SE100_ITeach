import express from "express";
import auth from "../middleware/auth";
import userController from "../controller/userController";
import studentController from "../controller/studentController";
const router = express.Router();
const initWebRoutes = (app) => {
  ///////////////////////
  //router.all("*", auth);
  //////////////////////
  router.get("/api/v1/hello", userController.handleHelloWorld);
  router.post("/api/v1/create-new-user", userController.handleCreateNewUser);
  router.post("/api/v1/login", userController.handleLogin);
  router.put("/api/v1/update-user-info", userController.handleUpdateUserInfo);
  router.put("/api/v1/change-password", userController.handleChangePassword);
  router.get("/api/v1/get-all-courses", studentController.handleGetAllCourses);
  router.get(
    "/api/v1/get-all-courses-categories",
    studentController.handleGetAllCoursesCategories
  );

  router.get(
    "/api/v1/get-students-orders",
    studentController.handleGetStudentsOrders
  );
  router.get(
    "/api/v1/get-students-orders-items",
    studentController.handleGetStudentsOrdersItems
  );
  router.get("/api/v1/get-cart-items", studentController.handleGetCartItems);
  router.get(
    "/api/v1/check-student-is-buy-course",
    studentController.handleCheckStudentBuyCourse
  );
  router.get(
    "/api/v1/get-my-courses",
    studentController.handleGetBoughtCourses
  );
  router.get(
    "/api/v1/get-unused-courses",
    studentController.handleGetUnusedCourses
  );
  router.get(
    "/api/v1/get-all-certificates",
    studentController.handleGetAllCertificates
  );
  router.post(
    "/api/v1/post-lesson-comments",
    studentController.handlePostLessonComments
  );
  router.post("/api/v1/post-review", studentController.handlePostReview);
  router.post("/api/v1/buy-course", studentController.handleBuyCourse);

  return app.use("/", router);
};
export default initWebRoutes;
