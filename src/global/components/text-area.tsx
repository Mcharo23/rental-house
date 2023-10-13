import React, { FC, useState } from "react";
import { InputTextProps } from "../interfaces/type";
import { InputTextarea } from "primereact/inputtextarea";

const TextArea: FC<InputTextProps> = ({
  id,
  value,
  name,
  disabled,
  onChange,
}) => {
  const [text, setText] = useState<string>("");
  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
    onChange(event.target.value);
  };

  return (
    <div className="card flex justify-content-center">
      <span className="p-float-label flex w-full text-xs">
        <InputTextarea
          id={id}
          value={value === "" ? text : value}
          onChange={handleInputChange}
          rows={5}
          cols={30}
          disabled={disabled}
          className="flex w-full"
          style={{ fontSize: "14px" }}
        />
        <label htmlFor={name}>{name}</label>
      </span>
    </div>
  );
};

export default TextArea;
