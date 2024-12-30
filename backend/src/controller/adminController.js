import adminService from "../service/adminService";
let handleGetAllTeacher = async (req, res) => {
  let data = await adminService.getAllTeacher();
  return res.status(200).json(data);
};
let handleGetPopularTeacher = async (req, res) => {
  let data = await adminService.getPopularTeacher();
  return res.status(200).json(data);
};
let handleGetPopularCourse = async (req, res) => {
  let data = await adminService.getPopularCourse();
  return res.status(200).json(data);
};
let handleGetAnalysisInformation = async (req, res) => {
  if (!req.query.year) {
    return res.status(500).json({
      errCode: 1,
      message: "Missing required parameters",
    });
  }
  const input = {
    year: req.query.year,
    month: req.query.month,
  };
  let data = await adminService.getAnalysisInformation(input);
  return res.status(200).json(data);
};
let handleGetAllReivews = async (req, res) => {
  let data = await adminService.getAllReviews();
  return res.status(200).json(data);
};
let handleApproveCourse = async (req, res) => {
  if (!req.body.courseId) {
    return res.status(500).json({
      errCode: 1,
      message: "Missing required parameters",
    });
  }
  let data = await adminService.approveCourse(req.body);
  return res.status(200).json(data);
};
let handleStopCourse = async (req, res) => {
  if (!req.body.courseId) {
    return res.status(500).json({
      errCode: 1,
      message: "Missing required parameters",
    });
  }
  let data = await adminService.stopCourse(req.body);
  return res.status(200).json(data);
};
let handleDeleteCourse = async (req, res) => {
  if (!req.body.courseId) {
    return res.status(500).json({
      errCode: 1,
      message: "Missing required parameters",
    });
  }
  let data = await adminService.deleteCourse(req.body);
  return res.status(200).json(data);
};
const handleGetAllCourseOfTeacher = async (req, res) => {
  if (!req.query.teacherId) {
    return res.status(500).json({
      errCode: 1,
      message: "Missing required parameters",
    });
  }
  let data = await adminService.getAllCourseOfTeacher(req.query.teacherId);
  return res.status(200).json(data);
};
const handleCreateNewCourseCategory = async (req, res) => {
  if (!req.body.name) {
    return res.status(500).json({
      errCode: 1,
      message: "Missing required parameters",
    });
  }
  let data = await adminService.createNewCourseCategory(req.body);
  return res.status(200).json(data);
};
const handleGetChartData = async (req, res) => {
  if (!req.query.year) {
    return res.status(500).json({
      errCode: 1,
      message: "Missing required parameters",
    });
  }
  let data = await adminService.getChartData(req.query.year);
  return res.status(200).json(data);
};

module.exports = {
  handleGetAllTeacher,
  handleGetPopularTeacher,
  handleGetPopularCourse,
  handleGetAnalysisInformation,
  handleGetAllReivews,
  handleApproveCourse,
  handleStopCourse,
  handleDeleteCourse,
  handleGetAllCourseOfTeacher,
  handleCreateNewCourseCategory,
  handleGetChartData,
};
