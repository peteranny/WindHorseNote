import React from "react";
import { useSelector } from "react-redux";
import cn from "classnames";
import styles from "./styles.css";
import { itemIdentifierAt } from "../../store/slots/selectors";
import items from "../../models/items";

const Slot = ({ className, at, ...props }) => {
  const itemIdentifier = useSelector(itemIdentifierAt(at));
  const item = items.find((item) => item.identifier === itemIdentifier);

  if (!item) return null;

  return (
    <div className={cn(className, styles.slot)} {...props}>
      {item && <img className={cn(styles.item, styles[item.type])} src={item.icon} />}
    </div>
  );
};

export default Slot;
