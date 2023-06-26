import { map as mapValue, test, when } from "ramda";
import items from "./index.json";

const requireIfNeeded = when(
  test(/\.(png|jpe?g)$/),
  (value) => require(`${value}`).default
);

export default items.map(mapValue(requireIfNeeded));
