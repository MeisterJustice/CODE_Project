import { apiCall } from "../../services/api";
import { LOAD_PHOTOS } from "../actionTypes";
import { addError, removeError } from "./errors";

export const loadPhotos = (photo) => ({
  type: LOAD_PHOTOS,
  photo,
});

export const fetchPhotos = (query) => {
  return (dispatch) => {
    return apiCall("get", `/api/v1/photo`)
      .then((res) => {
        dispatch(loadPhotos(res.data));
      })
      .catch((err) => {
        dispatch(addError(err.messages));
      });
  };
};

export const createPhoto = (data, query) => (dispatch) => {
  return new Promise((resolve, reject) => {
    return apiCall("post", `/api/v1/photo?${query}`, data)
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
