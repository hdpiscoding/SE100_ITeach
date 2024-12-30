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
const handlePostLessonComments = async (req, res) => {
  if (!req.body.lessonId || !req.body.userId || !req.body.content) {
    return res.status(500).json({
      errCode: 1,
      errMessage: "Missing required parameter",
    });
  }
  let response = await studentService.postLessonComments(req.body);
  return res.status(200).json(response);
};
const handlePostReview = async (req, res) => {
  if (
    !req.body.userId ||
    !req.body.courseId ||
    !req.body.star ||
    !req.body.content
  ) {
    return res.status(500).json({
      errCode: 1,
      errMessage: "Missing required parameter",
    });
  }
  let response = await studentService.postReview(req.body);
  return res.status(200).json(response);
};
const handleBuyCourse = async (req, res) => {
  if (!req.body.studentId || !req.body.totalCost || !req.body.oderItems) {
    return res.status(500).json({
      errCode: 1,
      errMessage: "Missing required parameter",
    });
  }
  let response = await studentService.buyCourse(req.body);
  return res.status(200).json(response);
};
const handleGetDetailCourseInfo = async (req, res) => {
  if (!req.query.id || !req.query.userId) {
    return res.status(500).json({
      errCode: 1,
      errMessage: "Missing required parameter",
    });
  }
  let response = await studentService.getDetailCourseInfo(
    req.query.id,
    req.query.userId
  );
  return res.status(200).json(response);
};
const handleGetListChapters = async (req, res) => {
  if (!req.query.courseId) {
    return res.status(500).json({
      errCode: 1,
      errMessage: "Missing required parameter",
    });
  }
  let response = await studentService.getListChapters(req.query.courseId);
  return res.status(200).json(response);
};
const handleGetLessonContent = async (req, res) => {
  if (!req.query.lessonId) {
    return res.status(500).json({
      errCode: 1,
      errMessage: "Missing required parameter",
    });
  }
  let response = await studentService.getLessonContent(req.query.lessonId);
  return res.status(200).json(response);
};
const handleAddToCart = async (req, res) => {
  if (!req.body.studentId || !req.body.courseId) {
    return res.status(500).json({
      errCode: 1,
      errMessage: "Missing required parameter",
    });
  }
  let response = await studentService.addToCart(req.body);
  return res.status(200).json(response);
};

const handleDeleteCartItem = async (req, res) => {
  if (!req.query.id) {
    return res.status(500).json({
      errCode: 1,
      errMessage: "Missing required parameter",
    });
  }
  let response = await studentService.deleteCartItem(req.query.id);
  return res.status(200).json(response);
};
const handleCompleteLesson = async (req, res) => {
  if (!req.body.studentId || !req.body.lessonId || !req.body.courseId) {
    return res.status(500).json({
      errCode: 1,
      errMessage: "Missing required parameter",
    });
  }
  let response = await studentService.completeLesson(req.body);
  return res.status(200).json(response);
};
const handleGetCurrentLessonId = async (req, res) => {
  if (!req.query.courseId || !req.query.studentId) {
    return res.status(500).json({
      errCode: 1,
      errMessage: "Missing required parameter",
    });
  }
  let response = await studentService.getCurrentLessonId(
    req.query.courseId,
    req.query.studentId
  );
  return res.status(200).json(response);
};

const handleDeleteAllCartItems = async (req, res) => {
  if (!req.query.userId) {
    return res.status(500).json({
      errCode: 1,
      errMessage: "Missing required parameter",
    });
  }
  let response = await studentService.deleteAllCartItems(req.query.userId);
  return res.status(200).json(response);
};

const handleGetStudentCertificates = async (req, res) => {
  if (!req.query.studentId) {
    return res.status(500).json({
      errCode: 1,
      errMessage: "Missing required parameter",
    });
  }
  let response = await studentService.getStudentCertificates(
    req.query.studentId
  );
  return res.status(200).json(response);
};

const handlePostPayment = async (req, res) => {
  if (!req.body.userId || !req.body.totalCost || !req.body.cartItems) {
    return res.status(500).json({
      errCode: 1,
      errMessage: "Missing required parameter",
    });
  }
  let response = await studentService.postPayment(req.body);
  return res.status(200).json(response);
};

const handleGetACertificate = async (req, res) => {
  if (!req.query.id) {
    return res.status(500).json({
      errCode: 1,
      errMessage: "Missing required parameter",
    });
  }
  let response = await studentService.getACertificate(req.query.id);

  return res.status(200).json(response);
};
const handleGetATeacher = async (req, res) => {
  if (!req.query.id) {
    return res.status(500).json({
      errCode: 1,
      errMessage: "Missing required parameter",
    });
  }
  let response = await studentService.getATeacher(req.query.id);

  return res.status(200).json(response);
};
const handlePostVideoProgress = async (req, res) => {
  if (!req.body.userId || !req.body.lessonId || !req.body.progress) {
    return res.status(500).json({
      errCode: 1,
      errMessage: "Missing required parameter",
    });
  }
  let response = await studentService.postVideoProgress(req.body);

  return res.status(200).json(response);
};
const handleGetVideoProgressByStudentId = async (req, res) => {
  if (!req.query.userId || !req.query.lessonId) {
    return res.status(500).json({
      errCode: 1,
      errMessage: "Missing required parameter",
    });
  }
  let response = await studentService.getVideoProgressByStudentId(
    req.query.userId,
    req.query.lessonId
  );

  return res.status(200).json(response);
};

const handleGetMyCourseChapter = async (req, res) => {
    if (!req.query.courseId || !req.query.studentId) {
        return res.status(500).json({
        errCode: 1,
        errMessage: "Missing required parameter",
        });
    }
    let response = await studentService.getMyCourseChapters(
        req.query.studentId,
        req.query.courseId
    );

    return res.status(200).json(response);
}
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
  handlePostLessonComments,
  handlePostReview,
  handleBuyCourse,
  handleGetDetailCourseInfo,
  handleGetListChapters,
  handleGetLessonContent,
  handleAddToCart,
  handleCompleteLesson,
  handleGetCurrentLessonId,
  handleDeleteCartItem,
  handleDeleteAllCartItems,
  handlePostPayment,
  handleGetStudentCertificates,
  handleGetACertificate,
  handleGetATeacher,
  handlePostVideoProgress,
  handleGetVideoProgressByStudentId,
  handleGetMyCourseChapter
};
