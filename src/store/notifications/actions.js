export const UNREAD_BELLS = "@@NOTIFICATIONS/UNREAD_BELLS";
export const READ_BELLS = "@@NOTIFICATIONS/READ_BELLS";

export const unreadBells = ({ creatureIdentifier, itemIdentifier, bells }) => ({
  type: UNREAD_BELLS,
  creatureIdentifier,
  itemIdentifier,
  bells,
});

export const readBells = ({ identifier, bells }) => ({
  type: READ_BELLS,
  identifier,
  bells,
});
