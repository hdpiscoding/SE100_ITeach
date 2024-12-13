import userService from "../service/userService";

const handleHelloWorld = (req, res) => {
  return res.send("Hello World");
};
const hanldeXinChao = (req, res) => {
  return res.send("Xin chào");
};
let handleCreateNewUser = async (req, res) => {
  if (
    !req.body.email ||
    !req.body.password ||
    !req.body.firstName ||
    !req.body.lastName
  ) {
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
const handleGetAccount = async (req, res) => {
  return res.status(200).json(req.user);
};
module.exports = {
  handleHelloWorld,
  hanldeXinChao,
  handleCreateNewUser,
  handleLogin,
  handleGetAccount,
};
