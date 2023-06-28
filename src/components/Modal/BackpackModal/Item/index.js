import React, { Fragment, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import cn from "classnames";
import styles from "./styles.css";
import usePush from "../../../../hooks/usePush";
import { itemIdentifierAt } from "../../../../store/slots/selectors";
import { placeItem } from "../../../../store/slots/actions";
import { boughtItem } from "../../../../store/backpack/selectors";
import items from "../../../../models/items";
import { buyItem } from "../../../../store/backpack/actions";
import { bellCount } from "../../../../store/bellCount/selectors";
import resolveSuffixIcon from "../../../../utils/resolveSuffixIcon";

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
  const bought = useSelector(boughtItem(identifier));
  const onClick = useCallback(() => {
    if (bought === false) {
      alert("購買成功");
      dispatch(buyItem({ identifier }));
    } else if (at && confirm(`你要收回${item.name}嗎？`)) {
      dispatch(placeItem({ identifier: null, at }));
    } else {
      push(identifier);
    }
  }, [identifier, push, at, item.name, dispatch, bought]);
  const bells = useSelector(bellCount);
  const buyable = bells >= item.bells;

  return (
    <button
      className={cn(styles.item, {
        [styles.placed]: placed,
        [styles.bought]: bought,
      })}
      disabled={!bought && !buyable}
      onClick={onClick}
      data-name={item.name}
      data-bells={item.bells}
    >
      <div className={styles.icon}>
        {item.overlay &&
          (typeof item.overlay === "function" ? (
            <Fragment>
              <img
                className={styles.overlay}
                src={resolveSuffixIcon("wind")(item.overlay)}
              />
              <img
                className={styles.overlay}
                src={resolveSuffixIcon("horse")(item.overlay)}
              />
            </Fragment>
          ) : (
            <img
              className={styles.overlay}
              src={resolveSuffixIcon("wind")(item.overlay)}
            />
          ))}
        <img src={icon} />
      </div>
    </button>
  );
};

export default Item;
