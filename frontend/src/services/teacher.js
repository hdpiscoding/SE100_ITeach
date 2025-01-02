import instance from "../utils/AxiosCustomized";
  const getAllCoursesCategories = async () => {
    try {
      const response = await instance.get("api/v1/get-all-courses-categories", {
      });
      return response;
    } catch (error) {
      console.error("Error fetching courses categories:", error);
      throw error;
    }
  };
  const getMyAccount = async (teacherId) => {
    try {
      const response = await instance.get(`api/v1/get-my-account?teacherId=${teacherId}`);
    return response;
  } catch (error) {
    console.error("Error while getting my account", error);
    return null;
  }
};
const getMyCourse = async (teacherId) => {
  try {
    const response = await instance.get(`api/v1/get-my-course?teacherId=${teacherId}`);
  return response;
} catch (error) {
  console.error("Error while getting my account", error);
  return null;
}
};
const createNewCourse = async (data) => {
  try {
    const response = await instance.post("api/v1/create-new-course", data);
    return response;
  } catch (error) {
    console.error("Error while creating new course", error);
    return null;
  }
};
const getAllChapter = async (courseId) => {
  try {
    const response = await instance.get(`api/v1/get-all-chapter?courseId=${courseId}`);
    return response;
  } catch (error) {
    console.error("Error while getting all chapter", error);
    return null;
  }
};
const postAChapter = async (data) => {
  try {
    const response = await instance.post("api/v1/post-a-chapter", data);
    return response;
  } catch (error) {
    console.error("Error while creating new chapter", error);
    return null;
  }
};
const putAChapter = async (data) => {
  try {
    const response = await instance.put("api/v1/put-a-chapter", data, {
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
const deleteAChapter = async (chapterId) => {
  try {
    const response = await instance.delete(`api/v1/delete-a-chapter?id=${chapterId}`);
    console.log("response", response);
    return response;
  } catch (error) {
    console.error("Error while deleting chapter", error);
    return null;
  }

};
const postALesson = async (data) => {
  try {
    const response = await instance.post("api/v1/post-a-lesson", data);
    return response;
  } catch (error) {
    console.error("Error while creating new lesson", error);
    return null;
  }
};
const putALesson = async (data) => {
  try {
    const response = await instance.put("api/v1/put-a-lesson", data);
    return response;
  } catch (error) {
    console.error("Error while updating lesson", error);
    return null;
  }
};
const deleteALesson = async (lessonId) => {
  try {
    const response = await instance.delete(`api/v1/delete-a-lesson?id=${lessonId}`);
    return response;
  } catch (error) {
    console.error("Error while deleting lesson", error);
    return null;
  }
};
const getDetailCourse = async (courseId) => {
  try {
    const response = await instance.get(`api/v1/get-detail-course-info?id=${courseId}`);
    return response;
  } catch (error) {
    console.error("Error while getting detail course", error);
    return null;
  }
};
 const getLessonContent = async (lessonId) => {
  try {
    const response = await instance.get(`api/v1/get-lesson-content?lessonId=${lessonId}`);
    return response;
  } catch (error) {
    console.error("Error while getting lesson content", error);
    return null;
  }
};
const putACourse = async (data) => {
  try {
    const response = await instance.put("api/v1/edit-a-course", data);
    return response;
  } catch (error) {
    console.error("Error while updating course", error);
    return null;
  }
};
const postSendMail = async (id) => {
  try {
    const response = await instance.post(`api/v1/send-mail?courseId=${id}`);
    return response;
  } catch (error) {
    console.error("Error while sending mail", error);
    return null;
  }
};
const deleteACourse = async (courseId) => {
  try {
    const response = await instance.delete(`api/v1/delete-a-course?id=${courseId}`);
    return response;
  } catch (error) {
    console.error("Error while deleting course", error);
    return null;
  }
};
export
 {
  getAllCoursesCategories,
  getMyAccount,
  getMyCourse,
  createNewCourse,
  getAllChapter,
  postAChapter,
  putAChapter,
  deleteAChapter,
  postALesson,
  putALesson,
  deleteALesson,
  getDetailCourse,
  getLessonContent,
  putACourse,
  postSendMail,
  deleteACourse 
  };