import { defaultTo, path, pipe } from "ramda";

export const slots = pipe(path(["slots"]), defaultTo({}));
export const itemIdentifierAt = (at) => path(["slots", at, "itemIdentifier"]);
export const creatureIdentifierAt = (at) =>
  path(["slots", at, "creatureIdentifier"]);
