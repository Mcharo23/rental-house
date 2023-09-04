import React, { FC, useState } from "react";
import { InputTextProps } from "../interfaces/type";
import { Textarea } from "@mantine/core";

const TextArea: FC<InputTextProps> = ({ name, onChange }) => {
  const [value, setValue] = useState<string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
    onChange(event.target.value);
  };

  return (
    <div className="relative">
      <Textarea
        autosize
        minRows={2}
        className="w-full font-serif text-2xl px-4 pt-2 rounded-md transition-all duration-300 focus:ring focus:ring-blue-300"
        onChange={handleInputChange}
      />
      <label
        htmlFor="username"
        className={`absolute left-4 transition-all duration-300 ${
          value
            ? "text-gray-700 text-xs top-2"
            : "text-sm top-1/2 transform -translate-y-1/2"
        }`}
      >
        {name}
      </label>
    </div>
  );
};

export default TextArea;
