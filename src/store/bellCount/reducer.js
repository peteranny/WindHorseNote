import { READ_BELLS } from "../notifications/actions";

const bells = (state = 0, action) => {
  switch (action.type) {
    case READ_BELLS:
      return state + action.bells;
    default:
      return state;
  }
};

export default bells;
