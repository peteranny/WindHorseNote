import React, { useCallback } from "react";
import styles from "./styles.css";
import usePush from "../../../../hooks/usePush";

const Item = ({ identifier, icon }) => {
  const push = usePush();
  const onClick = useCallback(() => {
    push(identifier);
  }, [push, identifier]);

  return (
    <button className={styles.item} onClick={onClick}>
      <img src={icon} />
    </button>
  );
};

export default Item;
