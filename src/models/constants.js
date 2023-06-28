export const updateIntervalAfterRemoval = 1000 * 30; // 30 seconds

export const updateIntervalAfterAddition = 1000 * 60 * 5; // 5 minutes

export const refreshInterval = Math.min(
  updateIntervalAfterAddition,
  updateIntervalAfterRemoval
);
