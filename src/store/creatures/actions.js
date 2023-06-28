export const UNREAD_CREATURES = "@@CREATURES/UNREAD_CREATURES";
export const READ_CREATURE = "@@CREATURES/READ_CREATURE";

export const unreadCreatures = (identifiers) => ({
  type: UNREAD_CREATURES,
  identifiers,
});

export const readCreature = (identifier) => ({
  type: READ_CREATURE,
  identifier,
});
