import { fork, all } from "redux-saga/effects";

import * as Users from "./saga/SagaUser";

export function* rootSaga() {
  yield all([...Object.values(Users)].map(fork));
}
