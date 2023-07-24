import { map as mapValue, test, when, type, equals, pipe } from "ramda";
import items from "./index.json";
import normalize from "../../utils/normalize";

const requireIfNeeded = when(
  test(/\.(png|jpe?g)$/),
  (value) => require(`${value}`).default
);

const isArray = (e) => equals(type(e), "Array");

const normalizeIfNeeded = when(isArray, normalize);

export default items.map(mapValue(pipe(requireIfNeeded, normalizeIfNeeded)));
