import React, { useCallback, useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import { useSelector } from "react-redux";
import { take } from "ramda";
import Modal from "..";
import Shelf from "./Shelf";
import Item from "./Item";
import {
  hasUnreadBells,
  unreadBells as unreadBellsSelector,
} from "../../../store/notifications/selectors";
import usePush from "../../../hooks/usePush";
import styles from "./styles.css";

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

  const initialCount = 10;
  const [count, setCount] = useState(initialCount);
  const onMore = useCallback(() => setCount(count + 10), [count]);

  useEffect(() => {
    if (open) setCount(initialCount);
  }, [open]);

  return (
    <Shelf>
      {take(count, unreadBells).map(
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
      {unreadBells.length > count && (
        <button className={styles.more} onClick={onMore}>
          ...
        </button>
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
