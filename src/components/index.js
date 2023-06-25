import React from "react";
import cn from "classnames";
import Lawn from "./Lawn";
import Protagonist from "./Protagonist";
import Slot from "./Slot";
import BackpackButton from "./CornerButton/BackpackButton";
import EncyclopediaButton from "./CornerButton/EncyclopediaButton";
import styles from "./styles.css";

const LawnScreen = () => {
  return (
    <Lawn className={styles.container}>
      <Protagonist className={styles.protagonist} />
      <Slot className={cn(styles.slot, styles.upperLeft)} at="upperLeft" />
      <Slot className={cn(styles.slot, styles.upperRight)} at="upperRight" />
      <Slot className={cn(styles.slot, styles.lowerLeft)} at="lowerLeft" />
      <Slot className={cn(styles.slot, styles.lowerRight)} at="lowerRight" />

      <div className={cn(styles.option, styles.upperRight)}>
        <BackpackButton />
        <EncyclopediaButton />
      </div>
    </Lawn>
  );
};

export default LawnScreen;
