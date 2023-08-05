import React from "react";
import cn from "classnames";
import styles from "./styles.css";

const Shelf = ({
  className,
  fadingOut,
  fadingDuration,
  children,
  ...props
}) => (
  <div className={cn(className, styles.store)} {...props}>
    <div
      className={cn(styles.content, styles.fadingIn, {
        [styles.fadingOut]: fadingOut,
      })}
      style={{ animationDuration: `${fadingDuration / 1000}s` }}
    >
      {children}
    </div>
    <div className={styles.bg} />
  </div>
);

export default Shelf;
