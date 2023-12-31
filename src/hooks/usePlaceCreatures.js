import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { prop, pipe, defaultTo, values, isEmpty, not, toPairs } from "ramda";
import creatures from "../models/creatures";
import items from "../models/items";
import { slots as slotsSelector } from "../store/slots/selectors";
import { placeCreatures } from "../store/slots/actions";
import { unreadBells } from "../store/notifications/actions";
import { unseenCreatureIdentifiers as unseenCreatureIdentifiersSelector } from "../store/creatures/selectors";
import { unreadCreatures } from "../store/creatures/actions";
import dotProduct from "../utils/dotProduct";

const propItemIdentifier = pipe(prop("itemIdentifier"), defaultTo(null));
const propCreatureIdentifier = pipe(
  prop("creatureIdentifier"),
  defaultTo(null)
);
const propNextUpdate = pipe(prop("nextUpdate"), defaultTo(null));

const nextUpdateReached = (slot) => {
  const nextUpdate = propNextUpdate(slot);
  return nextUpdate && Date.now() >= nextUpdate;
};

const findNextCreature = (item, slots, slotCreatures) => {
  const placedCreatureIdentifiers =
    values(slots).map(propCreatureIdentifier) + values(slotCreatures);

  const unplacedCreatures = creatures.filter(
    ({ identifier }) => placedCreatureIdentifiers.includes(identifier) === false
  );

  const scoredCreatures = unplacedCreatures.map((creature) => ({
    ...creature,
    // Calculate the score
    score: dotProduct(item.featureVector, creature.featureVector),
  }));

  const randomizedCreatures = scoredCreatures.sort(() => 0.5 - Math.random());

  const creature = randomizedCreatures.find(({ score }) => {
    // Throw a dice
    const dice = Math.random();
    return dice < score;
  });

  return creature;
};

const createSlotCreatures = (slots) => {
  const slotCreatures = {};

  // Place creatures if needed
  const positions = ["upperLeft", "upperRight", "lowerLeft", "lowerRight"].sort(
    () => 0.5 - Math.random()
  );

  for (const at of positions) {
    const slot = slots[at] || {};

    if (nextUpdateReached(slot) === false) {
      // Skip if not yet allowed to update
      continue;
    }

    if (propItemIdentifier(slot) === null) {
      // Skip if no item
      continue;
    }

    if (propCreatureIdentifier(slot) !== null) {
      // Remove the placed creature
      slotCreatures[at] = null;
      continue;
    }

    // Find target creature to place
    const item = items.find(
      (item) => item.identifier === propItemIdentifier(slot)
    );

    if (!item) continue;

    const creature = findNextCreature(item, slots, slotCreatures);
    if (creature) {
      // Place it
      slotCreatures[at] = creature.identifier;
    }
  }

  return slotCreatures;
};

const findRemovedSlots = (slots, slotCreatures) => {
  const pairs = toPairs(slotCreatures);
  const removedPairs = pairs.filter(
    ([, creatureIdentifier]) => creatureIdentifier === null
  );
  const removedSlots = removedPairs.map(([at]) => {
    return { ...slots[at], at };
  });
  return removedSlots;
};

const isNotEmpty = pipe(isEmpty, not);

const generateRandomRewards = (ref) => {
  const x = Math.random();
  const y = Math.pow(x - 1, 2); // Random at a ease-in curve
  const base = ref === 0 ? 3 : Math.log10(ref) * 10;
  return Math.ceil(y * base);
};

const usePlaceCreatures = () => {
  const unseenCreatureIdentifiers = useSelector(
    unseenCreatureIdentifiersSelector
  );

  // Copy the slots
  const slots = { ...useSelector(slotsSelector) };
  const dispatch = useDispatch();

  // Set the slot creatures just for once
  useEffect(() => {
    // Place creatures
    const slotCreatures = createSlotCreatures(slots);

    if (isNotEmpty(slotCreatures)) {
      dispatch(placeCreatures(slotCreatures));
    }

    // Post unread bells from removed creatures
    const removedSlots = findRemovedSlots(slots, slotCreatures);
    for (const { creatureIdentifier, itemIdentifier } of removedSlots) {
      const bells = items.find(
        ({ identifier }) => identifier === itemIdentifier
      ).bells;
      dispatch(
        unreadBells({
          creatureIdentifier,
          itemIdentifier,
          bells: generateRandomRewards(bells),
        })
      );
    }

    // Post unread state for placed creatures that was unseen
    const unreadIdentifiers = values(slotCreatures).filter((identifier) =>
      unseenCreatureIdentifiers.includes(identifier)
    );
    dispatch(unreadCreatures(unreadIdentifiers));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
};

export default usePlaceCreatures;
