import * as actionTypes from "../actionTypes/UserActionTypes";
import axios from "axios";
import { put } from "redux-saga/effects";

// Count User
export function* CountUser() {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDUzMmNhZjdlZDllYTg3MzA4ZmY2NTUiLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNjgzMTcyNTI3LCJleHAiOjE2ODM0MzE3Mjd9.ll1FA_9LdigVu-g4YIJqnLxy_JXhlO3PJ9mdS4wkrbY`,
      },
    };

    const res = yield axios.get(
      "https://alumni-tracker.onrender.com/api/v1/TotalUserCount",
      config
    );
    console.log(res);
    yield put({ type: actionTypes.GET_TOTAL_USER_COUNT, payload: res });
  } catch (error) {
    yield put({ type: actionTypes.ERROR, payload: error.message });
  }
}
