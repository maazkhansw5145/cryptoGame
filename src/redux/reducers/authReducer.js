import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  CLEAR_AUTH_MSG,
  UPDATE_BALANCE,
  ADD_GAME
} from "../Types";

const initialState = {
  isAuthenticated: null,
  msg: null,
  user: null,
  balance: 0.0,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      console.log("Action payload", action.payload);
      return {
        ...state,
        isAuthenticated: true,
        msg: "Login Successfully",
        user: action.payload,
        balance: action.payload.balance || 0,
      };
      case ADD_GAME:
        console.log("Action payload", action.payload);
        return {
          ...state,
          isAuthenticated: true,
          msg: "Login Successfully",
          user: action.payload,
          balance: action.payload.balance || 0,
        };
    case LOGIN_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        msg: "Login Fails",
        user: null,
      };
    case UPDATE_BALANCE:
      return {
        ...state,
        balance: action.payload,
      };
    case LOGOUT_SUCCESS:
    case CLEAR_AUTH_MSG:
      return {
        ...state,
        isAuthenticated: false,
        msg: "Logout",
        user: null,
      };
    default:
      return state;
  }
}
