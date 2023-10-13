import { InputText } from "primereact/inputtext";
import { FC, useState } from "react";
import { CustomInputTextProps } from "../interfaces/type";

const CustomInputField: FC<CustomInputTextProps> = ({
  id,
  name,
  value,
  disabled,
  onChange,
}) => {
  const [text, setText] = useState<string>(value);
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
    onChange(event.target.value);
  };

  return (
    <div className="card flex justify-content-center">
      <span className="p-float-label flex w-full text-xs">
        <InputText
          id={id}
          value={value === "" ? text : value}
          onChange={handleOnChange}
          className="flex h-8 w-full"
          style={{ fontSize: "14px" }}
          disabled={disabled}
        />
        <label htmlFor={id}>{name}</label>
      </span>
    </div>
  );
};

export default CustomInputField;
