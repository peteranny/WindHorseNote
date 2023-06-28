import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import cn from "classnames";
import styles from "./styles.css";
import bell from "./bell.png";
import usePush from "../../hooks/usePush";
import { hasUnreadBells } from "../../store/notifications/selectors";

const BellCount = ({ className, ...props }) => {
  const unread = useSelector(hasUnreadBells);
  const push = usePush();
  const onClick = useCallback(() => {
    if (unread) push("/notification");
  }, [push, unread]);
  return (
    <button
      className={cn(styles.bellCount, { [styles.unread]: unread }, className)}
      onClick={onClick}
      {...props}
    >
      <img src={bell} />0
    </button>
  );
};

export default BellCount;
