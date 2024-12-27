import axios from "../utils/AxiosCustomized";
const teacherToken =
  `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsImVtYWlsIjoiaHVuZzA4MDkyMDA0QGdtYWlsLmNvbSIsInJvbGUiOiJSMiIsImV4cGlyZXNJbiI6IjMwZCIsImlhdCI6MTcyNzU5OTQ4N30.2sAjaVD3nZ0KCZ1abl_8d2XXQqVKeVrLaZKeFuueALI`;

  const getMyAccount = async (teacherId) => {
    try {
      const response = await axios.get(`api/v1/get-my-account?teacherId=${teacherId}`,{
        headers: {
          Authorization: teacherToken,
        },
      });
    return response;
  } catch (error) {
    console.error("Error while getting my account", error);
    return null;
  }
};
export { getMyAccount };
const getMyCourse = async (teacherId) => {
  try {
    const response = await axios.get(`api/v1/get-my-course?teacherId=${teacherId}`,{
      headers: {
        Authorization: teacherToken,
      },
    });
  return response;
} catch (error) {
  console.error("Error while getting my account", error);
  return null;
}
};
export { getMyCourse };
const createNewCourse = async (data) => {
  try {
    const response = await axios.post("api/v1/create-new-course", data, {
      headers: {
        Authorization: teacherToken,
      },
    });
    return response;
  } catch (error) {
    console.error("Error while creating new course", error);
    return null;
  }
};
export { createNewCourse };
const getAllChapter = async (courseId) => {
  try {
    const response = await axios.get(`api/v1/get-all-chapter?courseId=${courseId}`, {
      headers: {
        Authorization: teacherToken,
      },
    });
    return response;
  } catch (error) {
    console.error("Error while getting all chapter", error);
    return null;
  }
};
export { getAllChapter };