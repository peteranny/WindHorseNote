import { path, defaultTo, pipe, not, isEmpty } from "ramda";

export const unreadBells = pipe(
  path(["notifications", "unreadBells"]),
  defaultTo([])
);

export const hasUnreadBells = pipe(unreadBells, isEmpty, not);
