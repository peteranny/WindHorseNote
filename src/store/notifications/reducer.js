import { READ_BELLS, UNREAD_BELLS } from "./actions";

const randomIdentifier = () => Math.floor(Math.random() * 100000000);

const notifications = (state = {}, action) => {
  switch (action.type) {
    case UNREAD_BELLS: {
      const { creatureIdentifier, itemIdentifier, bells } = action;
      return {
        ...state,
        unreadBells: [
          ...(state.unreadBells || []),
          {
            identifier: randomIdentifier(),
            creatureIdentifier,
            itemIdentifier,
            bells,
          },
        ],
      };
    }
    case READ_BELLS: {
      const unreadBells = state.unreadBells.filter(
        ({ identifier }) => identifier !== action.identifier
      );
      return {
        ...state,
        unreadBells,
      };
    }
    default:
      return state;
  }
};

export default notifications;
