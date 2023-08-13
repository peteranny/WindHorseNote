import { path, defaultTo, pipe } from "ramda";

export const seenFinal = pipe(path(["final", "seenFinal"]), defaultTo(false));
