import React from "react";
import cn from "classnames";
import styles from "./styles.css";
import bell from "./bell.png";

const BellCount = ({ className, ...props }) => {
  return (
    <button className={cn(styles.bellCount, className)} {...props}>
      <img src={bell} />
      0
    </button>
  );
};

export default BellCount;
