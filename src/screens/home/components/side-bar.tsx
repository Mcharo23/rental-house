import { Text } from "@mantine/core";
import { FC, useState } from "react";
import {
  FiArrowUpCircle,
  FiChevronRight,
  FiMoreHorizontal,
} from "react-icons/fi";
import { MessagesProps } from "../interface/type";
import { MESSAGES } from "../../../message";
import MessagesUI from "../../../global/components/messageUI";
import { FaLightbulb } from "react-icons/fa";

const Sidebar: FC = () => {
  const [messages] = useState<MessagesProps[]>(MESSAGES);

  const renderMessages = () => {
    return (
      <ul className="flex flex-col gap-2 w-full h-full">
        {messages.length === 0 ? (
          <p>No messages</p>
        ) : (
          messages.map((message, index) => (
            <li key={index}>
              <MessagesUI {...message} />
            </li>
          ))
        )}
      </ul>
    );
  };

  return (
    <div className="w-full h-full flex gap-2 flex-col place-content-between">
      <div className="flex overflow-hidden flex-col w-full h-[75%] sm:gap-5 2xl:gap-2 md:gap-2 lg:gap-2 xl:gap-2">
        <div className="flex relative w-full h-auto flex-row place-content-between font-semibold text-gray-800 text-2xl 2xl:text-base md:text-base xl:text-base">
          <Text className="">Your Balance</Text>
          <span className="inset-y-0 flex items-center">
            <FiMoreHorizontal />
          </span>
        </div>
        <div className="border border-slate-200 rounded-lg w-full h-auto flex flex-col text-slate-500 p-2 gap-5 2xl:gap-2 2xl:text-sm md:gap-2 lg:gap-2 xl:gap-2">
          Payment ID: j45GH686
          <Text className="font-semibold text-gray-800 text-2xl 2xl:text-lg md:text-lg lg:text-lg xl:text-lg">
            $615245.287
          </Text>
          <div className="flex flex-row relative w-full">
            <span className="absolute inset-y-0 flex items-center">
              <FiArrowUpCircle className="text-green-600" />
            </span>
            <Text className="pl-5 w-full">+12.5% than last week</Text>
          </div>
        </div>
        <div className="bg-violet-100 p-4 w-full h-auto rounded-lg flex justify-center items-center text-light-blue text-lg 2xl:p-2 md:p-2 lg:p-2 xl:p-2">
          Top up balance
        </div>
        <div className="flex flex-col h-auto gap-1 2xl:text-sm md:text-sm lg:text-sm xl:text-sm">
          <div className="flex relative w-full flex-row place-content-between font-semibold text-gray-800 text-2xl 2xl:text-base md:text-base lg:text-base xl:text-base">
            <Text className="">Recent Messages</Text>
            <span className="inset-y-0 flex items-center">
              <FiMoreHorizontal />
            </span>
          </div>
          <div className="w-full flex-col h-[95%] flex overflow-auto">
            {renderMessages()}
          </div>
        </div>
      </div>
      <div className="bg-light-blue text-white h-auto rounded-lg p-5 gap-3 flex flex-col w-full  2xl:gap-1 md:gap-1 lg:gap-1 xl:gap-1">
        <div className="bg-white flex w-8 h-8 justify-center items-center  rounded-full">
          <FaLightbulb className="text-light-blue justify-center items-center rounded-full  text-2xl 2xl:text-lg md:text-lg lg:text-lg xl:text-lg" />
        </div>
        <Text className="  font-semibold text-xl 2xl:text-sm md:text-sm lg:text-sm xl:text-sm">
          Search and find your favourite real eastate
        </Text>
        <Text className="text-white-smoke font-serif 2xl:text-sm md:text-sm lg:text-sm xl:text-sm">
          Search by category you like and find best place with us
        </Text>
        <div
          className="flex flex-row gap-3 2xl:text-sm md:text-sm lg:text-sm xl:text-sm
        "
        >
          <Text className="text-black">Learn More</Text>
          <Text
            onClick={() => {
              alert("Coming soon");
            }}
          >
            <FiChevronRight className="text-2xl 2xl:text-lg md:text-lg lg:text-lg xl:text-lg" />
          </Text>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
