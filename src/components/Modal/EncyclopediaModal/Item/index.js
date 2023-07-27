import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import styles from "./styles.css";
import { seenCountOf, unreadOf } from "../../../../store/creatures/selectors";
import usePush from "../../../../hooks/usePush";
import Favorites from "./Favorites";

const Item = ({ identifier, name, icon, featureVector }) => {
  const seenCount = useSelector(seenCountOf(identifier));
  const unread = useSelector(unreadOf(identifier));
  const push = usePush();
  const onClick = useCallback(() => push(identifier), [identifier, push]);

  return (
    <button
      className={styles.item}
      data-name={name}
      data-seen-count={seenCount}
      onClick={onClick}
      disabled={seenCount === 0}
    >
      {unread && <label className={styles.new}>NEW</label>}
      <img src={icon} />
      <Favorites featureVector={featureVector} />
    </button>
  );
};

export default Item;
