import { map as mapValue, test, when, type, equals, pipe } from "ramda";
import items from "./index.json";
import normalize from "../../utils/normalize";

const suffixPattern = /\[suffix\]/;

const requireIfNeeded = when(test(/\.(png|jpe?g)$/), (value) => {
  if (suffixPattern.test(value)) {
    // If there is a suffix pattern, return a function that generates the asset
    return (suffix) =>
      require(`${value.replace(suffixPattern, suffix)}`).default;
  }
  return require(`${value}`).default;
});

const isArray = (e) => equals(type(e), "Array");

const normalizeIfNeeded = when(isArray, normalize);

export default items.map(mapValue(pipe(requireIfNeeded, normalizeIfNeeded)));
