import axios from "../utils/AxiosCustomized";
const admintoken = "Bearer " + localStorage.getItem("jwt");
const teachertoken = admintoken;
const studenttoken = admintoken;
const getTeachers = async () => {
  try {
    const response = await axios.get("api/v1/get-all-teacher", {
      headers: {
        Authorization: admintoken,
      },
    });
    return response;
  } catch (error) {
    console.error("Error fetching teachers:", error);
    throw error;
  }
};
const getAllReviews = async () => {
  try {
    const response = await axios.get("api/v1/get-all-reviews", {
      headers: {
        Authorization: admintoken,
      },
    });
    return response;
  } catch (error) {
    console.error("Error fetching reviews:", error);
    throw error;
  }
};
const getAllCourses = async () => {
  try {
    const response = await axios.get("api/v1/get-all-courses", {
      headers: {
        Authorization: admintoken,
      },
    });
    return response;
  } catch (error) {
    console.error("Error fetching courses:", error);
    throw error;
  }
};
const ApproveCourse = async (body) => {
  try {
    const response = await axios.put(`api/v1/approve-course`, body, {
      headers: {
        Authorization: admintoken,
      },
    });
    return response;
  } catch (error) {
    console.error("Error approving course:", error);
    throw error;
  }
};
const StopCourse = async (body) => {
  try {
    const response = await axios.put(`api/v1/stop-course`, body, {
      headers: {
        Authorization: admintoken,
      },
    });
    return response;
  } catch (error) {
    console.error("Error stopping course:", error);
    throw error;
  }
};
const delteCourse = async (body) => {
  try {
    const response = await axios.put(`api/v1/delete-course`, body, {
      headers: {
        Authorization: admintoken,
      },
    });
    return response;
  } catch (error) {
    console.error("Error deleting course:", error);
    throw error;
  }
};
const getAllCourseOfATeacher = async (teacherId) => {
  try {
    const response = await axios.get(
      `api/v1/get-all-course-of-teacher?teacherId=${teacherId}`,
      {
        headers: {
          Authorization: admintoken,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error fetching courses of teacher:", error);
    throw error;
  }
};
const getAnalysisInfo = async (year, month) => {
  try {
    const response = await axios.get(
      `api/v1/get-analysis-information?year=${year}&month=${month}`,
      {
        headers: {
          Authorization: admintoken,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching analysis info:", error);
    throw error;
  }
};
const getChartData = async (year) => {
  try {
    const response = await axios.get(`api/v1/chart-data?year=${year}`, {
      headers: {
        Authorization: admintoken,
      },
    });
    let data = response.data.data.map((item) => {
      return { y: item.totalCost, x: item.month };
    });
    return data;
  } catch (error) {
    console.error("Error fetching chart data:", error);
    throw error;
  }
};
const getPopularCourses = async () => {
  try {
    const response = await axios.get("api/v1/get-popular-course", {
      headers: {
        Authorization: admintoken,
      },
    });
    return response;
  } catch (error) {
    console.error("Error fetching popular courses:", error);
    throw error;
  }
};
const getPopularTeachers = async () => {
  try {
    const response = await axios.get("api/v1/get-popular-teacher", {
      headers: {
        Authorization: admintoken,
      },
    });
    return response;
  } catch (error) {
    console.error("Error fetching popular teachers:", error);
    throw error;
  }
};
export {
  getTeachers,
  getAllReviews,
  getAllCourses,
  ApproveCourse,
  StopCourse,
  delteCourse,
  getAllCourseOfATeacher,
  getAnalysisInfo,
  getChartData,
  getPopularCourses,
  getPopularTeachers,
};
