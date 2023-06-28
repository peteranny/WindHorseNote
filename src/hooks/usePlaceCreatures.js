import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { prop, pipe, defaultTo, isEmpty, not } from "ramda";
import creatures from "../models/creatures";
import { slots as slotsSelector } from "../store/slots/selectors";
import { placeCreatures } from "../store/slots/actions";

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

const findNextCreature = () => {
  return creatures[0] || null;
};

const createSlotCreatures = (slots) => {
  const slotCreatures = {};

  // Place creatures if needed
  const positions = ["upperLeft", "upperRight", "lowerLeft", "lowerRight"];
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

    const creature = findNextCreature();
    if (creature) {
      // Place it
      slotCreatures[at] = creature.identifier;
    }
  }

  return slotCreatures;
};

const isNotEmpty = pipe(isEmpty, not);

const usePlaceCreatures = () => {
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
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
};

export default usePlaceCreatures;
