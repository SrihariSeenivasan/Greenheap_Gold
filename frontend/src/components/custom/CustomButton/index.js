"use client";
import styles from "./styles.module.css";

const CustomButton = ({
  title,
  onClick = () => {},
  className = "",
  icon = null,
}) => {
  return (
    <button
      className={`${styles.custom_btn} ${className}`}
      data={title}
      onClick={() => {
        onClick();
      }}
    >
      {icon}
      {title}
    </button>
  );
};

export default CustomButton;
