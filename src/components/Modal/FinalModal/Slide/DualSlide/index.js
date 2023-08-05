import React, { Fragment } from "react";
import styles from "./styles.css";
import Marquee from "./Marquee";
import items from "../../../../../models/items";
import creatures from "../../../../../models/creatures";

const MovingItems = ({ className, size, secondsPerItem }) => {
  const pixelsPerPage = window.innerWidth;
  const numberOfPages = Math.ceil((size * items.length) / pixelsPerPage);
  const pixelsPerItem = size;
  const pixelsPerSecond = (1 / secondsPerItem) * pixelsPerItem;
  const seconds = Math.ceil(
    (1 / pixelsPerSecond) * numberOfPages * pixelsPerPage
  );

  return (
    <Marquee className={className} duration={seconds} height={size} reverse>
      {items
        .map(({ icon }) => (typeof icon === "function" ? icon("wind") : icon))
        .map((icon) => (
          <img key={icon} src={icon} style={{ height: size }} />
        ))}
    </Marquee>
  );
};

const MovingCreatures = ({ className, size, secondsPerCreature }) => {
  const pixelsPerPage = window.innerWidth;
  const numberOfPages = Math.ceil((size * creatures.length) / pixelsPerPage);
  const pixelsPerCreature = size;
  const pixelsPerSecond = (1 / secondsPerCreature) * pixelsPerCreature;
  const seconds = Math.ceil(
    (1 / pixelsPerSecond) * numberOfPages * pixelsPerPage
  );

  return (
    <Marquee className={className} duration={seconds} height={size}>
      {creatures.map(({ icon }) => (
        <img key={icon} src={icon} style={{ height: size }} />
      ))}
    </Marquee>
  );
};

const DualSlide = ({ raw, wind, horse, epilogue }) => {
  const { identifier, name, description } = creatures.find(
    ({ hidden }) => hidden
  );
  const [year, month] = identifier.match(/\d+/g);
  return (
    <Fragment>
      <MovingItems className={styles.slides} size={50} secondsPerItem={0.5} />
      <div className={styles.dual}>
        <img src={horse} />
        <img src={wind} />
      </div>
      <MovingCreatures
        className={styles.slides}
        size={50}
        secondsPerCreature={0.5}
      />
      <div className={styles.info}>
        <img src={raw} />

        <p>
          <span className={styles.name}>{name}</span>
          {year}年{month}月誕生。{description}
        </p>
        <p>{epilogue}</p>
      </div>
    </Fragment>
  );
};

export default DualSlide;
