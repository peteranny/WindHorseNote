import { useEffect } from "react";
import { useSelector } from "react-redux";
import { eligibleForFinal } from "../store/bellCount/selectors";
import usePush from "./usePush";
import usePrevious from "./usePrevious";

const useFinalPresenter = () => {
  // Present final on startup
  const meetsFinalCondition = useSelector(eligibleForFinal);
  const push = usePush();
  useEffect(() => {
    if (meetsFinalCondition) push("/final");
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Present final on change
  const prevMeetsFinalCondition = usePrevious(meetsFinalCondition);
  useEffect(() => {
    if (
      prevMeetsFinalCondition !== null &&
      meetsFinalCondition !== prevMeetsFinalCondition
    ) {
      push("/final");
    }
  }, [meetsFinalCondition, prevMeetsFinalCondition, push]);
};

export default useFinalPresenter;
