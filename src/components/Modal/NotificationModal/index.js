import React from "react";
import { useSelector } from "react-redux";
import Modal from "..";
import Shelf from "./Shelf";
import Item from "./Item";
import { unreadBells as unreadBellsSelector } from "../../../store/notifications/selectors";

const Content = () => {
  const unreadBells = useSelector(unreadBellsSelector);

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
