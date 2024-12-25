import axios from "../utils/AxiosCustomized";
const teacherToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjcsImVtYWlsIjoiaHVuZzA3MDkyMDA0QGdtYWlsLmNvbSIsInJvbGUiOiJUMSIsImV4cGlyZXNJbiI6IjMwZCIsImlhdCI6MTczNDQ4OTMzMn0.tQgwfeQOTs0adWu70z1i5VAQQr6jXWtDfy4GVcifsFA";
let teacherId = 1;
  const getMyAccount = async () => {
    try {
      const response = await axios.get("api/v1/get-my-account", {
        headers: {
          Authorization: `Bearer ${teacherToken}`
        }
      });
    return response.data;
  } catch (error) {
    console.error("Error while getting my account", error);
    return null;
  }
};
export { getMyAccount };
