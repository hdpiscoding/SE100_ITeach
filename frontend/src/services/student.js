import axios from "../utils/AxiosCustomized";

const studentToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiaHVuZzA3MDkyMDA0QGdtYWlsLmNvbSIsInJvbGUiOiJSMSIsImV4cGlyZXNJbiI6IjMwZCIsImlhdCI6MTcyNzU4MTM5Mn0.PjbiIFpTmHEswozHTdC246gXYYk8X8flQYvmOdSLlW8";
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
const changePassword = async (data) => {
  try {
    const response = await axios.put("api/v1/change-password", data, {
      headers: {
        Authorization: `Bearer ${studentToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error while changing password", error);
    return null;
  }
};
const getCartItems = async (userId) => {
  try {
    const response = await axios.get(`api/v1/get-cart-items?id=${userId}`, {
      headers: {
        Authorization: `Bearer ${studentToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error while getting cart items", error);
    return null;
  }
};
const deleteCartItem = async (id) => {
  try {
    const response = await axios.delete(`api/v1/delete-cart-item?id=${id}`, {
      headers: {
        Authorization: `Bearer ${studentToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error while deleting cart item", error);
    return null;
  }
};
const deleteAllCartItems = async (userId) => {
  try {
    const response = await axios.delete(
      `api/v1/delete-all-cart-items?userId=${userId}`,
      {
        headers: {
          Authorization: `Bearer ${studentToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error while deleting all cart items", error);
    return null;
  }
};
const postPayment = async (data) => {
  try {
    const response = await axios.post("api/v1/post-payment", data, {
      headers: {
        Authorization: `Bearer ${studentToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error while posting payment", error);
    return null;
  }
};
const getOrders = async (userId) => {
  try {
    const response = await axios.get(
      `api/v1/get-students-orders?id=${userId}`,
      {
        headers: {
          Authorization: `Bearer ${studentToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error while getting orders", error);
    return null;
  }
};
const getOrderItems = async (orderId) => {
  try {
    const response = await axios.get(
      `api/v1/get-students-orders-items?orderId=${orderId}`,
      {
        headers: {
          Authorization: `Bearer ${studentToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error while getting order items", error);
    return null;
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
};
