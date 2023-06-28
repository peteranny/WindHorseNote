import { BUY } from "../backpack/actions";
import items from "../../models/items";
import { READ_BELLS } from "../notifications/actions";

const bells = (state = 0, action) => {
  switch (action.type) {
    case BUY: {
      const item = items.find((item) => item.identifier === action.identifier);
      const bells = item.bells;
      return Math.max(0, state - bells);
    }
    case READ_BELLS:
      return state + action.bells;
    default:
      return state;
  }
};

export default bells;
