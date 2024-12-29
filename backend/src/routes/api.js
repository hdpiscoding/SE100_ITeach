import express from "express";
import teacherController from "../controller/teacherController";
import adminController from "../controller/adminController";
import studentController from "../controller/studentController";

const router = express.Router();

const initARoutes = (app) => {
  router.post(
    "/api/v1/create-new-course",
    teacherController.handleCreateNewCourse
  );
  router.get("/api/v1/get-all-course", teacherController.handleGetAllCourse);
  router.delete(
    "/api/v1/delete-a-course",
    teacherController.handleDeleteACourse
  );
  router.put("/api/v1/edit-a-course", teacherController.handleEditACourse);
  router.get("/api/v1/get-my-course", teacherController.handleGetMyCourse);
  router.post("/api/v1/post-a-lesson", teacherController.handleCreateNewLesson);
  router.put("/api/v1/put-a-lesson", teacherController.handlePutALesson);
  router.delete(
    "/api/v1/delete-a-lesson",
    teacherController.handleDeleteALesson
  );
  router.get("/api/v1/get-ide-use", teacherController.handleGetIDEUse);
  router.post(
    "/api/v1/get-ide-use-by-month",
    teacherController.handleGetIDEUseByMonth
  );
  router.post("/api/v1/post-ide-use", teacherController.handlePostIDEUse);
  router.get("/api/v1/get-my-account", teacherController.handleGetMyAccount);
  router.get("/api/v1/get-all-teacher", adminController.handleGetAllTeacher);
  router.get(
    "/api/v1/get-popular-teacher",
    adminController.handleGetPopularTeacher
  );
  router.get(
    "/api/v1/get-popular-course",
    adminController.handleGetPopularCourse
  );
  router.get(
    "/api/v1/get-analysis-information",
    adminController.handleGetAnalysisInformation
  );
  router.post(
    "/api/v1/get-all-student-of-course",
    teacherController.handleGetAllStudentOfCourse
  );
  router.post(
    "/api/v1/post-a-chapter",
    teacherController.handleCreateNewChapter
  );
  router.get("/api/v1/get-all-chapter", teacherController.handleGetAllChapter);
  router.put("/api/v1/put-a-chapter", teacherController.handlePutAChapter);
  router.delete(
    "/api/v1/delete-a-chapter",
    teacherController.handleDeleteAChapter
  );
  router.get("/api/v1/get-all-reviews", adminController.handleGetAllReivews);
  router.get(
    "/api/v1/get-student-certificates",
    studentController.handleGetStudentCertificates
  );
  router.get(
    "/api/v1/get-a-certificate",
    studentController.handleGetACertificate
  );
  router.put("/api/v1/approve-course", adminController.handleApproveCourse);
  router.put("/api/v1/stop-course", adminController.handleStopCourse);

  router.put("/api/v1/delete-course", adminController.handleDeleteCourse);
  router.post(
    "/api/v1/post-video-progess",
    studentController.handlePostVideoProgess
  );
  router.get(
    "/api/v1/get-video-progess-by-studentId",
    studentController.handleGetVideoProgessByStudentId
  );
  return app.use("/", router);
};
export default initARoutes;
