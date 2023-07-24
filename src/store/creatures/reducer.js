import { fromPairs } from "ramda";
import { PLACE_CREATURES } from "../slots/actions";
import creatures from "../../models/creatures";
import { UNREAD_CREATURES } from "./actions";

const positions = ["upperLeft", "upperRight", "lowerLeft", "lowerRight"];

const creatureReducer = (state = {}, action) => {
  switch (action.type) {
    case PLACE_CREATURES: {
      const creatureIdentifiers = positions.map((at) => action[at]);

      if (creatureIdentifiers.includes(action._identifier) === false) {
        // No need to update
        return state;
      }

      return {
        ...state,
        seenCount: (state.seenCount ?? 0) + 1,
      };
    }

    case UNREAD_CREATURES:
      if (action.identifiers.includes(action._identifier)) {
        return { ...state, unread: true };
      }
      return state;

    default:
      return state;
  }
};

const creaturesReducer = (state = {}, action) => {
  switch (action.type) {
    case PLACE_CREATURES:
    case UNREAD_CREATURES: {
      const pairs = creatures.map(({ identifier: _identifier }) => [
        _identifier,
        creatureReducer(state[_identifier], { ...action, _identifier }),
      ]);
      return fromPairs(pairs);
    }

    default:
      return state;
  }
};

export default creaturesReducer;
