import {
  InputNumber,
  InputNumberValueChangeEvent,
} from "primereact/inputnumber";
import { FC, useState } from "react";
import { CustomInputNumberProps } from "../interfaces/type";

const CustomInputNumber: FC<CustomInputNumberProps> = ({
  disabled,
  id,
  name,
  onChange,
}) => {
  const [value, setValue] = useState<number | null | undefined>();

  const handleOnChange = (event: InputNumberValueChangeEvent) => {
    onChange(event.value);
    setValue(event.value);
  };

  return (
    <div className="card flex justify-content-center">
      <span className="p-float-label flex w-full text-xs">
        <InputNumber
          id={id}
          value={value}
          className="flex h-8 w-full"
          style={{ fontSize: "14px" }}
          onValueChange={handleOnChange}
          disabled={disabled}
        />
        <label htmlFor={id}>{name}</label>
      </span>
    </div>
  );
};

export default CustomInputNumber;
