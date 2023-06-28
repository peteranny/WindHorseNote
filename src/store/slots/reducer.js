import {
  updateIntervalAfterAddition,
  updateIntervalAfterRemoval,
} from "../../models/constants";
import { PLACE_CREATURES, PLACE_ITEM } from "./actions";

const nextUpdateAfterRemoval = () =>
  Date.now() + updateIntervalAfterRemoval + Math.floor(Math.random() * 1000);
const nextUpdateAfterAddition = () =>
  Date.now() + updateIntervalAfterAddition + Math.floor(Math.random() * 1000);

const slot = (state = {}, action) => {
  switch (action.type) {
    case PLACE_ITEM:
      return {
        ...state,
        itemIdentifier: action.identifier,
        creatureIdentifier: null,
        nextUpdate: nextUpdateAfterRemoval(),
      };
    case PLACE_CREATURES: {
      const at = action.at;
      const creatureIdentifier = action[at];
      if (typeof creatureIdentifier === "undefined") {
        // No need to update
        return state;
      }

      return {
        ...state,
        creatureIdentifier,
        nextUpdate: creatureIdentifier
          ? nextUpdateAfterAddition() // If the creature added
          : nextUpdateAfterRemoval(), // If the creature removed
      };
    }
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
    case PLACE_CREATURES:
      return {
        ...state,
        upperLeft: slot(state.upperLeft, { ...action, at: "upperLeft" }),
        upperRight: slot(state.upperRight, { ...action, at: "upperRight" }),
        lowerLeft: slot(state.lowerLeft, { ...action, at: "lowerLeft" }),
        lowerRight: slot(state.lowerRight, { ...action, at: "lowerRight" }),
      };
    default:
      return state;
  }
};

export default slots;
