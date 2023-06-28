import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import cn from "classnames";
import styles from "./styles.css";
import usePush from "../../../../hooks/usePush";
import { itemIdentifierAt } from "../../../../store/slots/selectors";

const useAt = (identifier) => {
  const upperLeft = useSelector(itemIdentifierAt("upperLeft"));
  const upperRight = useSelector(itemIdentifierAt("upperRight"));
  const lowerLeft = useSelector(itemIdentifierAt("lowerLeft"));
  const lowerRight = useSelector(itemIdentifierAt("lowerRight"));
  if (upperLeft === identifier) {
    return "upperLeft";
  }
  if (upperRight === identifier) {
    return "upperRight";
  }
  if (lowerLeft === identifier) {
    return "lowerLeft";
  }
  if (lowerRight === identifier) {
    return "lowerRight";
  }
  return null;
};

const Item = ({ identifier, icon }) => {
  const push = usePush();
  const at = useAt(identifier);
  const placed = !!at;
  const onClick = useCallback(() => {
    push(identifier);
  }, [identifier, push]);

  return (
    <button
      className={cn(styles.item, { [styles.placed]: placed })}
      onClick={onClick}
    >
      <img src={icon} />
    </button>
  );
};

export default Item;
