import React from "react";
import { useSelector } from "react-redux";
import styles from "./styles.css";
import { seenCountOf } from "../../../../store/creatures/selectors";
import creatures from "../../../../models/creatures";
import Favorites from "../../EncyclopediaModal/Item/Favorites";

const Item = ({ identifier: creatureIdentifier }) => {
  const {
    identifier,
    name,
    description,
    descriptionImage,
    icon,
    featureVector,
  } = creatures.find(({ identifier }) => identifier === creatureIdentifier);

  const seenCount = useSelector(seenCountOf(identifier));
  const [year, month] = identifier.match(/\d+/g) || [];

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <img src={icon} />
        <div
          className={styles.info}
          data-name={name}
          data-seen-count={seenCount}
        >
          <div>
            {year && month && (
              <span>
                {year}年{month}月誕生。
              </span>
            )}
            {description}
          </div>
          <Favorites featureVector={featureVector} />
        </div>
      </div>
      {descriptionImage && (
        <img className={styles.descriptionImage} src={descriptionImage} />
      )}
    </div>
  );
};

export default Item;
