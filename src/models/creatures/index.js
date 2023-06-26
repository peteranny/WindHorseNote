import { map as mapValue, test, when } from "ramda";
import creatures from "./index.json";

const requireIfNeeded = when(
  test(/\.(png|jpe?g)$/),
  (value) => require(`${value}`).default
);

export default creatures.map(mapValue(requireIfNeeded));
