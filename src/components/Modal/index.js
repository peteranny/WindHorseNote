import React, { useCallback } from "react";
import { Route, useLocation } from "react-router-dom";
import cn from "classnames";
import usePush from "../../hooks/usePush";
import styles from "./styles.css";
import useSafariHeightHack from "../../hooks/useSafariViewHeightHack";

const Modal = ({ className, path, children }) => {
  const push = usePush();
  const close = useCallback(() => {
    push("..");
  }, [push]);

  const preventPropagation = useCallback((e) => {
    e.stopPropagation();
  }, []);

  const { pathname } = useLocation();
  const hackRef = useSafariHeightHack([pathname === path]);

  return (
    <Route path={path}>
      <div className={styles.overlay} onClick={close}>
        <div className={styles.container}>
          <div className={styles.modal} onClick={preventPropagation}>
            <div ref={hackRef} className={cn(styles.content, className)}>
              {children}
            </div>
            <button className={styles.closeButton} onClick={close} />
          </div>
        </div>
      </div>
    </Route>
  );
};

export default Modal;
