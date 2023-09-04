import { Select } from "@mantine/core";
import { FC, useState } from "react";
import { SelectProps } from "../interfaces/type";

const SelectsComponent: FC<SelectProps> = ({ label, onChange, options }) => {
  const [selectedValue, setSelectedValue] = useState("");

  const handleValueChange = (newValue: string) => {
    setSelectedValue(newValue);
    onChange(newValue);
  };
  return (
    <div className="relative w-full bg-light-blue">
      <Select
        id={label}
        data={options}
        onChange={handleValueChange}
        className="w-full px-4 py-2 rounded-md transition-all duration-300 focus:ring focus:ring-blue-300"
      />
      <label
        htmlFor={label}
        className={`absolute left-4 transition-all duration-300 ${
          selectedValue
            ? "text-gray-700 text-xs top-2"
            : "text-sm top-1/2 transform -translate-y-1/2"
        }`}
      >
        {label}
      </label>
    </div>
  );
};

export default SelectsComponent;
