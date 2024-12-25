import axios from "../utils/AxiosCustomized";
const teacherToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsImVtYWlsIjoiaHVuZzA4MDkyMDA0QGdtYWlsLmNvbSIsInJvbGUiOiJSMiIsImV4cGlyZXNJbiI6IjMwZCIsImlhdCI6MTcyNzU5OTQ4N30.2sAjaVD3nZ0KCZ1abl_8d2XXQqVKeVrLaZKeFuueALI";

  const getMyAccount = async (teacherId) => {
    try {
      const response = await axios.get("api/v1/get-my-account", {
        headers: {
          Authorization: `Bearer ${teacherToken}`
        },
        body: {
          teacherId: teacherId
        }
      });
    return response.data;
  } catch (error) {
    console.error("Error while getting my account", error);
    return null;
  }
};
export { getMyAccount };
