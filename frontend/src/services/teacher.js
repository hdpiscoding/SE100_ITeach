import axios from "../utils/AxiosCustomized";
const teacherToken =
  `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsImVtYWlsIjoiaHVuZzA4MDkyMDA0QGdtYWlsLmNvbSIsInJvbGUiOiJSMiIsImV4cGlyZXNJbiI6IjMwZCIsImlhdCI6MTcyNzU5OTQ4N30.2sAjaVD3nZ0KCZ1abl_8d2XXQqVKeVrLaZKeFuueALI`;

  const getMyAccount = async (body) => {
    try {
      const response = await axios.get(`api/v1/get-my-account`, body, {
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
