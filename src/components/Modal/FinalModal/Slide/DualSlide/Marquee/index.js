import React from "react";
import cn from "classnames";
import styles from "./styles.css";

const repeat = (count) => (element) =>
  [...Array(count).keys()].map(() => element);

const Marquee = ({ className, duration, height, reverse, children }) => (
  <div className={cn(styles.marquee, className)} style={{ height }}>
    <div
      className={styles.content}
      style={{
        animationDuration: `${duration}s`,
        animationDirection: reverse ? "reverse" : "normal",
      }}
    >
      {repeat(2)(children).map((e, i) => (
        <div key={i}>{e}</div>
      ))}
    </div>
  </div>
);

export default Marquee;
