import { fromPairs } from "ramda";
import { PLACE_CREATURES } from "../slots/actions";
import creatures from "../../models/creatures";
import { UNREAD_CREATURES, READ_CREATURE } from "./actions";

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

    case READ_CREATURE:
      if (action.identifier === action._identifier) {
        return { ...state, unread: false };
      }
      return state;

    default:
      return state;
  }
};

const creaturesReducer = (state = {}, action) => {
  switch (action.type) {
    case PLACE_CREATURES:
    case UNREAD_CREATURES:
    case READ_CREATURE: {
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
