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
];
const teacherPaths = ["/api/v1/get-all-course", "/api/v1/create-new-course"];
const adminPaths = [];
const commonPaths = [
  "/api/v1/update-user-info",
  "/api/v1/change-password",
  "/upload",
  "/down-image",
];

const auth = (req, res, next) => {
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
