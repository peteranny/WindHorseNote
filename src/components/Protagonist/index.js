import React from "react";
import { useSelector } from "react-redux";
import cn from "classnames";
import { values, prop, isNotNil } from "ramda";
import styles from "./styles.css";
import wind from "./wind.png";
import horse from "./horse.png";
import { slots as slotsSelector } from "../../store/slots/selectors";

const Protagonist = ({ className }) => {
  const slots = useSelector(slotsSelector);
  const creatures = values(slots).map(prop("creatureIdentifier"));
  const active = creatures.find(isNotNil);
  return (
    <div
      className={cn(styles.protagonist, { [styles.active]: active }, className)}
    >
      <img className={styles.creature} src={wind} />
      <img className={styles.creature} src={horse} />
    </div>
  );
};

export default Protagonist;
