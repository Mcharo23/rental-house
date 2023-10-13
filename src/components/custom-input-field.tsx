import React, { FC, useState } from "react";
import { CustomInputFieldProps } from "../lib/types";

const CustomInputField: FC<CustomInputFieldProps> = ({
  backgroundColor,
  border,
  borderRadius,
  fontSize,
  onChange,
  padding,
  placeholder,
  type,
  width,
}) => {
  const [value, setValue] = useState<string>("");
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    onChange(event.target.value);
  };
  return (
    <input
      type={type}
      value={value}
      style={{
        backgroundColor: backgroundColor,
        border: border,
        borderRadius: borderRadius,
        fontSize: fontSize,
        padding: padding,
        width: width,
      }}
      placeholder={placeholder}
      onChange={handleInputChange}
    />
  );
};

export default CustomInputField;
