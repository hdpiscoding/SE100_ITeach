import instance from "../utils/AxiosCustomized";

const getTeachers = async () => {
  try {
    const response = await instance.get("api/v1/get-all-teacher");
    return response;
  } catch (error) {
    console.error("Error fetching teachers:", error);
    throw error;
  }
};
const getAllReviews = async () => {
  try {
    const response = await instance.get("api/v1/get-all-reviews");
    return response;
  } catch (error) {
    console.error("Error fetching reviews:", error);
    throw error;
  }
};
const getAllCourses = async () => {
  try {
    const response = await instance.get("api/v1/get-all-courses");
    return response;
  } catch (error) {
    console.error("Error fetching courses:", error);
    throw error;
  }
};
const ApproveCourse = async (body) => {
  try {
    const response = await instance.put(`api/v1/approve-course`, body);
    return response;
  } catch (error) {
    console.error("Error approving course:", error);
    throw error;
  }
};
const StopCourse = async (body) => {
  try {
    const response = await instance.put(`api/v1/stop-course`, body);
    return response;
  } catch (error) {
    console.error("Error stopping course:", error);
    throw error;
  }
};
const deleteCourse = async (body) => {
  try {
    const response = await instance.put(`api/v1/delete-course`, body);
    return response;
  } catch (error) {
    console.error("Error deleting course:", error);
    throw error;
  }
};
const getAllCourseOfATeacher = async (teacherId) => {
  try {
    const response = await instance.get(`api/v1/get-all-course-of-teacher?teacherId=${teacherId}`);
    return response;
  } catch (error) {
    console.error("Error fetching courses of teacher:", error);
    throw error;
  }
};
const getAnalysisInfo = async (year, month) => {
  try {
    const response = await instance.get(`api/v1/get-analysis-information?year=${year}&month=${month}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching analysis info:", error);
    throw error;
  }
};
const getChartData = async (year) => {
  try {
    const response = await instance.get(`api/v1/chart-data?year=${year}`);
    let data = response.data.data.map((item) => {
      return { y: item.totalCost, x: item.month };
    });
    return data;
  } catch (error) {
    console.error("Error fetching chart data:", error);
    throw error;
  }
};

export {
  getTeachers,
  getAllReviews,
  getAllCourses,
  ApproveCourse,
  StopCourse,
  deleteCourse,
  getAllCourseOfATeacher,
  getAnalysisInfo,
  getChartData,
};
