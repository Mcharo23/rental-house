import { FC, useEffect, useState } from "react";
import { FiBell } from "react-icons/fi";
import SearchBar from "../../global/components/search-bar";
import ToggleButtonGroup from "../../global/components/toggle-button";
import { BookedHouseQuery } from "../../generated/graphql";
import {
  clearUserData,
  getUserAccessToken,
} from "../../utils/localStorageUtils";
import { Text } from "@mantine/core";
import PendingHouse from "./components/pending";
import Booked from "./components/booked";
import { ProgressSpinner } from "primereact/progressspinner";
import useFetchBookedHouses from "./components/fetchBookedHouses";

const Rentals: FC = () => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [searchPendingLength, setSearchPendingLength] = useState<number>(0);
  const [searchBookedLength, setSearchBookedLength] = useState<number>(0);

  const [selectedButton, setSelectedButton] = useState<string>("Pending");
  const [filteredPending, setFilteredPending] = useState<
    BookedHouseQuery["myHouse"][0][]
  >([]);
  const [filteredBooked, setFilteredBooked] = useState<
    BookedHouseQuery["myHouse"][0][]
  >([]);
  const [bookedHouse, setBookedHouse] = useState<
    BookedHouseQuery["myHouse"][0][]
  >([]);
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
      const housesWithBookedStatus = data.myHouse.filter(
        (house: BookedHouseQuery["myHouse"][0]) =>
          house.status === "Booked" &&
          house.contract.some((contract) => contract.Date_of_contract === null)
      );

      setBookedHouse(housesWithBookedStatus);

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

    if (errorMessage === "Unauthorized") {
      clearUserData();
    }
  }

  const handleSearchPendingHouses = (search: string) => {
    setSearchPendingLength(search.length);
    if (pendingHouse) {
      const filtered: BookedHouseQuery["myHouse"][0][] = pendingHouse.filter(
        (house: BookedHouseQuery["myHouse"][0]) =>
          house.name.toLowerCase().includes(search.toLowerCase()) ||
          house.District.toLowerCase().includes(search.toLowerCase()) ||
          house.Region.toLowerCase().includes(search.toLowerCase()) ||
          house.Ward.toLowerCase().includes(search.toLowerCase()) ||
          house.status.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredPending(filtered);
    } else {
      setFilteredPending([]);
    }
  };

  const handleSearchBookedHouses = (search: string) => {
    setSearchBookedLength(search.length);
    if (bookedHouse) {
      const filtered: BookedHouseQuery["myHouse"][0][] = bookedHouse.filter(
        (house: BookedHouseQuery["myHouse"][0]) =>
          house.name.toLowerCase().includes(search.toLowerCase()) ||
          house.District.toLowerCase().includes(search.toLowerCase()) ||
          house.Region.toLowerCase().includes(search.toLowerCase()) ||
          house.Ward.toLowerCase().includes(search.toLowerCase()) ||
          house.status.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredBooked(filtered);
    } else {
      setFilteredBooked([]);
    }
  };

  const renderPendingHouses = () => {
    return (
      <ul className="flex flex-col sm:flex-col gap-3 sm:grid xl:grid-cols-2 2xl:grid-cols-4">
        {filteredPending.length === 0 && searchPendingLength !== 0 ? (
          <div className="font-sans text-md flex h-full w-full  ">
            No House With Pending Contract Yet
          </div>
        ) : searchPendingLength === 0 ? (
          pendingHouse.map((house, index) => (
            <li key={index}>
              <PendingHouse props={{ ...house }} />
            </li>
          ))
        ) : (
          filteredPending.map((house, index) => (
            <li key={index}>
              <PendingHouse props={{ ...house }} />
            </li>
          ))
        )}
      </ul>
    );
  };

  const renderBookedHouses = () => {
    return (
      <ul className="flex flex-col sm:flex-col gap-3 sm:grid xl:grid-cols-2 2xl:grid-cols-4">
        {filteredPending.length === 0 && searchBookedLength !== 0 ? (
          <div className="font-sans text-md"></div>
        ) : searchBookedLength === 0 ? (
          bookedHouse.map((house, index) => (
            <li key={index}>
              <Booked props={{ ...house }} />
            </li>
          ))
        ) : (
          filteredBooked.map((house, index) => (
            <li key={index}>
              <Booked props={{ ...house }} />
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
          <SearchBar
            onSearch={
              selectedButton === "Pending"
                ? handleSearchPendingHouses
                : handleSearchBookedHouses
            }
          />
        </div>
        <div className="flex justify-end w-1/2 sm:w-auto md:w-auto lg:w-auto xl:w-auto 2xl:w-auto flex-row h-full gap-2">
          <div className="bg-white w-40 h-full flex flex-row rounded-lg p-1">
            <ToggleButtonGroup
              onClick={setSelectedButton}
              name={"Booked"}
              selectedButton={selectedButton}
            />
            <ToggleButtonGroup
              onClick={setSelectedButton}
              name={"Pending"}
              selectedButton={selectedButton}
            />
          </div>
          <div className="bg-white h-full justify-center items-center flex w-10 rounded-lg">
            <FiBell style={{ height: "100%", fontSize: 30 }} />
          </div>
        </div>
      </div>
      {/*BOOKED HOUSE*/}
      <div
        className={`w-full overflow-auto text-sm gap-2 flex flex-col h-full ${
          selectedButton === "Booked" ? "" : "hidden"
        }`}
      >
        <div className="flex flex-row place-content-between gap-2">
          <Text className="font-semibold font-serif">
            {selectedButton === "Pending" ? "Pending Houses" : "Booked Houses"}
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
        <div className="w-full h-auto">{renderBookedHouses()}</div>
      </div>

      {/*PENDING HOUSES*/}
      <div
        className={`w-full overflow-auto text-sm gap-2 flex flex-col h-full ${
          selectedButton === "Pending" ? "" : "hidden"
        }`}
      >
        <div className="flex flex-row place-content-between gap-2">
          <Text className="font-semibold font-serif">Pending Houses</Text>
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
        <div className="w-full h-auto">{renderPendingHouses()}</div>
      </div>
    </div>
  );
};

export default Rentals;
