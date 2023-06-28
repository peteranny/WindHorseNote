import React from "react";
import { useParams } from "react-router";
import Modal from "..";
import Item from "./Item";
import Shelf from "../EncyclopediaModal/Shelf";

const Content = () => {
  const { identifier } = useParams();
  return (
    <Shelf>
      <Item identifier={identifier} />
    </Shelf>
  );
};

const EncyclopediaItemModal = () => {
  return (
    <Modal path="/encyclopedia/:identifier">
      <Content />
    </Modal>
  );
};

export default EncyclopediaItemModal;
