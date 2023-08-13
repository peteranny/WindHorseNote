import { SEEN_FINAL } from "./actions";

const final = (state = {}, action) => {
  switch (action.type) {
    case SEEN_FINAL: {
      return {
        ...state,
        seenFinal: true,
      };
    }
    default:
      return state;
  }
};

export default final;
