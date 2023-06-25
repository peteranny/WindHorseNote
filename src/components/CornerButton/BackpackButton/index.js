import React from "react";
import CornerButton from "..";
import backpack from "./backpack.png";

const BackpackButton = (props) => (
  <CornerButton path="/backpack" {...props}>
    <img src={backpack} />
  </CornerButton>
);
export default BackpackButton;
