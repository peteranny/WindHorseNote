import React from "react";
import cn from "classnames";
import Lawn from "./Lawn";
import Protagonist from "./Protagonist";
import Slot from "./Slot";
import BackpackModal from "./Modal/BackpackModal";
import EncyclopediaModal from "./Modal/EncyclopediaModal";
import BackpackItemSlotModal from "./Modal/BackpackItemSlotModal";
import BellCount from "./BellCount";
import BackpackButton from "./CornerButton/BackpackButton";
import EncyclopediaButton from "./CornerButton/EncyclopediaButton";
import styles from "./styles.css";
import usePlaceCreatures from "../hooks/usePlaceCreatures";

const LawnScreen = () => {
  usePlaceCreatures();

  return (
    <Lawn className={styles.container}>
      <Protagonist className={styles.protagonist} />
      <Slot className={cn(styles.slot, styles.upperLeft)} at="upperLeft" />
      <Slot className={cn(styles.slot, styles.upperRight)} at="upperRight" />
      <Slot className={cn(styles.slot, styles.lowerLeft)} at="lowerLeft" />
      <Slot className={cn(styles.slot, styles.lowerRight)} at="lowerRight" />

      <BackpackModal />
      <BackpackItemSlotModal />

      <EncyclopediaModal />

      <div className={cn(styles.option, styles.upperRight)}>
        <BackpackButton />
        <EncyclopediaButton />
      </div>

      <BellCount className={cn(styles.option, styles.upperLeft)} />
    </Lawn>
  );
};

export default LawnScreen;
