import { defaultTo, path, pipe } from "ramda";

export const slots = pipe(path(["slots"]), defaultTo({}));
export const itemIdentifierAt = (at) => path(["slots", at, "itemIdentifier"]);
export const creatureIdentifierAt = (at) =>
  path(["slots", at, "creatureIdentifier"]);

export const atForItem = (identifier) => (state) => {
  const upperLeft = itemIdentifierAt("upperLeft")(state);
  const upperRight = itemIdentifierAt("upperRight")(state);
  const lowerLeft = itemIdentifierAt("lowerLeft")(state);
  const lowerRight = itemIdentifierAt("lowerRight")(state);
  if (upperLeft === identifier) {
    return "upperLeft";
  }
  if (upperRight === identifier) {
    return "upperRight";
  }
  if (lowerLeft === identifier) {
    return "lowerLeft";
  }
  if (lowerRight === identifier) {
    return "lowerRight";
  }
  return null;
};
