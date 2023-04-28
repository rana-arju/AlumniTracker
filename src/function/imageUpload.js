import axios from "axios";
export const imageUpload = async (formData, token) => {
  try {
    console.log(`token: ${token}, formData: ${formData}`);
    const { data } = await axios.post(
      `http://localhost:8000/User/profileImage`,
      formData,

      {
        headers: {
          Authorization: `Bearer ${token}`,
          "content-type": "multipart/form-data",
        },
      }
    );
    return data;
  } catch (error) {
    return error.response.data.message;
  }
};
