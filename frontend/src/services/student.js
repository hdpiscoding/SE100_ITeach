import axios from "../utils/AxiosCustomized";
const admintoken =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImVtYWlsIjoiaHVuZzA5MDkyMDA0QGdtYWlsLmNvbSIsInJvbGUiOiJSMyIsImV4cGlyZXNJbiI6IjMwZCIsImlhdCI6MTcyNzU5OTUxN30.KQ6n_24TTHOleur0Mw-F6PgPlMqp2_EMZfrkylFrUNo";
const teachertoken = "";
const studenttoken =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiaHVuZzA3MDkyMDA0QGdtYWlsLmNvbSIsInJvbGUiOiJSMSIsImV4cGlyZXNJbiI6IjMwZCIsImlhdCI6MTcyNzU4MTM5Mn0.PjbiIFpTmHEswozHTdC246gXYYk8X8flQYvmOdSLlW8";
const getStudentCertificates = async (studentId) => {
  try {
    const response = await axios.get(
      "api/v1/get-student-certificates?studentId=" + studentId,
      {
        headers: {
          Authorization: studenttoken,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error fetching student certificates:", error);
    throw error;
  }
};

export { getStudentCertificates };
