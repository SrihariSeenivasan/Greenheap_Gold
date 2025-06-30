
import React from "react";
import styles from "./styles.module.css";

interface CustomButtonProps {
  title: React.ReactNode;
  onClick?: () => void;
  className?: string;
  icon?: React.ReactNode;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onClick = () => {},
  className = "",
  icon = null,
}) => {
  return (
    <button
      className={`${styles.custom_btn} ${className}`}
      data-title={typeof title === "string" ? title : undefined}
      onClick={onClick}
    >
      {icon}
      {title}
    </button>
  );
};

export default CustomButton;
