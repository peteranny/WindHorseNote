export const PLACE_ITEM = "@@SLOTS/PLACE_ITEM";

export const placeItem = ({ identifier, at }) => ({
  type: PLACE_ITEM,
  identifier,
  at,
});
