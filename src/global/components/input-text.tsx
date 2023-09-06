import { InputText } from "primereact/inputtext";
import { FC, useState } from "react";
import { CustomInputTextProps } from "../interfaces/type";

const CustomInputField: FC<CustomInputTextProps> = ({ id, name, onChange }) => {
  const [value, setValue] = useState<string>("");

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    onChange(event.target.value);
  };

  return (
    <div className="card flex justify-content-center">
      <span className="p-float-label flex w-full text-xs">
        <InputText
          id={id}
          value={value}
          onChange={handleOnChange}
          className="flex h-8 w-full"
          style={{ fontSize: "14px" }}
        />
        <label htmlFor={id}>{name}</label>
      </span>
    </div>
  );
};

export default CustomInputField;
