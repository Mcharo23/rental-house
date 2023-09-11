import { FC } from "react";
import { CustomButtonProps } from "../../lib/design-interface/button-type";

const CustomButtons: FC<CustomButtonProps> = ({
  backgroundColor,
  borderRadius,
  color,
  name,
  border,
  paddingRight,
  paddingLeft,
  onClick,
  fontSize,
  paddingBottom,
  paddingTop,
}) => {
  return (
    <button
      style={{
        backgroundColor: backgroundColor,
        borderRadius: borderRadius,
        color: color,
        paddingTop: paddingTop,
        paddingBottom: paddingBottom,
        fontSize: fontSize,
        border: border,
        paddingLeft: paddingLeft,
        paddingRight: paddingRight,
        width: "100%",
      }}
      onClick={onClick}
    >
      {name}
    </button>
  );
};

export default CustomButtons;
