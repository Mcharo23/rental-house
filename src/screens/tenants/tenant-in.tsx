import { FC, useEffect, useState } from "react";
import SearchBar from "../../global/components/search-bar";
import { Text } from "@mantine/core";
import { ProgressSpinner } from "primereact/progressspinner";
import useFetchBookedHouses from "../Rental/components/fetchBookedHouses";
import { BookedHouseQuery } from "../../generated/graphql";
import {
  clearUserData,
  getUserAccessToken,
} from "../../utils/localStorageUtils";
import CurrentHouseUI from "./components/curent-house";

const Tenants: FC = () => {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const [searchCurrentLength, setSearchCurrentLength] = useState<number>(0);

  const [currentHouses, setCurrentHouses] = useState<
    BookedHouseQuery["myHouse"][0][]
  >([]);
  const [filteredCurrent, setFilteredCurrent] = useState<
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
      const current = data.myHouse.filter(
        (house: BookedHouseQuery["myHouse"][0]) =>
          house.status === "Booked" &&
          house.contract.some((contract) => contract.Date_of_contract !== null)
      );

      setCurrentHouses(current);
    }
  }, [data]);

  if (error) {
    const errorMessage =
      error !== null
        ? error.response.errors[0].message
        : error !== null
        ? error.response.errors[0].message
        : "Unknow error occured";

    if (errorMessage === "Unauthorized") {
      clearUserData();
    }
  }

  const handleSearchCurrent = (search: string) => {
    setSearchCurrentLength(search.length);
    if (data) {
      const filtered: BookedHouseQuery["myHouse"][0][] = currentHouses.filter(
        (house: BookedHouseQuery["myHouse"][0]) =>
          house.name.toLowerCase().includes(search.toLowerCase()) ||
          house.District.toLowerCase().includes(search.toLowerCase()) ||
          house.Region.toLowerCase().includes(search.toLowerCase()) ||
          house.Ward.toLowerCase().includes(search.toLowerCase()) ||
          house.status.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredCurrent(filtered);
    } else {
      setFilteredCurrent([]);
    }
  };

  const renderCurrentHouses = () => {
    return (
      <ul className="flex flex-col sm:flex-col gap-3 sm:grid xl:grid-cols-2 2xl:grid-cols-4">
        {filteredCurrent.length === 0 && searchCurrentLength !== 0 ? (
          <div className="font-sans text-2xl"></div>
        ) : searchCurrentLength === 0 ? (
          currentHouses.map((house, index) => (
            <li key={index}>
              <CurrentHouseUI props={{ ...house }} />
            </li>
          ))
        ) : (
          filteredCurrent.map((house, index) => (
            <li key={index}>
              <CurrentHouseUI props={{ ...house }} />
            </li>
          ))
        )}
      </ul>
    );
  };

  return (
    <div className="flex flex-col h-full overflow-hidden w-full text-gray-800 gap-5">
      {/*TOP SECTION*/}
      <div className="w-full flex flex-row h-11 p-1 gap-5 items-center place-content-between ">
        <div className="w-1/2 sm:w-full md:w-full lg:w-full xl:w-full 2xl:w-full h-full sm:flex sm:justify-center  sm:items-center md:justify-center md:items-center lg:justify-center lg:items-center xl:justify-center xl:items-center 2xl:justify-center 2xl:items-center ">
          <SearchBar onSearch={handleSearchCurrent} />
        </div>
      </div>

      {/*CURRENT HOUSES*/}
      <div
        className={`w-full overflow-auto text-sm gap-2 flex flex-col h-full`}
      >
        <div className="flex flex-row place-content-between gap-2">
          <Text className="font-semibold font-serif">
            Current occupied houses
          </Text>
        </div>
        <div
          className={`card justify-center items-center flex ${
            isLoading === false ? "hidden" : ""
          }`}
        >
          {isLoading && (
            <ProgressSpinner
              style={{ width: "50px", height: "50px" }}
              strokeWidth="5"
              fill="var(--surface-ground)"
              animationDuration=".5s"
            />
          )}
        </div>
        <div className="w-full h-auto">{renderCurrentHouses()}</div>
      </div>
    </div>
  );
};

export default Tenants;
