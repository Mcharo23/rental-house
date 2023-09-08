import React, { FC, useState } from "react";
import { InputTextProps } from "../interfaces/type";
import { InputTextarea } from "primereact/inputtextarea";

const TextArea: FC<InputTextProps> = ({ id, name, onChange }) => {
  const [value, setValue] = useState<string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
    onChange(event.target.value);
  };

  return (
    <div className="card flex justify-content-center">
      <span className="p-float-label">
        <InputTextarea
          id={id}
          value={value}
          onChange={handleInputChange}
          rows={5}
          cols={30}
        />
        <label htmlFor={name}>{name}</label>
      </span>
    </div>
  );
};

export default TextArea;
