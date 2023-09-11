import { InputText } from "primereact/inputtext";
import { FC } from "react";
import { CustomInputTextProps } from "../interfaces/type";

const CustomInputField: FC<CustomInputTextProps> = ({
  id,
  name,
  value,
  disabled,
  onChange,
}) => {
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
          disabled={disabled}
        />
        <label htmlFor={id}>{name}</label>
      </span>
    </div>
  );
};

export default CustomInputField;
