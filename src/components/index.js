import React from "react";
import Lawn from "./Lawn";
import Protagonist from "./Protagonist";
import styles from "./styles.css";

const LawnScreen = () => {
  return (
    <Lawn className={styles.container}>
      <Protagonist className={styles.protagonist} />
    </Lawn>
  );
};

export default LawnScreen;
