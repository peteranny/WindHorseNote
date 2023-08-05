import { useCallback } from "react";
import { useHistory, useLocation } from "react-router-dom";

const sanitize = (path, current) => {
  if (/^\//.test(path)) {
    // Absolute path
    return path;
  } else if (/^\.\./.test(path)) {
    // Relative backward
    return path.replace(
      /^\.\./,
      current.substring(0, current.lastIndexOf("/"))
    );
  } else {
    // Relative forward
    return `${current}/${path}`;
  }
};

const usePush = () => {
  const location = useLocation();
  const history = useHistory();
  const push = useCallback(
    (path) => {
      path = sanitize(path, location.pathname);
      history.push(path);
    },
    [history, location.pathname]
  );
  return push;
};

export default usePush;
