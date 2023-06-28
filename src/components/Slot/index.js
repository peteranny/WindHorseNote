import React from "react";
import cn from "classnames";
import styles from "./styles.css";

const Slot = ({ className, at, ...props }) => {
  return <div className={cn(className, styles.slot)} {...props} />;
};

export default Slot;
