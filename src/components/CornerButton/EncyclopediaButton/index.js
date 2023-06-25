import React from "react";
import CornerButton from "..";
import encyclopedia from "./encyclopedia.png";

const EncyclopediaButton = ({ ...props }) => {
  return (
    <CornerButton {...props}>
      <img src={encyclopedia} />
    </CornerButton>
  );
};

export default EncyclopediaButton;
