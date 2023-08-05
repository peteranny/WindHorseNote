import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import usePush from "../../../../hooks/usePush";
import styles from "./styles.css";

const Splash = ({ path, to }) => {
  const push = usePush();
  const location = useLocation();
  const matches = location.pathname === path;

  useEffect(() => {
    if (matches) setTimeout(() => push(to), 5000); // To match the animation duration
  }, [matches, push, to]);

  if (!matches) return null;

  return <div className={styles.splash} />;
};

export default Splash;
