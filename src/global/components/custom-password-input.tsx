import { Password } from "primereact/password";
import React, { FC, useState } from "react";
import { CustomPasswordInputProps } from "../interfaces/type";

const CustomPasswordInput: FC<CustomPasswordInputProps> = ({
  feedback,
  name,
  inputId,
  onChange,
}) => {
  const [value, setValue] = useState<string>("");

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    onChange(event.target.value);
  };

  return (
    <span className="p-float-label flex w-full text-xs">
      <Password
        inputId={inputId}
        value={value}
        onChange={handleOnChange}
        toggleMask
        feedback={feedback}
        className="h-5 flex w-full"
        inputStyle={{ width: "100%" }}
        style={{ fontSize: "14px" }}
        strongRegex="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+=!])(?=.{8,})"
        weakLabel="Too simple"
        mediumLabel="Average complexity"
        strongLabel="Complex password"
      />
      <label htmlFor={inputId}>{name}</label>
    </span>
  );
};

export default CustomPasswordInput;
