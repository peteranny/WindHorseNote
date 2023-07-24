import React, { useCallback } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import cn from "classnames";
import Modal from "..";
import styles from "./styles.css";
import { placeItem } from "../../../store/slots/actions";
import usePush from "../../../hooks/usePush";
import items from "../../../models/items";
import { atForItem } from "../../../store/slots/selectors";

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

  const placed = !!useSelector(atForItem(identifier));
  if (placed) return null;

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

const ItemInfoBlock = () => {
  const { identifier } = useParams();
  const { name, description, descriptionImage } = items.find(
    (item) => item.identifier === identifier
  );
  if (!description) {
    return null;
  }
  const [year, month] = identifier.match(/\d+/g) || [];
  return (
    <div
      className={styles.info}
      data-name={name}
      data-description={
        (year && month ? `${year}年${month}月誕生。` : "") + description
      }
    >
      {descriptionImage && <img src={descriptionImage} />}
    </div>
  );
};

const BackpackItemSlotModal = ({ className }) => {
  return (
    <Modal
      className={cn(styles.container, className)}
      path="/backpack/:identifier"
    >
      <ItemSlotSelection />
      <ItemInfoBlock />
    </Modal>
  );
};

export default BackpackItemSlotModal;
