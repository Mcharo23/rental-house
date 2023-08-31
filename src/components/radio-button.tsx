import { FC } from "react";
import { RadioButtonProps } from "../lib/design-interface/radio-button-props";

const RadioButton: FC<RadioButtonProps> = ({
  label,
  value,
  checked,
  onChange,
}) => {
  const handleOnGenderChange = (value: React.ChangeEvent<HTMLInputElement>) => {
    onChange(value.target.value);
  };

  return (
    <label htmlFor="radio-button" style={{ color: "white" }}>
      <input
        type="radio"
        value={value}
        checked={checked}
        onChange={handleOnGenderChange}
      />
      {label}
    </label>
  );
};

export default RadioButton;
