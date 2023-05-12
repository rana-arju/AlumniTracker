// import { useState } from "react";

// const BaseURL = "https://worrisome-lion-necklace.cyclic.app/api/v1";

// export const statusApi = async ({ id, status, token }) => {
//   const options = {
//     method: "POST",
//     url: `${BaseURL}/UpdateUserStatus/${id}/${status}`,
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//   };
//   try {
//     if (token) {
//       const { data } = await axios.request(options);
//       console.log("he", data);
//     }
//   } catch (error) {
//     return false;
//   } finally {
//   }
// };
