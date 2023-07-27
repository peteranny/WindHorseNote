import React, { useMemo } from "react";
import { useStore } from "react-redux";
import {
  prop,
  reverse,
  sortBy,
  take,
  compose,
  filter,
  propSatisfies,
} from "ramda";
import cn from "classnames";
import items from "../../../../../models/items";
import dotProduct from "../../../../../utils/dotProduct";
import { boughtItem } from "../../../../../store/backpack/selectors";
import styles from "./styles.css";
import resolveSuffixIcon from "../../../../../utils/resolveSuffixIcon";

const useBoughtIdentifiers = () => {
  const { getState } = useStore();
  const state = getState();
  const boughtIdentifiers = useMemo(
    () =>
      items
        .filter(({ identifier }) => boughtItem(identifier)(state))
        .map(({ identifier }) => identifier),
    [state]
  );
  return boughtIdentifiers;
};

const useFavoriteItems = ({ featureVector, n }) => {
  const boughtIdentifiers = useBoughtIdentifiers();
  const scoredItems = useMemo(
    () =>
      items.map((item) => ({
        ...item,
        bought: boughtIdentifiers.includes(item.identifier),
        score: dotProduct(item.featureVector, featureVector),
      })),
    [boughtIdentifiers, featureVector]
  );
  const sortedItems = useMemo(
    () =>
      compose(
        reverse,
        filter(propSatisfies((val) => val > 0, "score")),
        sortBy(prop("score"))
      )(scoredItems),
    [scoredItems]
  );
  const favoriteItems = useMemo(() => take(n, sortedItems), [n, sortedItems]);
  return favoriteItems;
};

const Favorites = ({ featureVector }) => {
  const favoriteItems = useFavoriteItems({ featureVector, n: 4 });

  return (
    <div className={styles.favorites}>
      {favoriteItems.map(({ identifier, icon, bought, score }) => (
        <div
          key={identifier}
          className={cn(styles.favorite, { [styles.unbought]: !bought })}
        >
          <img src={resolveSuffixIcon("wind")(icon)} title={score} />
        </div>
      ))}
    </div>
  );
};

export default Favorites;
