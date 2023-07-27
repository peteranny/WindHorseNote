const resolveSuffixIcon = (family) => (src) =>
  (typeof src === "function"
    ? family
      ? src(family)
      : null // Default to wind
    : src) || null;

export default resolveSuffixIcon;
