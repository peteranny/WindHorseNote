import { map as mapValue, test, when } from "ramda";
import slides from "./index.json";

const requireIfNeeded = when(
  test(/\.(png|jpe?g)$/),
  (value) => require(`${value}`).default
);

export default slides.map(mapValue(requireIfNeeded));
