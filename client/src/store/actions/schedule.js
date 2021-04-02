import { apiCall } from "../../services/api";
import { LOAD_SCHEDULE } from "../actionTypes";
import { addError, removeError } from "./errors";

export const loadSchedule = (schedule) => ({
  type: LOAD_SCHEDULE,
  schedule,
});

export const fetchSchedules = (query) => {
  return (dispatch) => {
    return apiCall("get", `/api/v1/schedule?${query}`)
      .then((res) => {
        dispatch(loadSchedule(res.data));
      })
      .catch((err) => {
        dispatch(addError(err.messages));
      });
  };
};

export const createSchedule = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    return apiCall("post", `/api/v1/schedule`, data)
      .then((res) => {
        dispatch(removeError());
        resolve(res);
      })
      .catch((err) => {
        dispatch(addError(err.message));
        reject();
      });
  });
};
