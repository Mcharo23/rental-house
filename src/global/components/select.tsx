import { FC, useState } from "react";
import { SelectOptions, SelectProps } from "../interfaces/type";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";

const SelectsComponent: FC<SelectProps> = ({
  label,
  inputId,
  options,
  onChange,
}) => {
  const [selectedValue, setSelectedValue] = useState<SelectOptions | null>(
    null
  );

  const handleOnSelectedValue = (e: DropdownChangeEvent) => {
    setSelectedValue(e.value);
    onChange(e.value);
  };

  return (
    <div className="card flex justify-content-center w-full text-xs">
      <span className="p-float-label flex w-full">
        <Dropdown
          inputId={inputId}
          value={selectedValue}
          onChange={handleOnSelectedValue}
          options={options}
          optionLabel="name"
          className="w-full h-9 flex"
          style={{ fontSize: "14px" }}
        />
        <label htmlFor={inputId}>{label}</label>
      </span>
    </div>
  );
};

export default SelectsComponent;
