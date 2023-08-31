import { FC } from "react";
import { Custominputprops } from "../lib/design-interface/custom-input-props";

const Custominput: FC<Custominputprops> = ({
  labeled,
  inputType,
  placeholder,
}) => {
  return (
    <>
      <span
        style={{
          marginLeft: "5%",
          marginTop: "5%",
          color: "#808080",
          fontWeight: "bold",
        }}
      >
        {labeled}
      </span>
      <input
        style={{
          backgroundColor: "whitesmoke",
          width: "90%",
          marginLeft: "5%",
          padding: "2%",
          borderRadius: "20px",
        }}
        placeholder={placeholder}
        type={inputType}
      />
    </>
  );
};

export default Custominput;
