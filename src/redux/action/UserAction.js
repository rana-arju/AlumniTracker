import * as actionTypes from "../actionTypes/UserActionTypes";

// Clear Error
export const UserCount = (dispatch) => {
  dispatch({ type: actionTypes.GET_TOTAL_USER_COUNT });
};

// Clear Error
export const ClearError = (dispatch) => {
  dispatch({ type: actionTypes.CLEAR_ERROR });
};
