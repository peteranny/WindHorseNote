import React from "react";
import styles from "./styles.css";

const Item = ({ name, icon }) => {
  return (
    <button className={styles.item} data-name={name}>
      <img src={icon} />
    </button>
  );
};

export default Item;
