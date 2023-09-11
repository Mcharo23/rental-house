import React, { FC } from "react";
import { InputTextProps } from "../interfaces/type";
import { InputTextarea } from "primereact/inputtextarea";

const TextArea: FC<InputTextProps> = ({ id,value, name, disabled, onChange }) => {

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className="card flex justify-content-center">
      <span className="p-float-label flex w-full text-xs">
        <InputTextarea
          id={id}
          value={value}
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
