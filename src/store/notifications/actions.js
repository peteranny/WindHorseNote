export const UNREAD_BELLS = "@@NOTIFICATIONS/UNREAD_BELLS";

export const unreadBells = ({ creatureIdentifier, itemIdentifier, bells }) => ({
  type: UNREAD_BELLS,
  creatureIdentifier,
  itemIdentifier,
  bells,
});
