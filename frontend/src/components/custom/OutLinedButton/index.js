"use client";

import styles from "./styles.module.css";

const OutLinedButton = ({ name, onClick = () => {} }) => {
  return (
    <button
      className={`btn btn-outline-primary`}
      data={name}
      onClick={() => onClick()}
    >
      {name}
    </button>
  );
};

export default OutLinedButton;
