import axios from "axios";
import { GET_ERRORS } from "./types";

export const reserveRoom = (roomData) => (dispatch) => {
  axios
    .post("/api/manage/reserve", roomData)
    .then((val) => {
      console.log({
        start: new Date(val.data.start).toLocaleString(),
        end: new Date(val.data.end).toLocaleString(),
      });
    })
    .catch((err) => {
      console.error(err);
      return dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};
