import React, { useCallback, useRef, useState } from "react";
import { useSelector } from "react-redux";
import cn from "classnames";
import { values, prop, isNotNil } from "ramda";
import styles from "./styles.css";
import wind from "./wind.png";
import horse from "./horse.png";
import sing from "./sing.mp3";
import singing from "./singing.png";
import { slots as slotsSelector } from "../../store/slots/selectors";

const Protagonist = ({ className }) => {
  const slots = useSelector(slotsSelector);
  const creatures = values(slots).map(prop("creatureIdentifier"));
  const active = creatures.find(isNotNil);

  // Click to play audio (autoplay is forbidden lol)
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef();
  const handleClick = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.play();
      setPlaying(true);
    }
  }, []);

  return (
    <div
      className={cn(styles.protagonist, { [styles.active]: active }, className)}
      onClick={handleClick}
    >
      {playing && <img className={styles.singing} src={singing} />}
      <audio ref={audioRef} loop src={sing} />
      <img className={styles.creature} src={wind} />
      <img className={styles.creature} src={horse} />
    </div>
  );
};

export default Protagonist;
