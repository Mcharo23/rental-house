import { FC } from "react";
import { BookedHouseQuery } from "../../../generated/graphql";
import CarouselScroll from "../../../global/components/rental-carousel";
import { Divider, Text } from "@mantine/core";
import CustomPanel from "../../../global/components/panel";
import { FiMapPin } from "react-icons/fi";
import { FaMoneyBill, FaFileContract } from "react-icons/fa";
import CustomButtons from "../../../global/components/custom-button";
import colors from "../../../lib/color/colors";

type PendingProps = {
  props: BookedHouseQuery["myHouse"][0];
};

const PendingHouse: FC<PendingProps> = ({ props }) => {
  return (
    <div className="flex full h-full flex-col w-full bg-white rounded-lg p-1">
      <div>
        <CarouselScroll
          imgUrl={props.imgUrl}
          visibleSlides={1}
          scrollStep={1}
        />
      </div>
      <div className="flex w-full h-auto flex-col mt-2 p-2 gap-2">
        <Text className="text-slate-800 text-lg">{props.name}</Text>
        <CustomPanel title={"Descripion"} content={props.Description} />
        <div className="relative w-full hover:bg-stone-200">
          <span className="absolute inset-y-0 flex items-center pl-2">
            <FiMapPin className="text-light-blue" />
          </span>
          <div className="h-full flex flex-row gap-2 rounded-lg p-2 pl-8 w-full cursor-pointer">
            <Text>{props.Region},</Text>
            <Text>{props.District},</Text>
            <Text>{props.Ward}</Text>
          </div>
        </div>
        <div className="flex w-full place-content-between gap-2">
          <div className="relative w-full hover:bg-stone-200 rounded-lg border border-slate-200">
            <span className="absolute inset-y-0 flex items-center pl-2 text-text-light-blue">
              <FaMoneyBill className="text-light-blue" />
            </span>
            <div className="h-full flex flex-row gap-2 rounded-lg p-2 pl-8 w-full cursor-pointer ">
              <Divider orientation="vertical" />
              <Text>Price {props.price}$</Text>
            </div>
          </div>
          <div className="relative w-full hover:bg-stone-200 rounded-lg border border-slate-200">
            <span className="absolute inset-y-0 flex items-center pl-2 text-text-light-blue">
              <FaFileContract className="text-light-blue" />
            </span>
            <div className="h-full flex flex-row gap-2 rounded-lg p-2 pl-8 w-full cursor-pointer ">
              <Divider orientation="vertical" />
              <Text>Total contracts {props.contract.length}</Text>
            </div>
          </div>
        </div>
        <Divider my="xs" label="Requesting Tenant" labelPosition="center" />
        <div className="justify-center items-center rounded-lg flex flex-row gap-5">
          <div className="w-full sm:w-72 md:w-60 lg:w-72 xl:w-96 2xl:w-96">
            <CustomButtons
              backgroundColor={colors.red}
              borderRadius={8}
              name={"Reject"}
              color={"white"}
              fontSize={14}
              border={"none"}
              paddingLeft={30}
              paddingRight={30}
              paddingTop={10}
              paddingBottom={10}
              onClick={() => {}}
            />
          </div>
          <div className="w-full sm:w-72 md:w-60 lg:w-72 xl:w-96 2xl:w-96">
            <CustomButtons
              backgroundColor={colors.Cyan}
              borderRadius={8}
              name={"Sign contract"}
              color={colors.darkGray}
              fontSize={14}
              border={"none"}
              paddingLeft={30}
              paddingRight={30}
              paddingTop={10}
              paddingBottom={10}
              onClick={() => {}}
            />
          </div>
        </div>
        <div className="justify-center items-center rounded-lg flex flex-row gap-5">
          <div className="w-full sm:w-72 md:w-60 lg:w-72 xl:w-96 2xl:w-96">
            <CustomButtons
              backgroundColor={colors.lightBlue}
              borderRadius={8}
              name={"Tenant in"}
              color={"white"}
              fontSize={14}
              border={"none"}
              paddingLeft={30}
              paddingRight={30}
              paddingTop={10}
              paddingBottom={10}
              onClick={() => {}}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PendingHouse;
