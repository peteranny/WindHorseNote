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
import resolveSuffixIcon from "../../utils/resolveSuffixIcon";

const animationNames = [
  [styles.swing, 20],
  [styles.jump, 5],
  [styles.swing, 20],
  [styles.quiver, 1],
  [styles.jump, 5],
  [styles.spin, 1],
  [styles.swing, 20],
  [styles.jump, 5],
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

  const resolveIcon = resolveSuffixIcon(creature && creature.family);
  const overlay = resolveIcon(item.overlay);
  const icon = resolveIcon(item.icon);
  const activeIcon = resolveIcon(item.activeIcon);

  return (
    <div className={cn(className, styles.slot)} {...props}>
      {item && (
        <img
          className={cn(styles.item, styles[item.type])}
          style={creature && { animationName }}
          src={(creature && activeIcon) || icon}
        />
      )}
      {creature && (
        <div className={styles.creature} style={{ animationName }}>
          {overlay && <img className={styles.overlay} src={overlay} />}
          <img src={creature.icon} />
        </div>
      )}
    </div>
  );
};

export default Slot;
