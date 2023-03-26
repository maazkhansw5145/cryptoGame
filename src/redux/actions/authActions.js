import {
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  CLEAR_AUTH_MSG,
  UPDATE_BALANCE,
  ADD_GAME,
} from "../Types";
import { toast } from "react-toastify";

export const login = (data) => async (dispatch) => {
  console.log("Auth action Login", data);
  await fetch(`http://localhost:4001/user/save`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user: data }),
  })
    .then((response) => {
      response.json().then((data) => {
        console.log("response from backend", data);
        dispatch({
          type: LOGIN_SUCCESS,
          payload: data,
        });
      });
    })
    .catch((e) => {
      console.log(e);
      // dispatch({
      //   type: LOGIN_FAIL,
      // });
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
    });
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

// export const updateBalance = (balance) => async (dispatch) => {
//   console.log(balance);
//   dispatch({
//     type: UPDATE_BALANCE,
//     payload: balance,
//   });
// };

export const addGame =
  (user, amount, result, newBalance, game, win_chances) => async (dispatch) => {
    console.log("ADDING GAME ACTION", user, amount, result, game, win_chances);
    await fetch(`http://localhost:4001/add/game/${user}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount, result, game, newBalance, win_chances }),
    }).then((response) => {
      response.json().then((data) => {
        console.log("Game added to db", data);

        dispatch({
          type: ADD_GAME,
          payload: data,
        });
      });
    });
  };

export const addTransaction =
  (user, amount, block_number) => async (dispatch) => {
    console.log("ADDING GAME ACTION", user, amount, block_number);
    await fetch(`http://localhost:4001/add/game/${user}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount, block_number }),
    }).then((response) => {
      response.json().then((data) => {
        console.log("Game added to db", data);

        dispatch({
          type: ADD_GAME,
          payload: data,
        });
      });
    });
  };

export const clearAuthMsg = () => async (dispatch) => {
  dispatch({
    type: CLEAR_AUTH_MSG,
  });
};
