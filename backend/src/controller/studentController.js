import studentService from "../service/studentService";
const handleGetAllCourses = async (req, res) => {
  let response = await studentService.getAllCourses();
  return res.status(200).json(response);
};
const handleGetAllCoursesCategories = async (req, res) => {
  let response = await studentService.getAllCoursesCategories();
  return res.status(200).json(response);
};

const handleGetStudentsOrders = async (req, res) => {
  if (!req.query.id) {
    return res.status(500).json({
      errCode: 1,
      errMessage: "Missing required parameter",
    });
  }

  let response = await studentService.getStudentsOrders(req.query.id);
  return res.status(200).json(response);
};
const handleCheckStudentBuyCourse = async (req, res) => {
  if (!req.query.studentId || !req.query.courseId) {
    return res.status(500).json({
      errCode: 1,
      errMessage: "Missing required parameter",
    });
  }
  let response = await studentService.checkStudentBuyCourse(
    req.query.studentId,
    req.query.courseId
  );
  return res.status(200).json(response);
};
const handleGetStudentsOrdersItems = async (req, res) => {
  if (!req.query.orderId) {
    return res.status(500).json({
      errCode: 1,
      errMessage: "Missing required parameter",
    });
  }
  let response = await studentService.getStudentsOrdersItems(req.query.orderId);
  return res.status(200).json(response);
};
const handleGetCartItems = async (req, res) => {
  if (!req.query.id) {
    return res.status(500).json({
      errCode: 1,
      errMessage: "Missing required parameter",
    });
  }
  let response = await studentService.getCartItems(req.query.id);
  return res.status(200).json(response);
};
const handleGetBoughtCourses = async (req, res) => {
  if (!req.query.id) {
    return res.status(500).json({
      errCode: 1,
      errMessage: "Missing required parameter",
    });
  }
  let response = await studentService.getBoughtCourses(req.query.id);
  return res.status(200).json(response);
};
const handleGetUnusedCourses = async (req, res) => {
  if (!req.query.id) {
    return res.status(500).json({
      errCode: 1,
      errMessage: "Missing required parameter",
    });
  }
  let response = await studentService.getUnusedCourses(req.query.id);
  return res.status(200).json(response);
};
const handleGetAllCertificates = async (req, res) => {
  if (!req.query.id) {
    return res.status(500).json({
      errCode: 1,
      errMessage: "Missing required parameter",
    });
  }
  let response = await studentService.getAllCertificates();
  return res.status(200).json(response);
};
module.exports = {
  handleGetAllCourses,
  handleGetAllCoursesCategories,
  handleGetStudentsOrders,
  handleCheckStudentBuyCourse,
  handleGetStudentsOrdersItems,
  handleGetCartItems,
  handleGetBoughtCourses,
  handleGetUnusedCourses,
  handleGetAllCertificates,
};
