import React, { FC } from "react";
import { ToggleButtonGroupProps } from "../interfaces/type";

const ToggleButtonGroup: FC<ToggleButtonGroupProps> = ({
  onClick,
  selectedButton,
  name,
}) => {
  const handleButtononClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const value = event.currentTarget.textContent;
    onClick(value !== null ? value : "default");
  };
  return (
    <button
      onClick={handleButtononClick}
      className={selectedButton === `${name}` ? "bg-light-blue w-1/2 h-full rounded-lg p-1 text-white" : "bg-white p-1 text-slate-700 w-1/2"}
    >
      {name}
    </button>
  );
};

export default ToggleButtonGroup;
