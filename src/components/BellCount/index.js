import React from "react";
import { useSelector } from "react-redux";
import cn from "classnames";
import styles from "./styles.css";
import bell from "./bell.png";
import { hasUnreadBells } from "../../store/notifications/selectors";

const BellCount = ({ className, ...props }) => {
  const unread = useSelector(hasUnreadBells);
  return (
    <button
      className={cn(styles.bellCount, { [styles.unread]: unread }, className)}
      {...props}
    >
      <img src={bell} />0
    </button>
  );
};

export default BellCount;
