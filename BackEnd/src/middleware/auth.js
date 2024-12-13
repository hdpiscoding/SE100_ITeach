import { verifyJWT } from "./JWTAction";
const auth = (req, res, next) => {
  const nonSecurePaths = ["/api/login", "/api/create-new-user"];
  if (nonSecurePaths.includes(req.path)) {
    //console.log("Non-secure path:", req.path);
    return next();
  }
  if (req?.headers?.authorization?.split(" ")[1]) {
    const token = req.headers.authorization.split(" ")[1];
    console.log(">>>Token:", token);
    try {
      //verify token
      const decoded = verifyJWT(token);
      console.log(">>>Decoded:", decoded);
      req.user = {
        email: decoded.email,
        userId: decoded.userId,
        language: decoded.language,
      };
      next();
    } catch (error) {
      return res.status(401).json({ message: "Unauthorized" });
    }
  } else {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
module.exports = auth;
