import { useCallback, useEffect, useRef } from "react";

const useSafariHeightHack = (deps = []) => {
  const contentRef = useRef(null);

  const setVH = useCallback(() => {
    const vh = window.innerHeight / 100;
    if (contentRef.current) {
      contentRef.current.style.setProperty("--vh", `${vh}px`);
    }
  }, []);

  useEffect(() => {
    setVH();
    window.addEventListener("resize", setVH);
    return () => window.removeEventListener("resize", setVH);
  }, [setVH, ...deps]); // eslint-disable-line react-hooks/exhaustive-deps

  return contentRef;
};

export default useSafariHeightHack;
