import { path, defaultTo, pipe } from "ramda";

export const bellCount = pipe(path(["bellCount"]), defaultTo(0));
