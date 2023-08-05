import { path, defaultTo, pipe } from "ramda";
import { boughtAllItems, boughtFinalItems } from "../backpack/selectors";
import { seenAllCreatures, seenFinalCreatures } from "../creatures/selectors";

export const bellCount = pipe(path(["bellCount"]), defaultTo(0));

export const eligibleForFinalCreatures = (state) => {
  const hasBoughtAllItems = boughtAllItems(state);
  const hasSeenAllCreatures = seenAllCreatures(state);
  return hasBoughtAllItems && hasSeenAllCreatures;
};

export const eligibleForFinal = (state) => {
  const hasBoughtFinalItems = boughtFinalItems(state);
  const hasSeenFinalCreatures = seenFinalCreatures(state);
  return hasBoughtFinalItems && hasSeenFinalCreatures;
};
