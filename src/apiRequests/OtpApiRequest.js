import axios from "axios";

import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
const BaseURL = "https://alumni-tracker-backend-api.vercel.app/api/v1/";

export async function RecoverVerifyEmailRequest(email) {
  try {
    const URL = `${BaseURL}RecoverVerifyEmail/${email}`;

    let res = await axios.get(URL);
    if (res.data["status"] === "success" && res.status === 200) {
      if (res.data["status"] === "fail") {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "No user found",
        });
        return false;
      } else {
        await AsyncStorage.setItem("email", email);
        Toast.show({
          type: "success",
          text1: "Success.",
          text2: "Verify E-mail Successful.",
        });
        return true;
      }
    }
  } catch (error) {
    Toast.show({
      type: "error",
      text1: "Error",
      text2: "Something Went Wrong",
    });
    return false;
  }
}

export async function RecoverVerifyOTPRequest(email, otp) {
  try {
    let URL = `${BaseURL}/RecoverVerifyOTP/${email}/${otp}`;
    let res = await axios.get(URL);
    if (res.data["status"] === "success" && res.status === 200) {
      if (res.data["status"] === "fail") {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Something Went Wrong",
        });
        return false;
      } else {
        await AsyncStorage.setItem("otp", otp);
        Toast.show({
          type: "success",
          text1: "Success.",
          text2: "Code Verification Success.",
        });
        return true;
      }
    }
  } catch (error) {
    Toast.show({
      type: "error",
      text1: "Error",
      text2: "Something Went Wrong",
    });
    return false;
  }
}

export async function RecoverResetPassRequest(email, otp, password) {
  try {
    let URL = `${BaseURL}RecoverResetPass`;
    let PostBody = { email: email, otp: otp, password: password };
    let res = await axios.post(URL, PostBody);
    if (res.status === 200) {
      if (res.data["status"] === "fail") {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Invalid Request",
        });
        return false;
      } else {
        await AsyncStorage.setItem("otp", otp);
        Toast.show({
          type: "success",
          text1: "Success.",
          text2: "NEW PASSWORD CREATED",
        });
        return true;
      }
    } else {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Something Went Wrong",
      });
      return false;
    }
  } catch (error) {
    Toast.show({
      type: "error",
      text1: "Error",
      text2: "Something Went Wrong",
    });
    return false;
  }
}

