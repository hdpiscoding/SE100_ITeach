import axios from "../utils/AxiosCustomized";
const teacherToken =
  `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsImVtYWlsIjoiaHVuZzA4MDkyMDA0QGdtYWlsLmNvbSIsInJvbGUiOiJSMiIsImV4cGlyZXNJbiI6IjMwZCIsImlhdCI6MTcyNzU5OTQ4N30.2sAjaVD3nZ0KCZ1abl_8d2XXQqVKeVrLaZKeFuueALI`;
  const getAllCoursesCategories = async () => {
    try {
      const response = await axios.get("api/v1/get-all-courses-categories", {
      });
      return response;
    } catch (error) {
      console.error("Error fetching courses categories:", error);
      throw error;
    }
  };
  export { getAllCoursesCategories };
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
const postAChapter = async (data) => {
  try {
    const response = await axios.post("api/v1/post-a-chapter", data, {
      headers: {
        Authorization: teacherToken,
      },
    });
    return response;
  } catch (error) {
    console.error("Error while creating new chapter", error);
    return null;
  }
};
export { postAChapter };
const putAChapter = async (data) => {
  try {
    const response = await axios.put("api/v1/put-a-chapter", data, {
      headers: {
        Authorization: teacherToken,
      },
    });
    return response;
  } catch (error) {
    console.error("Error while updating chapter", error);
    return null;
  }
};
export { putAChapter };
const deleteAChapter = async (chapterId) => {
  console.log("goi ham");
  try {
    const response = await axios.delete(`api/v1/delete-a-chapter?id=${chapterId}`, {
      headers: {
        Authorization: teacherToken,
      },
    });
    console.log("response", response);
    return response;
  } catch (error) {
    console.error("Error while deleting chapter", error);
    return null;
  }

};
export { deleteAChapter };
const postALesson = async (data) => {
  try {
    const response = await axios.post("api/v1/post-a-lesson", data, {
      headers: {
        Authorization: teacherToken,
      },
    });
    return response;
  } catch (error) {
    console.error("Error while creating new lesson", error);
    return null;
  }
};
export { postALesson };
const putALesson = async (data) => {
  try {
    const response = await axios.put("api/v1/put-a-lesson", data, {
      headers: {
        Authorization: teacherToken,
      },
    });
    return response;
  } catch (error) {
    console.error("Error while updating lesson", error);
    return null;
  }
};
export { putALesson };
const deleteALesson = async (lessonId) => {
  try {
    const response = await axios.delete(`api/v1/delete-a-lesson?id=${lessonId}`, {
      headers: {
        Authorization: teacherToken,
      },
    });
    return response;
  } catch (error) {
    console.error("Error while deleting lesson", error);
    return null;
  }
};
export { deleteALesson };
const getDetailCourse = async (courseId) => {
  try {
    const response = await axios.get(`api/v1/get-detail-course-info?id=${courseId}`, {
    });
    return response;
  } catch (error) {
    console.error("Error while getting detail course", error);
    return null;
  }
};
export { getDetailCourse };
 const getLessonContent = async (lessonId) => {
  try {
    const response = await axios.get(`api/v1/get-lesson-content?lessonId=${lessonId}`, {
      headers: {
        Authorization: teacherToken,
      },
    });
    return response;
  } catch (error) {
    console.error("Error while getting lesson content", error);
    return null;
  }
};
export { getLessonContent };