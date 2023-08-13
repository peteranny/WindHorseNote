import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import usePush from "../../../../hooks/usePush";
import styles from "./styles.css";
import { useDispatch, useSelector } from "react-redux";
import { seenFinal as seenFinalSelector } from "../../../../store/final/selectors";
import { seenFinal as seenFinaAction } from "../../../../store/final/actions";

const Splash = ({ path, to }) => {
  const push = usePush();
  const location = useLocation();
  const matches = location.pathname === path;
  const seenFinal = useSelector(seenFinalSelector());
  const dispatch = useDispatch();

  useEffect(() => {
    if (matches) {
      if (!seenFinal) {
        setTimeout(() => {
          dispatch(seenFinaAction());
          push(to);
        }, 5000); // To match the animation duration
      } else {
        push(to);
      }
    }
  }, [matches]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!matches || seenFinal) return null;

  return <div className={styles.splash} />;
};

export default Splash;
