import { zip } from "ramda";

const dotProduct = (vec1, vec2) =>
  zip(vec1, vec2)
    .map(([val1, val2]) => (val1 || 0) * (val2 || 0))
    .reduce((prev, val) => prev + val, 0);

export default dotProduct;
