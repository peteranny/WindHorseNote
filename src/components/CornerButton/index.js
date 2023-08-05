import React, { useCallback } from "react";
import cn from "classnames";
import styles from "./styles.css";
import usePush from "../../hooks/usePush";
import { useSelector } from "react-redux";
import { eligibleForFinalCreatures } from "../../store/bellCount/selectors";

const CornerButton = ({ className, path, onClick, unread, ...props }) => {
  const push = usePush();
  const handleClick = useCallback(() => {
    push(path);
    if (onClick) onClick();
  }, [push, onClick, path]);
  const showsFinal = useSelector(eligibleForFinalCreatures);

  return (
    <div
      className={cn(
        styles.button,
        { [styles.unread]: unread, [styles.showsFinal]: showsFinal },
        className
      )}
      onClick={handleClick}
      {...props}
    />
  );
};

export default CornerButton;
