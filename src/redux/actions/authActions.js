import {
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  CLEAR_AUTH_MSG,
} from "../Types";
// import url from "../../config/URL";
import { toast } from "react-toastify";

export const login = (data) => async (dispatch) => {
  console.log("Auth action Login", data);
  // await fetch(`${url}/api/user/login`, {
  //   method: "POST",
  //   headers: {
  //     Accept: "application/json",
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({ data: data }),
  // })
  // .then((response) => {
  // response.json().then((user) => {
  // console.log("response from backend",user)
  dispatch({
    type: LOGIN_SUCCESS,
    payload: data,
  });
  // });
  // })
  // .catch((e) => {
  //   console.log(e);
  //   dispatch({
  //     type: LOGIN_FAIL,
  //   });
  //   toast.error("Oops! Failed to login", {
  //     position: "top-center",
  //     autoClose: 5000,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //     theme: "colored",
  //   });
  // });
};

// Logout User
export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT_SUCCESS,
  });
  toast.success("Logged out successfully", {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
};

export const clearAuthMsg = () => async (dispatch) => {
  dispatch({
    type: CLEAR_AUTH_MSG,
  });
};
