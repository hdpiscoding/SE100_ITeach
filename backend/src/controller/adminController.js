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
  if (!req.body.year || !req.body.month) {
    return res.status(500).json({
      errCode: 1,
      message: "Missing required parameters",
    });
  }
  let data = await adminService.getAnalysisInformation(req.body);
  return res.status(200).json(data);
};
module.exports = {
  handleGetAllTeacher,
  handleGetPopularTeacher,
  handleGetPopularCourse,
  handleGetAnalysisInformation,
};
