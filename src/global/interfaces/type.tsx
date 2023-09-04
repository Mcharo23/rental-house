export type ToggleButtonGroupProps = {
  onClick: (value: string) => void;
  name: string;
  selectedButton: string;
};

export type SearchBarprops = {
  onSearch: (value: string) => void;
};

export type InputTextProps = {
  onChange: (value: string) => void;
  name: string;
};

export type SelectProps = {
  label: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
};
