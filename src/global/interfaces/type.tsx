export type ToggleButtonGroupProps = {
  onClick: (value: string) => void;
  name: string;
  selectedButton: string;
};

export type SearchBarprops = {
  onSearch: (value: string) => void;
};

export type CustomInputTextProps = {
  onChange: (value: string) => void;
  name: string;
  id: string;
};

export type SelectProps = {
  label: string;
  options: { name: string; value: string }[];
  inputId: string;
  onChange: (value: string) => void;
};

export type SelectOptions = {
  name: string;
  value: string;
};

export type CustomPasswordInputProps = {
  name: string;
  feedback: boolean;
  inputId: string;
  onChange: (value: string) => void;
};

export type NotificationsProps = {
  title: string;
  message: string[];
};

export interface LoadAndHideNotificationProps {
  id: string;
  title: string;
  message: string;
}

export type CustomizedNotificationProps = {
  title: string;
  message: string;
};

export type InputTextProps = {
  id: string;
  name: string;
  onChange: (value: string) => void;
};
