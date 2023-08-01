import React from "react";
import { useSelector } from "react-redux";
import CornerButton from "..";
import encyclopedia from "./encyclopedia.png";
import { unreadEncyclopedia } from "../../../store/creatures/selectors";

const EncyclopediaButton = ({ onClick, ...props }) => {
  const unread = useSelector(unreadEncyclopedia);

  return (
    <CornerButton path="/encyclopedia" unread={unread} {...props}>
      <img src={encyclopedia} />
    </CornerButton>
  );
};

export default EncyclopediaButton;
