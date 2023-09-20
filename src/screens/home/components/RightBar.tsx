import { Indicator } from "@mantine/core";
import { useEffect, useState } from "react";
import { BookedHouseQuery } from "../../../generated/graphql";
import {
  clearUserData,
  getUserAccessToken,
} from "../../../utils/localStorageUtils";
import useFetchBookedHouses from "../../Rental/components/fetchBookedHouses";

const RightBar = () => {
  const [currentTenant, setCurrentTenant] =
    useState<BookedHouseQuery["myHouse"][0]["contract"][0]>();
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [pendingHouse, setPendingHouse] = useState<
    BookedHouseQuery["myHouse"][0][]
  >([]);

  useEffect(() => {
    const token = getUserAccessToken();

    if (token) {
      setAccessToken(token);
    }
  }, []);

  const { isLoading, error, data } = useFetchBookedHouses(accessToken ?? "");

  useEffect(() => {
    if (data) {
      const housesWithPendingStatus = data.myHouse.filter(
        (house: BookedHouseQuery["myHouse"][0]) => house.status === "Pending"
      );

      setPendingHouse(housesWithPendingStatus);
    }
  }, [data]);

  if (error) {
    const errorMessage =
      error !== null
        ? error.response.errors[0].message
        : error !== null
        ? error.response.errors[0].message
        : "Unknow error occured";

    // if (errorMessage === "Unauthorized") {
    //   clearUserData();
    // }
  }

  const filterCurrentTenant = () => {
    const currentContract = pendingHouse.filter((contract) =>
      contract.contract.find((current) => current.isCurrent === true)
    );
    console.log(currentContract);
  };

  const dataWithFilteredContracts = pendingHouse.map((house) =>
    house.contract.find((contract) => contract.isCurrent)
  );

  console.log(dataWithFilteredContracts);

  const getCurrentTenant = (item: BookedHouseQuery["myHouse"][0]): string => {
    const currentContract = item.contract.find(
      (contract) => contract.isCurrent === true
    );
    return currentContract?.Tenant.firstName ?? '';
  };

  return (
    <div className="w-72 h-screen justify-between   items-center flex flex-col overflow-auto">
      <div className="flex flex-col rounded-lg h-auto pt-2 w-11/12">
        <div className="flex h-52 w-full bg-white shadow-xl border border-slate-200 rounded-lg  mt-3 flex-col p-1">
          <span className="flex w-full  justify-center">
            <Indicator inline color="green" processing size={13}>
              <text className="font-semibold underline">PENDING CONTRACTS</text>
            </Indicator>
          </span>

          <div className="flex flex-col overflow-auto">
            {pendingHouse.map((item, index) => (
              <span
                className="flex w-full  h-16 mt-3 hover:cursor-pointer "
                key={index}
              >
                <span className="w-20 h-12  flex justify-center rounded-full">
                  <img
                    className="flex rounded-lg"
                    src={item.imgUrl[0]}
                    alt="pc"
                  />
                </span>
                <span className="w-full h-full ml-2 flex flex-col">
                  <span className="font-semibold flex justify-between">
                    <text className="font-semibold ">
                      {getCurrentTenant(item)}
                    </text>
                  </span>
                  <span className="relative  w-full inline-block text-sm overflow-hidden">
                    <span className="w-full block overflow-hidden whitespace-nowrap text-ellipsis">
                      {item.name}
                    </span>
                  </span>
                </span>
              </span>
            ))}
          </div>
        </div>
        <div className="flex h-52 w-full bg-white shadow-xl border border-slate-200 rounded-lg  mt-3 flex-col p-1">
          <span className="flex w-full  justify-center">
            <Indicator inline color="red" processing size={13}>
              <text className="font-semibold underline">EXPIRED CONTRACTS</text>
            </Indicator>
          </span>

          <div className="flex flex-col overflow-auto">
            {/* {data?.map(() => (
              <span className="flex w-full  h-16 mt-3 hover:cursor-pointer ">
                <span className="w-20 h-12  flex justify-center rounded-full">
                  <img className="flex rounded-lg" src={"Avatered"} alt="pc" />
                </span>
                <span className="w-full h-full ml-2 flex flex-col">
                  <span className="font-semibold flex justify-between">
                    <text className="font-semibold ">TenantName</text>
                  </span>
                  <span className="relative  w-full inline-block text-sm overflow-hidden">
                    <span className="w-full block overflow-hidden whitespace-nowrap text-ellipsis">
                      House name goes here
                    </span>
                  </span>
                </span>
              </span>
            ))} */}
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center w-full">
        <span className="flex flex-col justify-evenly hover:cursor-pointer rounded-xl mt-8 h-44 w-5/6 bg-blue-400 border p-2">
          Search and find your favourite real estate
          <span>
            Learn more...
            <i className="pi pi-arrow-right ml-3" />
          </span>
        </span>
        <span className="flex flex-col justify-evenly items-center rounded-xl mt-8 h-44 pb-3 mb-3 w-5/6 border">
          <span className="text-blue-400">Help Center</span>
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

          <span className="font-bold pi pi-whatsapp pt-1">
            <a href="https://wa.me/+255744703181">
              <span className="pl-1">+255 744 703 181</span>
            </a>
          </span>
        </span>
      </div>
    </div>
  );
};

export default RightBar;
