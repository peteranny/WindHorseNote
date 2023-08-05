import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useParams } from "react-router-dom";
import Modal from "..";
import Shelf from "./Shelf";
import Slide from "./Slide";
import slides from "./slides";
import usePush from "../../../hooks/usePush";
import Splash from "./Splash";

const fadingDuration = 1000;

const Content = () => {
  const index = parseInt(useParams().index);
  const [fadingOut, setFadingOut] = useState(false);
  const push = usePush();

  const slide = slides[index];
  const timer = useRef(null);
  const goNext = useCallback(() => {
    if (fadingOut || index >= slides.length - 1) return;

    setFadingOut(true);

    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setFadingOut(false);
      push(`../${index + 1}`);
    }, fadingDuration);
  }, [index, push, fadingOut]);

  useEffect(() => {
    if (!slide) push("/");
  }, [slide, push]);

  return (
    <Shelf
      fadingOut={fadingOut}
      fadingDuration={fadingDuration}
      onClick={goNext}
    >
      <Slide slide={slide} />
    </Shelf>
  );
};

const FinalModal = () => {
  return (
    <Fragment>
      <Splash path="/final" to="0" />
      <Modal path="/final/:index" closePath="/">
        <Content />
      </Modal>
    </Fragment>
  );
};

export default FinalModal;
