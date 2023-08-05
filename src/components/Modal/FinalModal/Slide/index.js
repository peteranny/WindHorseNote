import React from "react";
import PlotSlide from "./PlotSlide";
import DualSlide from "./DualSlide";

const Slide = ({ slide }) => {
  if (!slide) return null;

  const { raw, revised, wind, horse, epilogue } = slide;

  if (!epilogue) return <PlotSlide raw={raw} revised={revised} />;

  return <DualSlide raw={raw} wind={wind} horse={horse} epilogue={epilogue} />;
};

export default Slide;
