import React from "react";
import cn from "classnames";
import styles from "./styles.css";

const CornerButton = ({ className, ...props }) => {
  return <div className={cn(styles.button, className)} {...props} />;
};

export default CornerButton;
