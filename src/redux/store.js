import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import { rootSaga } from "./rootSaga";
import { User } from "./reducer/UserReducers";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    User: User,
  },
  middleware: () => [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export default store;
