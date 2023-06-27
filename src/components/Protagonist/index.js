import React from "react";
import cn from "classnames";
import styles from "./styles.css";
import wind from "./wind.png";
import horse from "./horse.png";

const Protagonist = ({ className }) => {
  return (
    <div className={cn(styles.protagonist, className)}>
      <img className={styles.creature} src={wind} />
      <img className={styles.creature} src={horse} />
    </div>
  );
};

export default Protagonist;
