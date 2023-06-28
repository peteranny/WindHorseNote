import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { refreshInterval } from "../models/constants";

const useRefreshable = () => {
  const { pathname } = useLocation();
  const isRefreshable = pathname === "/";
  return isRefreshable;
};

const useVisible = () => {
  const [isVisible, setVisible] = useState(true);
  const handleVisibilityChange = useCallback(() => {
    setVisible(document.visibilityState === "visible");
  }, []);

  useEffect(() => {
    window.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      window.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [handleVisibilityChange]);
  return isVisible;
};

const useLoaded = () => {
  const [isLoaded, setLoaded] = useState(false);
  useEffect(() => setLoaded(true), []);
  return isLoaded;
};

const useRefresher = () => {
  const isLoaded = useLoaded();
  const isVisible = useVisible();
  const isRefreshable = useRefreshable();

  // Reload only for visible refreshable paths
  const reload = useCallback(() => {
    if (isVisible && isRefreshable) location.reload();
  }, [isRefreshable, isVisible]);

  // Try to reload periodically
  const timerRef = useRef(null);
  useEffect(() => {
    timerRef.current = setInterval(reload, refreshInterval);
    return () => clearInterval(timerRef.current);
  }, [reload]);

  // Try to reload after being visible (but not before loaded)
  useEffect(() => {
    if (isLoaded && isVisible) reload();
  }, [isVisible]); // eslint-disable-line react-hooks/exhaustive-deps
};

export default useRefresher;
