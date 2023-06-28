import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import styles from "./styles.css";
import creatures from "../../../../models/creatures";
import items from "../../../../models/items";
import { readBells } from "../../../../store/notifications/actions";

const Item = ({ identifier, creatureIdentifier, itemIdentifier, bells }) => {
  const creature = creatures.find(
    ({ identifier }) => identifier === creatureIdentifier
  );
  const item = items.find(({ identifier }) => identifier === itemIdentifier);
  const dispatch = useDispatch();
  const onClick = useCallback(() => {
    dispatch(readBells({ identifier, bells }));
  }, [dispatch, identifier, bells]);

  if (!creature) return null;

  return (
    <button className={styles.container} data-bells={bells} onClick={onClick}>
      <img className={styles.creature} src={creature.icon} />
      <img className={styles.item} src={item.icon} />
    </button>
  );
};

export default Item;
