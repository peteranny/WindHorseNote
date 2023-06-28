export const PLACE_ITEM = "@@SLOTS/PLACE_ITEM";
export const PLACE_CREATURES = "@@SLOTS/PLACE_CREATURES";

export const placeItem = ({ identifier, at }) => ({
  type: PLACE_ITEM,
  identifier,
  at,
});

export const placeCreatures = ({
  upperLeft,
  upperRight,
  lowerLeft,
  lowerRight,
}) => ({
  type: PLACE_CREATURES,
  upperLeft,
  upperRight,
  lowerLeft,
  lowerRight,
});
