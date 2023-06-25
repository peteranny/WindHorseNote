import React from "react";
import cn from "classnames";
import styles from "./styles.css";

const Screen = ({ className, ...props }) => (
  <div className={styles.outer}>
    <div className={cn(className, styles.inner)} {...props} />
  </div>
);

export default Screen;
