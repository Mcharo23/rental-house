import React from "react";
import { NativeSelect, rem } from "@mantine/core";

type SelectComponentProps = {
  data: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  width?: number;
  marginRight?: number;
};

const SelectComponent: React.FC<SelectComponentProps> = ({
  data,
  value,
  onChange,
  width = 92,
  marginRight = -2,
}) => {
  return (
    <NativeSelect
      data={data}
      rightSectionWidth={28}
      value={value}
      onChange={(e) => onChange(e.currentTarget.value)}
      styles={{
        input: {
          fontWeight: 500,
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
          width: rem(width),
          marginRight: rem(marginRight),
        },
      }}
      required
    />
  );
};

export default SelectComponent;
