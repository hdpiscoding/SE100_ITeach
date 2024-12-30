import teacherService from "../service/teacherService";
let handleCreateNewCourse = async (req, res) => {
  if (
    !req.body.courseName ||
    !req.body.courseCategoryId ||
    !req.body.cost ||
    !req.body.level ||
    !req.body.intro ||
    !req.body.gioiThieu ||
    !req.body.anhBia ||
    !req.body.teacherId
  ) {
    return res.status(500).json({
      errCode: 1,
      message: "Missing required fields",
    });
  }
  let message = await teacherService.createNewCourse(req.body);
  return res.status(200).json(message);
};
let handleGetAllCourse = async (req, res) => {
  let id = req.body.id;
  if (!id) {
    return res.status(500).json({
      errCode: 1,
      message: "Missing required fields",
      data: [],
    });
  }
  let data = await teacherService.getAllCourses(req.body);
  return res.status(200).json(data);
};
let handleDeleteACourse = async (req, res) => {
  let id = req.body.id;
  if (!id) {
    return res.status(500).json({
      errCode: 1,
      message: "Missing required parameters",
    });
  }
  let message = await teacherService.deleteACourse(req.body);
  return res.status(200).json({
    message,
  });
};
let handleEditACourse = async (req, res) => {
  let id = req.body.id;
  if (!id) {
    return res.status(500).json({
      errCode: 1,
      message: "Missing required fields",
      data: [],
    });
  }
  let message = await teacherService.editACourse(req.body);
  return res.status(200).json({
    message,
  });
};
let handleGetMyCourse = async (req, res) => {
  let teacherId = req.body.teacherId;
  if (!teacherId) {
    return res.status(500).json({
      errCode: 1,
      message: "Missing required fields",
      data: [],
    });
  }
  let data = await teacherService.getMyCourse(req.body);
  return res.status(200).json(data);
};
let handlePutALesson = async (req, res) => {
  let id = req.body.id;
  if (!id) {
    return res.status(500).json({
      errCode: 1,
      message: "Missing required fields",
      data: [],
    });
  }
  let data = await teacherService.PutALesson(req.body);
  return res.status(200).json(data);
};
let handleCreateNewLesson = async (req, res) => {
  if (
    !req.body.courseId ||
    !req.body.name ||
    !req.body.chapter ||
    !req.body.studyTime ||
    !req.body.video ||
    !req.body.contentHtml ||
    !req.body.contentMarkDown ||
    !req.body.exerciseHtml ||
    !req.body.exerciseMarkDown
  ) {
    return res.status(500).json({
      errCode: 1,
      message: "Missing required fields",
      data: [],
    });
  }
  let data = await teacherService.PostALesson(req.body);
  return res.status(200).json(data);
};
let handleDeleteALesson = async (req, res) => {
  let id = req.body.id;
  if (!id) {
    return res.status(500).json({
      errCode: 1,
      message: "Missing required parameters",
    });
  }
  let message = await teacherService.deleteALesson(req.body);
  return res.status(200).json({
    message,
  });
};
let handleGetIDEUse = async (req, res) => {
  let courseId = req.body.courseId;
  if (!courseId) {
    return res.status(500).json({
      errCode: 1,
      message: "Missing required fields",
      data: [],
    });
  }
  let data = await teacherService.getIDEUse(req.body);
  return res.status(200).json(data);
};
let handlePostIDEUse = async (req, res) => {
  if (!req.body.courseId || !req.body.date) {
    return res.status(500).json({
      errCode: 1,
      message: "Missing required fields",
      data: [],
    });
  }
  let data = await teacherService.postIDEUse(req.body);
  return res.status(200).json(data);
};
let handleGetMyAccount = async (req, res) => {
  let teacherId = req.body.teacherId;
  if (!teacherId) {
    return res.status(500).json({
      errCode: 1,
      message: "Missing required fields",
    });
  }
  let data = await teacherService.getMyAccountInformation(req.body);
  return res.status(200).json(data);
};
let handleGetAllStudentOfCourse = async (req, res) => {
  let courseId = req.body.courseId;
  if (!courseId) {
    return res.status(500).json({
      errCode: 1,
      message: "Missing required fields",
    });
  }
  let data = await teacherService.getAllStudentOfCourse(req.body);
  return res.status(200).json(data);
};
let handleCreateNewChapter = async (req, res) => {
  if (!req.body.courseId || !req.body.chapterName) {
    return res.status(500).json({
      errCode: 1,
      message: "Missing required fields",
    });
  }
  let data = await teacherService.createNewChapter(req.body);
  return res.status(200).json(data);
};
let handleGetAllChapter = async (req, res) => {
  let courseId = req.body.courseId;
  if (!courseId) {
    return res.status(500).json({
      errCode: 1,
      message: "Missing required fields",
    });
  }
  let data = await teacherService.getAllChapter(req.body);
  return res.status(200).json(data);
};
let handlePutAChapter = async (req, res) => {
  let id = req.body.id;
  if (!id) {
    return res.status(500).json({
      errCode: 1,
      message: "Missing required fields",
    });
  }
  let data = await teacherService.putAChapter(req.body);
  return res.status(200).json(data);
};
let handleDeleteAChapter = async (req, res) => {
  let id = req.body.id;
  if (!id) {
    return res.status(500).json({
      errCode: 1,
      message: "Missing required fields",
    });
  }
  let data = await teacherService.deleteAChapter(req.body);
  return res.status(200).json(data);
};
let handleGetIDEUseByMonth = async (req, res) => {
  let courseId = req.body.courseId;
  let month = req.body.month;
  let year = req.body.year;

  if (!courseId || !month || !year) {
    return res.status(500).json({
      errCode: 1,
      message: "Missing required fields",
    });
  }
  let data = await teacherService.getIDEUseByMonth(req.body);
  return res.status(200).json(data);
};
const handleSendEmailToStudent = async (req, res) => {
  if (!req.query.courseId) {
    return res.status(500).json({
      errCode: 1,
      message: "Missing required fields",
    });
  }
  let data = await teacherService.sendEmailToStudent(req.query.courseId);
  return res.status(200).json(data);
};
module.exports = {
  handleCreateNewCourse,
  handleGetAllCourse,
  handleDeleteACourse,
  handleEditACourse,
  handleGetMyCourse,
  handlePutALesson,
  handleCreateNewLesson,
  handleDeleteALesson,
  handleGetIDEUse,
  handlePostIDEUse,
  handleGetMyAccount,
  handleGetAllStudentOfCourse,
  handleCreateNewChapter,
  handleGetAllChapter,
  handlePutAChapter,
  handleDeleteAChapter,
  handleGetIDEUseByMonth,
  handleSendEmailToStudent,
};
