import React from "react";
import { useSelector } from "react-redux";
import cn from "classnames";
import styles from "./styles.css";
import {
  itemIdentifierAt,
  creatureIdentifierAt,
  nextUpdateAt,
} from "../../store/slots/selectors";
import items from "../../models/items";
import creatures from "../../models/creatures";

const animationNames = [
  [styles.swing, 40],
  [styles.jump, 10],
  [styles.swing, 40],
  [styles.quiver, 5],
  [styles.jump, 10],
  [styles.spin, 1],
  [styles.swing, 40],
  [styles.jump, 10],
  [styles.rainbow, 1],
];

const animationNameByNextUpdate = (nextUpdate) => {
  const expaneded = animationNames.flatMap(([name, count]) =>
    Array(count).fill(name)
  );
  return expaneded[nextUpdate % expaneded.length];
};

const Slot = ({ className, at, ...props }) => {
  const itemIdentifier = useSelector(itemIdentifierAt(at));
  const creatureIdentifier = useSelector(creatureIdentifierAt(at));
  const nextUpdate = useSelector(nextUpdateAt(at));

  const item = items.find((item) => item.identifier === itemIdentifier);
  const creature = creatures.find(
    (creature) => creature.identifier === creatureIdentifier
  );
  const animationName = animationNameByNextUpdate(nextUpdate);

  if (!item) return null;

  return (
    <div className={cn(className, styles.slot)} {...props}>
      {item && (
        <img className={cn(styles.item, styles[item.type])} src={item.icon} />
      )}
      {creature && (
        <img
          className={styles.creature}
          style={{ animationName }}
          src={creature.icon}
        />
      )}
    </div>
  );
};

export default Slot;
