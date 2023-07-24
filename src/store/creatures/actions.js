export const UNREAD_CREATURES = "@@CREATURES/UNREAD_CREATURES";

export const unreadCreatures = (identifiers) => ({
  type: UNREAD_CREATURES,
  identifiers,
});
