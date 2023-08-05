import React from "react";
import cn from "classnames";
import Modal from "..";
import styles from "./styles.css";

const ItemSlotSelection = () => {
  return (
    <table>
      <tbody>
        <tr>
          <td />
          <td />
        </tr>
        <tr>
          <td />
          <td />
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
