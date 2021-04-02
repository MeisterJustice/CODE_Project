import { LOAD_PHOTOS } from "../actionTypes";

const photo = (state = [], action) => {
  switch (action.type) {
    case LOAD_PHOTOS:
      return [...action.photo];
    default:
      return state;
  }
};

export default photo;
