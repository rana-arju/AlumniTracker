import React from "react";
import { Provider } from "react-redux";

import Dashboard from "./Dashboard/Dashboard";
import store from "../../redux/store";

export default function Admin() {
  return (
    <Provider store={store}>
      <Dashboard />
    </Provider>
  );
}
