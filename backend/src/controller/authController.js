import authService from "../service/authService";
const loginSuccess = async (req, res) => {
  if (!req.query.userId) {
    return res.status(500).json({
      errCode: 1,
      message: "Missing required parameters",
    });
  }

  let response = await authService.loginSuccess(req.query.userId);
  return res.status(200).json(response);
};
module.exports = {
  loginSuccess,
};
