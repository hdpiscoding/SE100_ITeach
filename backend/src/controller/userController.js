import userService from "../service/userService";

const handleHelloWorld = (req, res) => {
  return res.send("Hello World");
};

let handleCreateNewUser = async (req, res) => {
  if (!req.body.email || !req.body.password || !req.body.role) {
    return res.status(500).json({
      errCode: 1,
      message: "Missing required fields",
    });
  }
  if (req.body.role === "R2" && !req.body.firstName && !req.body.lastName) {
    return res.status(500).json({
      errCode: 1,
      message: "Missing required fields",
    });
  }

  let message = await userService.createNewUser(req.body);
  return res.status(200).json(message);
};
const handleLogin = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(500).json({
      errCode: 1,
      message: "Missing required fields",
    });
  }
  let userData = await userService.login(req.body.email, req.body.password);
  return res.status(200).json({
    errCode: userData.errCode,
    message: userData.errMessage,
    user: userData.user ? userData.user : {},
    access_token: userData.access_token ? userData.access_token : {},
  });
};
const handleUpdateUserInfo = async (req, res) => {
  let data = req.body;
  let message = await userService.updateUserInfo(data);
  return res.status(200).json(message);
};
const handleChangePassword = async (req, res) => {
  let data = req.body;
  let message = await userService.changePassword(data);
  return res.status(200).json(message);
};
module.exports = {
  handleHelloWorld,
  handleCreateNewUser,
  handleLogin,
  handleUpdateUserInfo,
  handleChangePassword,
};
