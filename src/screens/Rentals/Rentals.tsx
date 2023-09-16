import { FC, useEffect, useState } from "react";
import { FiBell } from "react-icons/fi";
import SearchBar from "../../global/components/search-bar";
import ToggleButtonGroup from "../../global/components/toggle-button";
import { BookedHouseQuery, useBookedHouseQuery } from "../../generated/graphql";
import graphqlRequestClient from "../../lib/clients/graphqlRequestClient";
import { getUserAccessToken } from "../../utils/localStorageUtils";
import { useQueryClient } from "@tanstack/react-query";
import { ProgressSpinner } from "primereact/progressspinner";
import { Text } from "@mantine/core";
import PendingHouse from "./components/pending";

const Rentals: FC = () => {
  const queryClient = useQueryClient();
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [shouldFetchData, setShouldFetchData] = useState(false);
  const [mineView, setMineView] = useState<boolean>(false);
  const [OthersView, setOthersView] = useState<boolean>(false);
  const [searchPendingLength, setSearchPendingLength] = useState<number>(0);

  const [selectedButton, setSelectedButton] = useState<string>("Pending");
  const [bookedHouse, setBookedHouse] = useState<
    BookedHouseQuery["myHouse"][0][]
  >([]);
  const [pendingHouse, setPendingHouse] = useState<
    BookedHouseQuery["myHouse"][0][]
  >([]);
  const [filteredPending, setFilteredPending] = useState<
    BookedHouseQuery["myHouse"][0][]
  >([]);
  const [filteredBooked, setFilteredBooked] = useState<
    BookedHouseQuery["myHouse"][0][]
  >([]);

  useEffect(() => {
    const token = getUserAccessToken();

    if (token) {
      setAccessToken(token);
      setShouldFetchData(true);
    }
  }, []);

  const {
    isLoading: isLoadingHouses,
    error: errorHouses,
    data: dataHouses,
  } = useBookedHouseQuery<BookedHouseQuery, Error>(
    graphqlRequestClient.setHeaders({ Authorization: `Bearer ${accessToken}` }),
    {},
    {
      enabled: shouldFetchData,
    }
  );

  useEffect(() => {
    if (dataHouses) {
      setShouldFetchData(false);
    }
    console.log(dataHouses);
  }, [dataHouses]);

  useEffect(() => {
    if (dataHouses) {
      const housesWithBookedStatus = dataHouses.myHouse.filter(
        (house) => house.status === "Booked"
      );

      setBookedHouse(housesWithBookedStatus);

      const housesWithPendingStatus = dataHouses.myHouse.filter(
        (house) => house.status === "Pending"
      );

      setPendingHouse(housesWithPendingStatus);
    }
  }, [dataHouses]);

  const handleSearch = (search: string) => {
    // setSearchLength(search.length);
    // if (dataHouses) {
    //   const filtered: GetHousesQuery["houses"][0][] = dataHouses.houses.filter(
    //     (house: GetHousesQuery["houses"][0]) =>
    //       house.name.toLowerCase().includes(search.toLowerCase()) ||
    //       house.District.toLowerCase().includes(search.toLowerCase()) ||
    //       house.Region.toLowerCase().includes(search.toLowerCase()) ||
    //       house.Ward.toLowerCase().includes(search.toLowerCase()) ||
    //       house.status.toLowerCase().includes(search.toLowerCase())
    //   );
    //   setFilteredInAllHouse(filtered);
    // } else {
    //   setFilteredInAllHouse([]);
    // }
  };

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
  const renderPendingHouses = () => {
    return (
      <ul className="flex flex-col sm:flex-col">
        {filteredPending.length === 0 && searchPendingLength !== 0 ? (
          <div className="font-sans text-2xl"></div>
        ) : searchPendingLength === 0 ? (
          pendingHouse.map((house, index) => (
            <li
              key={index}
              className="flex w-full h-1/4 sm:grid sm:grid-cols-1 sm:gap-10 md:grid-cols-1 md:gap-6 lg:grid-cols-2 lg:gap-6 xl:grid-cols-2 xl:gap-6 2xl:grid-cols-3 2xl:gap-6"
            >
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

  return (
    <div className="flex flex-col h-full overflow-hidden w-full text-gray-800 gap-5">
      {/*TOP SECTION*/}
      <div className="w-full flex flex-row h-11 p-1 gap-5 items-center place-content-between ">
        <div className="w-1/2 sm:w-full md:w-full lg:w-full xl:w-full 2xl:w-full h-full sm:flex sm:justify-center  sm:items-center md:justify-center md:items-center lg:justify-center lg:items-center xl:justify-center xl:items-center 2xl:justify-center 2xl:items-center ">
          <SearchBar
            onSearch={
              selectedButton === "Pending"
                ? handleSearchPendingHouses
                : handleSearch
            }
          />
        </div>
        <div className="flex justify-end w-1/2 sm:w-auto md:w-auto lg:w-auto xl:w-auto 2xl:w-auto flex-row h-full gap-2">
          <div className="bg-white w-36 h-full flex flex-row rounded-lg p-1">
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
          selectedButton === "Booked" && !mineView ? "" : "hidden"
        }`}
      >
        M
      </div>

      {/*PENDING HOUSES*/}
      <div
        className={`w-full overflow-auto text-sm gap-2 flex flex-col h-full ${
          selectedButton === "Pending" && !OthersView ? "" : "hidden"
        }`}
      >
        <div className="flex flex-row place-content-between gap-2">
          <Text className="font-semibold font-serif">Pending Houses</Text>
        </div>
        <div className="w-full h-auto">
          <div
            className={`card justify-center items-center flex w-full ${
              isLoadingHouses === false ? "hidden" : ""
            }`}
          >
            {isLoadingHouses && (
              <ProgressSpinner
                style={{ width: "50px", height: "50px" }}
                strokeWidth="5"
                fill="var(--surface-ground)"
                animationDuration=".5s"
              />
            )}
          </div>
          {renderPendingHouses()}
        </div>
      </div>
    </div>
  );
};

export default Rentals;
