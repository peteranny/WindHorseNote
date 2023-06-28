export const BUY = "@@BACKPACK/BUY";

export const buyItem = ({ identifier }) => ({
  type: BUY,
  identifier,
});
