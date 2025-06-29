"use client";

import React from "react";

interface OutLinedButtonProps {
  name: React.ReactNode;
  onClick?: () => void;
}

const OutLinedButton: React.FC<OutLinedButtonProps> = ({
  name,
  onClick = () => {},
}) => {
  return (
    <button
      className="btn btn-outline-primary"
      data-name={typeof name === "string" ? name : undefined}
      onClick={onClick}
    >
      {name}
    </button>
  );
};

export default OutLinedButton;
