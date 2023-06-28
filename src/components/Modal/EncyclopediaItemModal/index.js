import React, { useEffect } from "react";
import { useParams, useRouteMatch } from "react-router";
import { useDispatch } from "react-redux";
import Modal from "..";
import Item from "./Item";
import Shelf from "../EncyclopediaModal/Shelf";
import { readCreature } from "../../../store/creatures/actions";

const Content = ({ path }) => {
  const { identifier } = useParams();
  const { path: current } = useRouteMatch();
  const open = current === path;
  const dispatch = useDispatch();
  useEffect(() => {
    if (open) {
      dispatch(readCreature(identifier));
    }
  }, [open, identifier, dispatch]);

  return (
    <Shelf>
      <Item identifier={identifier} />
    </Shelf>
  );
};

const EncyclopediaItemModal = () => {
  const path = "/encyclopedia/:identifier";
  return (
    <Modal path={path}>
      <Content path={path} />
    </Modal>
  );
};

export default EncyclopediaItemModal;
