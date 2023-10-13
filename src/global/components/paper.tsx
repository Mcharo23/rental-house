import { Divider, Text } from "@mantine/core";
import { FC } from "react";
import { CustomMessageProps } from "../interfaces/type";

const CustomPaper: FC<CustomMessageProps> = ({ content, title }) => {
  return (
    <div className="border border-slate-200 hover:bg-stone-200 flex flex-row rounded-lg px-2 py-1">
      <Text className="text-stone-800 w-32 flex">{title}</Text>
      <Divider orientation="vertical" />
      <Text className="w-full flex items-center pl-3">{content}</Text>
    </div>
  );
};

export default CustomPaper;
