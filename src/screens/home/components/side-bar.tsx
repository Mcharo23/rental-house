import { Indicator, Text } from "@mantine/core";
import { FC, useEffect, useState } from "react";
import { FiChevronRight, FiMoreHorizontal } from "react-icons/fi";
import MessagesUI from "../../../global/components/messageUI";
import { FaLightbulb } from "react-icons/fa";
import {
  clearUserData,
  getUserAccessToken,
  getUserData,
} from "../../../utils/localStorageUtils";
import { BookedHouseQuery } from "../../../generated/graphql";
import { differenceInDays } from "date-fns";
import useFetchBookedHouses from "../../Rental/components/fetchBookedHouses";
import { AccountType } from "../../../lib/enums/gender";

type SidebarProps = {
  onClick: (value: string) => void;
};

const Sidebar: FC<SidebarProps> = ({ onClick }) => {
  const user = getUserData();
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [pendingHouse, setPendingHouse] = useState<
    BookedHouseQuery["myHouse"][0][]
  >([]);
  const [houseWithExpiredContracts, setHouseWithExpiredContracts] = useState<
    BookedHouseQuery["myHouse"][0][]
  >([]);

  useEffect(() => {
    const token = getUserAccessToken();

    if (token) {
      setAccessToken(token);
    }
  }, []);

  const { error, data } = useFetchBookedHouses(accessToken ?? "");

  useEffect(() => {
    const today = new Date();

    if (data) {
      const housesWithPendingStatus = data.myHouse.filter(
        (house: BookedHouseQuery["myHouse"][0]) =>
          house.status === "Pending" &&
          house.contract.find((contract) => contract.isCurrent === true)
      );

      const filtered = data.myHouse.filter(
        (house: BookedHouseQuery["myHouse"][0]) =>
          house.status === "Booked" &&
          house.contract.find((contract) => {
            if (contract.End_of_contract) {
              const endOfContract = new Date(contract.End_of_contract);
              const daysDifference = differenceInDays(endOfContract, today);
              return daysDifference < 1;
            }
            return false;
          }) &&
          house.contract.find((contract) => contract.isCurrent === true)
      );

      setPendingHouse(housesWithPendingStatus);
      setHouseWithExpiredContracts(filtered);
    }
  }, [data]);

  if (error) {
    //@ts-ignore
    if (error.response.errors[0].message === "Unauthorized") {
      clearUserData();
    }
  }

  const renderpendingHouses = () => {
    const lastThreeHouses = pendingHouse.slice(-3);
    return (
      <ul className="flex flex-col gap-2 w-full h-full">
        {pendingHouse.length === 0 ? (
          <p>No new pending house</p>
        ) : (
          lastThreeHouses.map((house, index) => (
            <li key={index}>
              <MessagesUI props={{ ...house }} />
            </li>
          ))
        )}
      </ul>
    );
  };

  const renderTimeOutContracts = () => {
    const lastThreeHouses = houseWithExpiredContracts.slice(-3);
    return (
      <ul className="flex flex-col gap-2 w-full h-full">
        {houseWithExpiredContracts.length === 0 ? (
          <p>All up to date</p>
        ) : (
          lastThreeHouses.map((house, index) => (
            <li key={index}>
              <MessagesUI props={{ ...house }} />
            </li>
          ))
        )}
      </ul>
    );
  };

  return (
    <div className="w-full h-full flex gap-2 flex-col place-content-between">
      <div className="flex overflow-hidden flex-col w-full h-full sm:gap-5 2xl:gap-2 md:gap-2 lg:gap-2 xl:gap-2">
        <div className="flex flex-col">
          <div className="flex w-full h-auto flex-row place-content-between font-semibold text-gray-800 text-2xl 2xl:text-base md:text-base xl:text-base">
            <div className="flex relative">
              <Text className="mr-2">
                Pending Houses-({pendingHouse.length})
              </Text>
              <Indicator
                className={`absolute p-1 top-2 rounded-lg right-0 items-center justify-center flex animate-pulse ${
                  pendingHouse.length === 0 ? "" : "hidden"
                }`}
                processing
                color="indigo"
                withBorder
                size={18}
              >
                <Text></Text>
              </Indicator>
            </div>
            <span className="inset-y-0 flex items-center">
              <FiMoreHorizontal />
            </span>
          </div>
          <div className="w-full flex-col h-[95%] flex overflow-auto">
            {renderpendingHouses()}
          </div>
          <div
            className={`flex-row-reverse flex text-light-blue cursor-pointer ${
              pendingHouse.length !== 0 ? "" : "hidden"
            }`}
            onClick={() =>
              onClick(
                user?.login.user.accountType !== AccountType.TENANT
                  ? "rentals"
                  : "contracts"
              )
            }
          >
            See more...
          </div>
        </div>
        <div className=" flex flex-col">
          <div className="flex w-full h-auto flex-row place-content-between font-semibold text-gray-800 text-2xl 2xl:text-base md:text-base xl:text-base">
            <div className="flex relative">
              <Text className="mr-2">
                Time out-({houseWithExpiredContracts.length})
              </Text>
              <Indicator
                className={`absolute p-1 top-2 rounded-lg right-0 items-center justify-center flex animate-pulse ${
                  pendingHouse.length === 0 ? "" : "hidden"
                }`}
                processing
                color="indigo"
                withBorder
                size={18}
              >
                <Text></Text>
              </Indicator>
            </div>
            <span className="inset-y-0 flex items-center">
              <FiMoreHorizontal />
            </span>
          </div>
          <div className="w-full flex-col h-[95%] flex overflow-auto">
            {renderTimeOutContracts()}
          </div>
          <div
            className={`flex-row-reverse flex text-light-blue cursor-pointer ${
              houseWithExpiredContracts.length !== 0 ? "" : "hidden"
            }`}
            onClick={() =>
              onClick(
                user?.login.user.accountType !== AccountType.TENANT
                  ? "tenants"
                  : "contracts"
              )
            }
          >
            See more...
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
        <div className="flex flex-col">
          <span className="text-white">Help Center</span>
          <span className="font-bold pi pi-phone pt-1">
            <a href="tel:+255 767 164 152">
              <span className="pl-1">+255 767 164 152</span>
            </a>
          </span>

          <span className="font-bold pi pi-whatsapp pt-1">
            <a href="https://wa.me/+255767164152">
              <span className="pl-1">+255 767 164 152</span>
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
