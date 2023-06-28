import React from "react";
import { useSelector } from "react-redux";
import styles from "./styles.css";
import { seenCountOf } from "../../../../store/creatures/selectors";

const Item = ({ identifier, name, icon }) => {
  const seenCount = useSelector(seenCountOf(identifier));

  return (
    <button
      className={styles.item}
      data-name={name}
      data-seen-count={seenCount}
    >
      <img src={icon} />
    </button>
  );
};

export default Item;
