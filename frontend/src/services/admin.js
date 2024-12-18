import axios from "../utils/AxiosCustomized";
const admintoken =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImVtYWlsIjoiaHVuZzA5MDkyMDA0QGdtYWlsLmNvbSIsInJvbGUiOiJSMyIsImV4cGlyZXNJbiI6IjMwZCIsImlhdCI6MTcyNzU5OTUxN30.KQ6n_24TTHOleur0Mw-F6PgPlMqp2_EMZfrkylFrUNo";
const teachertoken = "";
const studenttoken = "";
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
export { getTeachers };
