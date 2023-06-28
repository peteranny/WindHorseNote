import React, { useEffect } from "react";
import { useRouteMatch } from "react-router-dom";
import { useSelector } from "react-redux";
import Modal from "..";
import Shelf from "./Shelf";
import Item from "./Item";
import {
  hasUnreadBells,
  unreadBells as unreadBellsSelector,
} from "../../../store/notifications/selectors";
import usePush from "../../../hooks/usePush";

const Content = () => {
  const { path } = useRouteMatch();
  const open = path === "/notification";
  const unread = useSelector(hasUnreadBells);
  const unreadBells = useSelector(unreadBellsSelector);
  const push = usePush();

  useEffect(() => {
    // Close the model when no items
    if (open && !unread) {
      push("..");
    }
  }, [open, unread, push]);

  return (
    <Shelf>
      {unreadBells.map(
        ({ identifier, creatureIdentifier, itemIdentifier, bells }, index) => (
          <Item
            key={index}
            identifier={identifier}
            creatureIdentifier={creatureIdentifier}
            itemIdentifier={itemIdentifier}
            bells={bells}
          />
        )
      )}
    </Shelf>
  );
};

const NotificationModal = () => (
  <Modal path="/notification">
    <Content />
  </Modal>
);

export default NotificationModal;
