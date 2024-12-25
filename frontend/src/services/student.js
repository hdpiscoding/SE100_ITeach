import axios from "../utils/AxiosCustomized";

const studentToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjcsImVtYWlsIjoiaHVuZzA3MDkyMDA0QGdtYWlsLmNvbSIsInJvbGUiOiJSMSIsImV4cGlyZXNJbiI6IjMwZCIsImlhdCI6MTczNDQ4OTMzMn0.tQgwfeQOTs0adWu70z1i5VAQQr6jXWtDfy4GVcifsFA";
const editUserProfile = async (data) => {
  try {
    const response = await axios.put("api/v1/update-user-info", data, {
      headers: {
        Authorization: `Bearer ${studentToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error while editing user profile", error);
    return null;
  }
};
export { editUserProfile };
const getAllCourseCategory = async () => {
  try {
    const response = await axios.get("api/v1/get-all-courses-categories", {
      headers: {
        Authorization: `Bearer ${studentToken}`
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error while getting all course category", error);
    return null;
  }
};
export { getAllCourseCategory };
const getAllCourse = async () => {
  try {
    const response = await axios.get("api/v1/get-all-courses", {
      headers: {
        Authorization: `Bearer ${studentToken}`
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error while getting all course", error);
    return null;
  }
};
export { getAllCourse };
