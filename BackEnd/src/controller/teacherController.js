import teacherService from "../service/teacherService";
let handleCreateNewCourse = async (req, res) => {
  if (
    !req.body.courseName ||
    !req.body.courseCategoryId ||
    !req.body.level ||
    !req.body.cost ||
    !req.body.intro ||
    !req.body.gioiThieu ||
    !req.body.anhBia ||
    !req.body.teacherId ||
    !req.body.finishTime
  ) {
    return res.status(500).json({
      errCode: 1,
      message: "Missing required fields",
    });
  }
  let message = await teacherService.createNewCourse(req.body);
  return res.status(200).json(message);
};
module.exports = {
  handleCreateNewCourse,
};
