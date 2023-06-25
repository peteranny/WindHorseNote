import { useCallback } from "react";
import { useHistory } from "react-router-dom";

const usePush = () => {
  const history = useHistory();
  const push = useCallback(
    (path) => {
      history.push(path);
    },
    [history]
  );
  return push;
};

export default usePush;
