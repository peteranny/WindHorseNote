import { BUY } from "./actions";

const backpack = (state = {}, action) => {
  switch (action.type) {
    case BUY:
      return { ...state, [action.identifier]: true };
    default:
      return state;
  }
};

export default backpack;
