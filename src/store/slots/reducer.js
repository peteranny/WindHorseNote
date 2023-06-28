import { PLACE_ITEM } from "./actions";

const slot = (state = {}, action) => {
  switch (action.type) {
    case PLACE_ITEM:
      return {
        ...state,
        itemIdentifier: action.identifier,
      };
    default:
      return state;
  }
};

const slots = (state = {}, action) => {
  switch (action.type) {
    case PLACE_ITEM:
      return {
        ...state,
        [action.at]: slot(state[action.at], action),
      };
    default:
      return state;
  }
};

export default slots;
