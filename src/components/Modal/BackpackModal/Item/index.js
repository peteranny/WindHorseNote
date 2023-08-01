import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import cn from "classnames";
import styles from "./styles.css";
import usePush from "../../../../hooks/usePush";
import { itemIdentifierAt } from "../../../../store/slots/selectors";
import { placeItem } from "../../../../store/slots/actions";
import items from "../../../../models/items";

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
  const dispatch = useDispatch();
  const push = usePush();
  const at = useAt(identifier);
  const placed = !!at;
  const item = items.find((item) => item.identifier === identifier);
  const onClick = useCallback(() => {
    if (at && confirm(`你要收回${item.name}嗎？`)) {
      dispatch(placeItem({ identifier: null, at }));
    } else {
      push(identifier);
    }
  }, [identifier, push, at, item.name, dispatch]);

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
