import { LOAD_SCHEDULE } from "../actionTypes";

const schedule = (state = [], action) => {
  switch (action.type) {
    case LOAD_SCHEDULE:
      return [...action.schedule];
    default:
      return state;
  }
};

export default schedule;
