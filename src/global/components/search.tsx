import { CloseButton, Input } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { ChangeEvent, FC, useState } from "react";

type Props = {
  placeholder: string;
  onChange: (value: string) => void;
};

type SearchProps = {
  props: Props;
};

const Search: FC<SearchProps> = ({ props }) => {
  const [value, setValue] = useState<string>("");

  const handleOnChange = (value: ChangeEvent<HTMLInputElement>) => {
    setValue(value.currentTarget.value);
    props.onChange(value.currentTarget.value);
  };
  return (
    <Input
      value={value}
      placeholder={props.placeholder}
      leftSection={<IconSearch size={16} />}
      rightSection={
        <CloseButton
          aria-label="Clear input"
          onClick={() => {
            setValue("");
            props.onChange("");
          }}
          style={{ display: value ? undefined : "none" }}
        />
      }
      rightSectionPointerEvents="all"
      onChange={handleOnChange}
    />
  );
};

export default Search;
