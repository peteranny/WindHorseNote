import React from "react";
import cn from "classnames";
import Lawn from "./Lawn";
import Protagonist from "./Protagonist";
import Slot from "./Slot";
import BackpackModal from "./Modal/BackpackModal";
import EncyclopediaModal from "./Modal/EncyclopediaModal";
import NotificationModal from "./Modal/NotificationModal";
import BackpackItemSlotModal from "./Modal/BackpackItemSlotModal";
import FinalModal from "./Modal/FinalModal";
import BellCount from "./BellCount";
import BackpackButton from "./CornerButton/BackpackButton";
import EncyclopediaButton from "./CornerButton/EncyclopediaButton";
import styles from "./styles.css";
import usePlaceCreatures from "../hooks/usePlaceCreatures";
import useRefresher from "../hooks/useRefresher";
import useFinalPresenter from "../hooks/useFinalPresenter";
import EncyclopediaItemModal from "./Modal/EncyclopediaItemModal";

const LawnScreen = () => {
  usePlaceCreatures();
  useRefresher();
  useFinalPresenter();

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
      <EncyclopediaItemModal />

      <NotificationModal />
      <FinalModal />

      <div className={cn(styles.option, styles.upperRight)}>
        <BackpackButton />
        <EncyclopediaButton />
      </div>

      <BellCount className={cn(styles.option, styles.upperLeft)} />
    </Lawn>
  );
};

export default LawnScreen;
