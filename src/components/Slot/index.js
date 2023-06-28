import React from "react";
import { useSelector } from "react-redux";
import cn from "classnames";
import styles from "./styles.css";
import {
  itemIdentifierAt,
  creatureIdentifierAt,
} from "../../store/slots/selectors";
import items from "../../models/items";
import creatures from "../../models/creatures";

const Slot = ({ className, at, ...props }) => {
  const itemIdentifier = useSelector(itemIdentifierAt(at));
  const creatureIdentifier = useSelector(creatureIdentifierAt(at));

  const item = items.find((item) => item.identifier === itemIdentifier);
  const creature = creatures.find(
    (creature) => creature.identifier === creatureIdentifier
  );

  if (!item) return null;

  return (
    <div className={cn(className, styles.slot)} {...props}>
      {item && (
        <img className={cn(styles.item, styles[item.type])} src={item.icon} />
      )}
      {creature && <img className={styles.creature} src={creature.icon} />}
    </div>
  );
};

export default Slot;
