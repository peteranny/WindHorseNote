import React from "react";
import Modal from "..";
import Shelf from "./Shelf";
import items from "../../../models/items";
import Item from "./Item";

const BackpackModal = () => {
  return (
    <Modal path="/backpack">
      <Shelf>
        {items.map(({ identifier, icon }) => (
          <Item key={identifier} icon={icon} />
        ))}
      </Shelf>
    </Modal>
  );
};

export default BackpackModal;
