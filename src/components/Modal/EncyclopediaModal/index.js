import React from "react";
import Modal from "..";
import Shelf from "./Shelf";
import Item from "./Item";
import creatures from "../../../models/creatures";

const Content = () => {
  return (
    <Shelf>
      {creatures.map(({ identifier, icon }) => (
        <Item key={identifier} icon={icon} />
      ))}
    </Shelf>
  );
};

const EncyclopediaModal = () => {
  return (
    <Modal path="/encyclopedia">
      <Content />
    </Modal>
  );
};

export default EncyclopediaModal;
