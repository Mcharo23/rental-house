import { Indicator } from "@mantine/core";
import { FC, useEffect, useState } from "react";
import { BookedHouseQuery } from "../../../generated/graphql";
import {
  getUserAccessToken,
} from "../../../utils/localStorageUtils";
import useFetchBookedHouses from "../../Rental/components/fetchBookedHouses";
import { differenceInDays } from "date-fns";
type rightBar = {
  onClick: (value: string) => void;
};
const RightBar: FC<rightBar> = ({ onClick }) => {
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
      console.log("auu", filtered);
    }
  }, [data]);

  if (error) {

    // if (errorMessage === "Unauthorized") {
    //   clearUserData();
    // }
  }


  const dataWithFilteredContracts = pendingHouse.map((house) =>
    house.contract.find((contract) => contract.isCurrent)
  );

  console.log(dataWithFilteredContracts);

  const getCurrentTenant = (item: BookedHouseQuery["myHouse"][0]): string => {
    const currentContract = item.contract.find(
      (contract) => contract.isCurrent === true
    );
    return currentContract?.Tenant.firstName ?? "";
  };

  return (
    <div className="w-72 h-screen justify-between   items-center flex flex-col overflow-auto">
      <div className="flex flex-col rounded-lg h-auto pt-2 w-11/12">
        <div className="flex h-52 w-full bg-white shadow-xl border border-slate-200 rounded-lg  mt-3 flex-col p-1">
          <span className="flex w-full  justify-center">
            <Indicator inline color="green" processing size={13}>
              <p
                className="font-semibold underline hover:cursor-pointer"
                onClick={() => onClick("rentals")}
              >
                PENDING CONTRACTS({pendingHouse.length})
              </p>
            </Indicator>
          </span>

          <div className="flex flex-col overflow-auto">
            {pendingHouse.length === 0 ? (
              <span>No Pending Contracts</span>
            ) : (
              pendingHouse.map((item, index) => (
                <span
                  className="flex w-full  h-16 mt-3 hover:cursor-pointer "
                  key={index}
                  onClick={() => onClick("rentals")}
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
                      <p className="font-semibold ">{getCurrentTenant(item)}</p>
                    </span>
                    <span className="relative  w-full inline-block text-sm overflow-hidden">
                      <span className="w-full block overflow-hidden whitespace-nowrap text-ellipsis">
                        {item.name}
                      </span>
                    </span>
                  </span>
                </span>
              ))
            )}
          </div>
        </div>
        <div className="flex h-52 w-full bg-white shadow-xl border border-slate-200 rounded-lg  mt-3 flex-col p-1">
          <span className="flex w-full  justify-center">
            <Indicator inline color="red" processing size={13}>
              <p
                className="font-semibold underline hover:cursor-pointer"
                onClick={() => onClick("tenants")}
              >
                EXPIRED CONTRACTS({houseWithExpiredContracts.length})
              </p>
            </Indicator>
          </span>

          <div className="flex flex-col overflow-auto">
            {houseWithExpiredContracts.length === 0 ? (
              <span>No Expired Contracts</span>
            ) : (
              houseWithExpiredContracts.map((item, index) => (
                <span
                  className="flex w-full  h-16 mt-3 hover:cursor-pointer "
                  key={index}
                  onClick={() => onClick("tenants")}
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
                      <p className="font-semibold ">{getCurrentTenant(item)}</p>
                    </span>
                    <span className="relative  w-full inline-block text-sm overflow-hidden">
                      <span className="w-full block overflow-hidden whitespace-nowrap text-ellipsis">
                        {item.name}
                      </span>
                    </span>
                  </span>
                </span>
              ))
            )}
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
