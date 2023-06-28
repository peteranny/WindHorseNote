import React from "react";
import cn from "classnames";
import styles from "./styles.css";

const Shelf = ({ className, ...props }) => (
  <div className={cn(className, styles.store)} {...props} />
);

export default Shelf;
