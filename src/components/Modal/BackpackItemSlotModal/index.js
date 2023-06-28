import React, { useCallback } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import cn from "classnames";
import Modal from "..";
import styles from "./styles.css";
import { placeItem } from "../../../store/slots/actions";
import usePush from "../../../hooks/usePush";

const ItemSlotSelection = () => {
  const { identifier } = useParams();
  const dispatch = useDispatch();
  const push = usePush();
  const select = useCallback(
    (at) => {
      dispatch(placeItem({ identifier, at }));
      push("/");
    },
    [dispatch, identifier, push]
  );
  return (
    <table>
      <tbody>
        <tr>
          <td onClick={() => select("upperLeft")} />
          <td onClick={() => select("upperRight")} />
        </tr>
        <tr>
          <td onClick={() => select("lowerLeft")} />
          <td onClick={() => select("lowerRight")} />
        </tr>
      </tbody>
    </table>
  );
};

const BackpackItemSlotModal = ({ className }) => {
  return (
    <Modal
      className={cn(styles.container, className)}
      path="/backpack/:identifier"
    >
      <ItemSlotSelection />
    </Modal>
  );
};

export default BackpackItemSlotModal;
