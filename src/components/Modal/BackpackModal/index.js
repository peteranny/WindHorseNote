import React from "react";
import Modal from "..";
import Shelf from "./Shelf";
import items from "../../../models/items";
import Item from "./Item";
import { useSelector } from "react-redux";
import { eligibleForFinalCreatures } from "../../../store/bellCount/selectors";

const BackpackModal = () => {
  const eligibleForHidden = useSelector(eligibleForFinalCreatures);
  const prunedItems = eligibleForHidden
    ? items
    : items.filter(({ hidden }) => !hidden);

  return (
    <Modal path="/backpack">
      <Shelf>
        {prunedItems.map(({ identifier, icon }) => (
          <Item key={identifier} identifier={identifier} icon={icon} />
        ))}
      </Shelf>
    </Modal>
  );
};

export default BackpackModal;
