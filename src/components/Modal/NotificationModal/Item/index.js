import React from "react";
import styles from "./styles.css";
import creatures from "../../../../models/creatures";
import items from "../../../../models/items";

const Item = ({ creatureIdentifier, itemIdentifier, bells }) => {
  const creature = creatures.find(
    ({ identifier }) => identifier === creatureIdentifier
  );
  const item = items.find(({ identifier }) => identifier === itemIdentifier);

  if (!creature) return null;

  return (
    <button className={styles.container} data-bells={bells}>
      <img className={styles.creature} src={creature.icon} />
      <img className={styles.item} src={item.icon} />
    </button>
  );
};

export default Item;
