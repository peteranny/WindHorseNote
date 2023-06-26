import React from "react";
import cn from "classnames";
import styles from "./styles.css";

const Item = ({ icon }) => {
  return (
    <button className={cn(styles.item)}>
      <img src={icon} />
    </button>
  );
};

export default Item;
