import React, { Fragment } from "react";

const PlotSlide = ({ raw, revised }) => (
  <Fragment>
    {revised && <img src={revised} />}
    <img src={raw} />
  </Fragment>
);

export default PlotSlide;
