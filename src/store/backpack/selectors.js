import { path, defaultTo, pipe, ifElse, always } from "ramda";
import items from "../../models/items";

export const boughtItem = (identifier) =>
  ifElse(
    always(items.find((item) => item.identifier === identifier).bells === 0),
    always(true),
    pipe(path(["backpack", identifier]), defaultTo(false))
  );

export const boughtAllItems = (state) =>
  items
    .filter(({ hidden }) => !hidden)
    .every(({ identifier }) => boughtItem(identifier)(state));

export const boughtFinalItems = (state) => {
  const ii = items.filter(({ hidden }) => hidden);
  return ii.some(({ identifier }) => boughtItem(identifier)(state));
};
