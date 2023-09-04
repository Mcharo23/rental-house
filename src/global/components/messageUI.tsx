import { FC } from "react";
import { MessagesProps } from "../../screens/home/interface/type";
import { FaUser } from "react-icons/fa";
import { Divider, Text } from "@mantine/core";

const MessagesUI: FC<MessagesProps> = ({ name, message }) => {
  return (
    <div className="flex flex-col w-full">
      <div className="flex-row gap-3 pb-2 flex">
        <span>
          <FaUser className="bg-light-blue text-white-smoke rounded-full text-2xl p-1" />
        </span>
        <div className="flex flex-col w-full">
          <Text className="flex text-light-blue font-sans">{name}</Text>
          <Text className="font-serif overflow-hidden overflow-ellipsis line-clamp-3">
            {message}
          </Text>
        </div>
      </div>
      <Divider />
    </div>
  );
};

export default MessagesUI;
