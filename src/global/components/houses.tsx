import { FC } from "react";
import { BackgroundImage, Text } from "@mantine/core";
import { GetHousesQuery } from "../../generated/graphql";

const AllHousesUI: FC<GetHousesQuery["houses"][0]> = ({
  District,
  Region,
  Ward,
  _id,
  imgUrl,
  name,
  price,
  status,
  user,
}) => {
  return (
    <div
      className="flex w-64 h-full flex-col bg-white p-2"
      style={{ borderRadius: 10 }}
    >
      <BackgroundImage
        src={imgUrl[0]}
        radius="md"
        className="w-full h-3/4 flex flex-col justify-end items-end p-2"
      >
        <div className="h-full place-content-between flex flex-col">
          <Text className="flex bg-slate-100 text-sm rounded-lg p-1">
            {status}
          </Text>
          <Text className="flex bg-slate-300 text-sm rounded-lg p-1">
            {price}
          </Text>
        </div>
      </BackgroundImage>
      <div className="flex flex-col text-sm h-1/4 items-center justify-center bg">
        <p className="font-semibold text-xs">{name}</p>
        <p>{`${Region}, ${District}`}</p>
      </div>
    </div>
  );
};

export default AllHousesUI;
