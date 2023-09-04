import { FC } from "react";
import { HouseProps } from "../lib/design-interface/house-type";
import { BackgroundImage, Text } from "@mantine/core";

const HouseUI: FC<HouseProps> = ({ img, location, name, price }) => {
  return (
    <div
      className="flex w-64 h-full flex-col bg-white p-2"
      style={{ borderRadius: 10 }}
    >
      <BackgroundImage
        src={img}
        radius="md"
        className="w-full h-3/4 flex flex-col justify-end items-end p-2"
      >
        <div>
          <Text className="flex bg-slate-300 text-sm rounded-lg p-1">
            {price}
          </Text>
        </div>
      </BackgroundImage>
      <div className="flex flex-col text-sm h-1/4 items-center justify-center bg">
        <p className="font-semibold text-xs">{name}</p>
        <p>{location}</p>
      </div>
    </div>
  );
};

export default HouseUI;
