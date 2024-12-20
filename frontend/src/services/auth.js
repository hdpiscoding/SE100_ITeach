import axios from "../utils/AxiosCustomized";

const login = async (data) => {
  try {
    const response = await axios.post("api/v1/login", data);
    return response.data;
  } catch (error) {
    console.error("Error while logging in", error);
    return null;
  }
};
const createNewUser = async (data) => {
  try {
    const response = await axios.post("api/v1/create-new-user", data);
    return response.data;
  } catch (error) {
    console.error("Error while creating new user", error);
    return null;
  }
};
export { login, createNewUser };
