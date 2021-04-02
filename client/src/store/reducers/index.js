import { combineReducers } from "redux";
import currentUser from "./currentUser";
import errors from "./errors";
import photos from "./photos";
import schedules from "./schedules";

const rootReducer = combineReducers({
  currentUser,
  errors,
  photos,
  schedules,
});

export default rootReducer;
