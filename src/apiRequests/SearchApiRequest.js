// import axios from "axios";
// import { SetAllUser, SetTotal } from "../redux/state-slice/user-slice";
// import store from "../redux/store/store";
// import { useEffect, useState } from "react";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// const [userId, setUserId] = useState("");

// useEffect(() => {
//   loadUserData();
// }, []);

// const loadUserData = async () => {
//   try {
//     let userData = await AsyncStorage.getItem("userData");
//     if (userData) {
//       userData = JSON.parse(userData);
//       console.log(userData)
//       setUserId(userData);
//     }
//   } catch (error) {
//     alert(error)
//   }
// };

// export const SearchUserRequest = async (pageNo, perPage, searchKeyword) => {
//   let URL = `http://10.0.2.2:8080/api/v1/SearchByName/${pageNo}/${perPage}/${searchKeyword}`;
//   try {
//     const Result = await axios.get(URL, {
//       headers: {
//         Authorization: `Bearer ${userId?.token}`,
//         "Content-Type": "application/json",
//       },
//     });
//     if (Result.status === 200 && Result.data["status"] === "success") {
//       if (Result.data["data"][0]["Rows"].length > 0) {
//         store.dispatch(SetAllUser(Result.data["data"][0]["Rows"]));
//         store.dispatch(SetTotal(Result.data["data"][0]["Total"][0]["count"]));
//       } else {
//         store.dispatch(SetAllUser([]));
//         store.dispatch(SetTotal([0]));
//       }
//     } else {
//       alert("Sometime was wrrong");
//     }
//   } catch (error) {
//     console.log(error + "api");
//     alert("Sometime was wrrong");
//   }
// };
