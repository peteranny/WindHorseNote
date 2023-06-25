import React, { useCallback } from "react";
import cn from "classnames";
import styles from "./styles.css";
import usePush from "../../hooks/usePush";

const CornerButton = ({ className, path, onClick, ...props }) => {
  const push = usePush();
  const handleClick = useCallback(() => {
    push(path);
    if (onClick) onClick();
  }, [push, onClick, path]);

  return (
    <div
      className={cn(styles.button, className)}
      onClick={handleClick}
      {...props}
    />
  );
};

export default CornerButton;
