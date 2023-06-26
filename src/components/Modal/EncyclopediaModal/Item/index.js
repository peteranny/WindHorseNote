import React from "react";
import styles from "./styles.css";

const Item = ({ icon }) => {
  return (
    <button className={styles.item}>
      <img src={icon} />
    </button>
  );
};

export default Item;
