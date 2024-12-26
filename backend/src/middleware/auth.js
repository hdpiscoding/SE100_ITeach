import { verifyJWT } from "./JWTAction";
const nonSecurePaths = [
  "/api/v1/login",
  "/api/v1/create-new-user",
  "/api/auth/google",
  "/api/auth/google/callback",
  "/api/auth/facebook",
  "/api/auth/facebook/callback",
];
const studentPaths = [
  "/api/v1/get-all-courses",
  "/api/v1/get-all-courses-categories",
  "/api/v1/check-student-is-buy-course",
  "/api/v1/get-students-orders",
  "/api/v1/get-students-orders-items",
  "/api/v1/get-cart-items",
  "/api/v1/get-my-courses",
  "/api/v1/get-unused-courses",
  "/api/v1/post-lesson-comments",
  "/api/v1/post-review",
  "/api/v1/buy-course",
  "/api/v1/get-detail-course-info",
  "/api/v1/get-list-chapters",
  "/api/v1/get-lesson-content",
  "/api/v1/add-to-cart",
  "/api/v1/complete-the-lesson",
  "/api/v1/get-current-lesson-id",

  "/api/v1/delete-cart-item",
  "/api/v1/delete-all-cart-items",
  "/api/v1/post-payment",

  "/api/v1/get-student-certificates",
  "/api/v1/get-a-certificate",
  "/api/v1/get-a-teacher-info",

  "/api/v1/post-ide-use",
  "/api/v1/get-all-student-of-course"
];
const teacherPaths = [
  "/api/v1/create-new-course",
  "/api/v1/get-all-course",
  "/api/v1/delete-a-course",
  "/api/v1/edit-a-course",
  "/api/v1/get-my-course",
  "/api/v1/post-a-lesson",
  "/api/v1/put-a-lesson",
  "/api/v1/delete-a-lesson",
  "/api/v1/get-ide-use",
  "/api/v1/post-ide-use",
  "/api/v1/get-my-account",
  "/api/v1/get-all-student-of-course",
  "/api/v1/post-a-chapter",
  "/api/v1/get-all-chapter",
  "/api/v1/put-a-chapter",
  "/api/v1/delete-a-chapter",
  "/api/v1/get-detail-course-info",
  "/api/v1/get-ide-use-by-month",
];
const adminPaths = [
  "/api/v1/get-all-teacher",
  "/api/v1/get-popular-teacher",
  "/api/v1/get-popular-course",
  "/api/v1/get-analysis-information",
  "/api/v1/get-all-reviews",
  "/api/v1/get-all-courses",
  "/api/v1/approve-course",
  "/api/v1/stop-course",
  "/api/v1/delete-course",
  "/api/v1/get-all-course-of-teacher",
  "/api/v1/get-ide-use",
  "/api/v1/get-all-student-of-course",
  "/api/v1/get-detail-course-info",
  "/api/v1/get-ide-use-by-month",
  "/api/v1/create-new-course-category",
];
const commonPaths = [
  "/api/v1/update-user-info",
  "/api/v1/change-password",
  "/upload",
  "/down-image",
];

const auth = (req, res, next) => {
  console.log(">>>Path:", req.path);
  if (nonSecurePaths.includes(req.path)) {
    return next();
  }
  if (req?.headers?.authorization?.split(" ")[1]) {
    const token = req.headers.authorization.split(" ")[1];
    console.log(">>>Token:", token);
    try {
      //verify token
      //verify token

      //verify token

      //verify token

      const decoded = verifyJWT(token);
      console.log(">>>Decoded:", decoded);
      req.user = {
        email: decoded.email,
        userId: decoded.userId,
        role: decoded.role,
      };
      next();
    } catch (error) {
      return res.status(401).json({ message: "Unauthorized" });
    }
  } else {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
const checkPermission = (req, res, next) => {
  if (nonSecurePaths.includes(req.path)) {
    return next();
  }
  if (commonPaths.includes(req.path)) {
    return next();
  }
  if (req.user.role === "R1" && studentPaths.includes(req.path)) {
    return next();
  }
  if (req.user.role === "R2" && teacherPaths.includes(req.path)) {
    return next();
  }
  if (req.user.role === "R3" && adminPaths.includes(req.path)) {
    return next();
  }
  return res.status(403).json({ message: "Forbidden" });
};
module.exports = {
  auth,
  checkPermission,
};
