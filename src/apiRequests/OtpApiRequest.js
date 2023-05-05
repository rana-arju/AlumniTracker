import axios from "axios";
import { setEmail, setOTP } from "../screens/otp/helper/SessionHelper";
const BaseURL = "https://alumni-tracker-backend-api.vercel.app/api/v1";
import axiosRetry from "axios-retry";
axiosRetry(axios, { retries: 3, retryDelay: axiosRetry.exponentialDelay });
export async function RecoverVerifyEmailRequest(email) {
  try {
    let URL = BaseURL + "/RecoverVerifyEmail/" + email;

    let res = await axios.get(URL, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    console.log(res + "res");
    if (res.data["status"] === 200) {

      alert(res.data["status"] + " status");

      if (res.data["status"] === "fail") {

        alert("No user found");
        return false;

      } else {

        setEmail(email);
        alert(
          "A 6 Digit verification code has been sent to your email address. "
        );
        return true;
      }
    }
  } catch (error) {
    alert("User Not Found" + error);
    return false;
  }
}

export async function RecoverVerifyOTPRequest(email, otp) {
  try {
    let URL = BaseURL + "/RecoverVerifyOTP/" + email + "/" + otp;
    let res = await axios.get(URL);

    if (res.status === 200) {
      if (res.data["status"] === "fail") {
        alert("Code Verification Fail");
        return false;
      } else {
        setOTP(otp);
        alert("Code Verification Success");
        return true;
      }
    } else {
      alert("Something Went Wrong");
      return false;
    }
  } catch (e) {
    alert("Something Went Wrong");
    return false;
  }
}

export async function RecoverResetPassRequest(email, otp, password) {
  try {
    let URL = BaseURL + "/RecoverResetPass";
    let PostBody = { email: email, otp: otp, password: password };
    let res = await axios.post(URL, PostBody);
    if (res.status === 200) {
      if (res.data["status"] === "fail") {
        alert(res.data["data"]);
        return false;
      } else {
        setOTP(otp);
        alert("NEW PASSWORD CREATED");
        return true;
      }
    } else {
      alert("Something Went Wrong");
      return false;
    }
  } catch (e) {
    alert("Something Went Wrong");
    return false;
  }
}
