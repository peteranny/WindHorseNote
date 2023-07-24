const normalizeBy = (pow) => (vec) => {
  const sum = vec.reduce((prev, val) => prev + Math.pow(val, pow), 0);
  return vec.map((val) => Math.pow(val, pow) / sum);
};

export default normalizeBy(3);
