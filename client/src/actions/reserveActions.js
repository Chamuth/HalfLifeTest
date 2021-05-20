import axios from "axios";
import { GET_ERRORS } from "./types";

export const retrieveProperties = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`/api/manage/properties`)
      .then((val) => {
        resolve(val.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const retrieveRooms = (propertyid) => {
  return new Promise((resolve, reject) => {
    if (propertyid) {
      axios
        .get(`/api/manage/property/${propertyid}/rooms`)
        .then((val) => {
          resolve(val.data);
        })
        .catch((err) => {
          reject(err);
        });
    } else {
      reject({});
    }
  });
};

export const retrieveReservations = (userid) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`/api/manage/reservations/${userid}`)
      .then((val) => {
        resolve(val.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

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
        console.log(val.data);
        resolve(val.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const checkRoom = (roomid) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`/api/manage/room/${roomid}/availability`)
      .then((val) => {
        resolve(val.data.available);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const cancelReservationAction = (reservationid, userid) => {
  return new Promise((resolve, reject) => {
    axios.post("/api/manage/cancel", { reservationid, userid }).then((val) => {
      console.log(val);
      resolve(val);
    });
  });
};

export const calculateCancellationCost = (reservationid) => {
  return new Promise((res, rej) => {
    axios.post("/api/manage/cancelcost", { reservationid }).then((val) => {
      console.log(val);
      res(val);
    });
  });
};
