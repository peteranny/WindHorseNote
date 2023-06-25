import React from "react";
import { Route } from "react-router-dom";
import cn from "classnames";
import styles from "./styles.css";

const Modal = ({ className, path, children }) => {
  return (
    <Route path={path}>
      <div className={styles.overlay}>
        <div className={styles.container}>
          <div className={cn(styles.modal, className)}>
            <div className={styles.content}>{children}</div>
          </div>
        </div>
      </div>
    </Route>
  );
};

export default Modal;
