import axios from "axios";
import { GET_ERRORS } from "./types";

export const reserveRoom = (roomData) => (dispatch) => {
  axios
    .post("/api/manage/reserve", roomData)
    .then((_) => {
      window.location = "/dashboard";
    })
    .catch((err) => {
      console.error(err);
      return dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const calculatePrice = (roomData) => {
  return new Promise((resolve, reject) => {
    axios
      .post("/api/manage/cost", roomData)
      .then((val) => {
        resolve(val.data.cost);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
