import { pipe, path, defaultTo } from "ramda";
import creatures from "../../models/creatures";

export const seenCountOf = (identifier) =>
  pipe(path(["creatures", identifier, "seenCount"]), defaultTo(0));

export const unseenCreatureIdentifiers = (state) =>
  creatures
    .map(path(["identifier"]))
    .filter((identifier) => seenCountOf(identifier)(state) === 0);

export const unreadOf = (identifier) =>
  pipe(path(["creatures", identifier, "unread"]), defaultTo(false));

export const unreadEncyclopedia = (state) =>
  creatures.some(({ identifier }) => unreadOf(identifier)(state));
