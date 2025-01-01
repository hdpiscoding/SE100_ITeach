import instance from "../utils/AxiosCustomized";

const editUserProfile = async (data) => {
  try {
    const response = await instance.put("api/v1/update-user-info", data);
    return response.data;
  } catch (error) {
    console.error("Error while editing user profile", error);
    return null;
  }
};
const changePassword = async (data) => {
  try {
    const response = await instance.put("api/v1/change-password", data);
    return response.data;
  } catch (error) {
    console.error("Error while changing password", error);
    return null;
  }
};
const getCartItems = async (userId) => {
  try {
    const response = await instance.get(`api/v1/get-cart-items?id=${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error while getting cart items", error);
    return null;
  }
};
const deleteCartItem = async (id) => {
  try {
    const response = await instance.delete(`api/v1/delete-cart-item?id=${id}`);
    return response.data;
  } catch (error) {
    console.error("Error while deleting cart item", error);
    return null;
  }
};
const deleteAllCartItems = async (userId) => {
  try {
    const response = await instance.delete(`api/v1/delete-all-cart-items?userId=${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error while deleting all cart items", error);
    return null;
  }
};
const postPayment = async (data) => {
  try {
    const response = await instance.post("api/v1/post-payment", data);
    return response.data;
  } catch (error) {
    console.error("Error while posting payment", error);
    return null;
  }
};
const getOrders = async (userId) => {
  try {
    const response = await instance.get(`api/v1/get-students-orders?id=${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error while getting orders", error);
    return null;
  }
};
const getOrderItems = async (orderId) => {
  try {
    const response = await instance.get(`api/v1/get-students-orders-items?orderId=${orderId}`);
    return response.data;
  } catch (error) {
    console.error("Error while getting order items", error);
    return null;
  }
};
const getStudentCertificates = async (studentId) => {
  try {
    const response = await instance.get(`api/v1/get-student-certificates?studentId=${studentId}`);
    return response;
  } catch (error) {
    console.error("Error fetching student certificates:", error);
    throw error;
  }
};
const getMyCourses = async (studentId) => {
  try {
    const response = await instance.get(`api/v1/get-my-courses?id=${studentId}`);
    return response;
  } catch (error) {
    console.error("Error fetching my courses:", error);
    throw error;
  }
};
const getACertificate = async (id) => {
  try {
    const response = await instance.get(`api/v1/get-a-certificate?id=${id}`);
    return response;
  } catch (error) {
    console.error("Error fetching certificate:", error);
    throw error;
  }
};
const getAllCoursesCategories = async () => {
  try {
    const response = await instance.get("api/v1/get-all-courses-categories");
    return response;
  } catch (error) {
    console.error("Error fetching courses categories:", error);
    throw error;
  }
};
const getATeacherInfo = async (id) => {
  try {
    const response = await instance.get(`api/v1/get-a-teacher-info?id=${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching teacher info:", error);
    throw error;
  }
};

export {
  editUserProfile,
  changePassword,
  getCartItems,
  deleteCartItem,
  deleteAllCartItems,
  postPayment,
  getOrders,
  getOrderItems,
  getStudentCertificates,
  getMyCourses,
  getACertificate,
  getAllCoursesCategories,
  getATeacherInfo,
};
