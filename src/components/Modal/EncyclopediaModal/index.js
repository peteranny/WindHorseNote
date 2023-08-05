import React from "react";
import Modal from "..";
import Shelf from "./Shelf";
import Item from "./Item";
import creatures from "../../../models/creatures";
import { useSelector } from "react-redux";
import { eligibleForFinalCreatures } from "../../../store/bellCount/selectors";

const Content = () => {
  const eligibleForHidden = useSelector(eligibleForFinalCreatures);
  const prunedCreatures = eligibleForHidden
    ? creatures
    : creatures.filter(({ hidden }) => !hidden);
  return (
    <Shelf>
      {prunedCreatures.map(
        ({ identifier, name, icon, hidden, featureVector }) => (
          <Item
            key={identifier}
            identifier={identifier}
            name={name}
            icon={icon}
            hidden={hidden}
            featureVector={featureVector}
          />
        )
      )}
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
