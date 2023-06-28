import { path } from "ramda";

export const itemIdentifierAt = (at) => path(["slots", at, "itemIdentifier"]);
