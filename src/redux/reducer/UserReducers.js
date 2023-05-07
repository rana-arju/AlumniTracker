import * as actionTypes from "../../redux/actionTypes/UserActionTypes";

export const User = (state = { CountUser: 0 }, action) => {
  switch (action.type) {
    case actionTypes.GET_TOTAL_USER_COUNT:
      return {
        ...state,
        CountUser: action.payload,
      };
    case actionTypes.ERROR:
      return {
        ...state,
        CountUser: null,
        error: action.payload,
      };
    case actionTypes.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
