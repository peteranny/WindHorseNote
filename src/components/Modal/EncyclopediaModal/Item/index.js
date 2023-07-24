import React from "react";
import { useSelector } from "react-redux";
import styles from "./styles.css";
import { seenCountOf, unreadOf } from "../../../../store/creatures/selectors";

const Item = ({ identifier, name, icon }) => {
  const seenCount = useSelector(seenCountOf(identifier));
  const unread = useSelector(unreadOf(identifier));

  return (
    <button
      className={styles.item}
      data-name={name}
      data-seen-count={seenCount}
      disabled={seenCount === 0}
    >
      {unread && <label className={styles.new}>NEW</label>}
      <img src={icon} />
    </button>
  );
};

export default Item;
