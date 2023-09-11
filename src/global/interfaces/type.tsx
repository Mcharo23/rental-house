import { GetHousesQuery, GetMyHouseQuery } from "../../generated/graphql";

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
  value: string;
  disabled: boolean;
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
  disabled: boolean;
  value: string;
  onChange: (value: string) => void;
};

export type MyHouseInfoUpdatedProps = {
  _id: string;
  name: string;
  region: string;
  district: string;
  ward: string;
  price: string;
  status: string;
  description: string;
};

export type MyHouseInfoProps = {
  onClickBack: (value: boolean) => void;
  onChange: (value: MyHouseInfoUpdatedProps) => void;
  house: GetMyHouseQuery["myHouse"][0];
};

export type HouseUiProps = {
  onClick: (value: GetMyHouseQuery["myHouse"][0], visible: boolean) => void;
};

export type AllHousesUIProps = {
  onClick: (value: GetHousesQuery["houses"][0], visible: boolean) => void;
};

export type CustomMessageProps = {
  title: string;
  content: string;
};

export type OthersHouseInfoProps = {
  onClickBack: (value: boolean) => void;
  onChange: (value: MyHouseInfoUpdatedProps) => void;
  house: GetHousesQuery["houses"][0];
};
