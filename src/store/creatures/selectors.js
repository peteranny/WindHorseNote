import { pipe, path, defaultTo } from "ramda";

export const seenCountOf = (identifier) =>
  pipe(path(["creatures", identifier, "seenCount"]), defaultTo(0));
