import { FC, useEffect, useState } from "react";
import SearchBar from "../../global/components/search-bar";
import { Text } from "@mantine/core";
import { ProgressSpinner } from "primereact/progressspinner";
import { MyContractQuery } from "../../generated/graphql";
import {
  clearUserData,
  getUserAccessToken,
} from "../../utils/localStorageUtils";
import { FiBell } from "react-icons/fi";
import ToggleButtonGroup from "../../global/components/toggle-button";
import useFetchMyContracts from "../tenant-living/functions/myContract";
import CurrentContractUI from "./components/current-contract";

const Contracts: FC = () => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [selectedButton, setSelectedButton] = useState<string>("Current");

  const [searchCurrentContract, setSearchCurrentContract] = useState<number>(0);
  const [searchHistory, setSearchHistory] = useState<number>(0);

  const [currentContracts, setCurrentContracts] = useState<
    MyContractQuery["myContract"][0][]
  >([]);
  const [filteredCurrentContracts, setFilteredCurrentContracts] = useState<
    MyContractQuery["myContract"][0][]
  >([]);
  const [filteredHistory, setFilteredHistory] = useState<
    MyContractQuery["myContract"][0][]
  >([]);

  useEffect(() => {
    const token = getUserAccessToken();

    if (token) {
      setAccessToken(token);
    }
  }, []);

  const {
    isLoading: isLoadingContracts,
    error: contractError,
    data: contractData,
  } = useFetchMyContracts(accessToken ?? "");

  useEffect(() => {
    if (contractData) {
      const currentContract = contractData.myContract.filter(
        (contract: MyContractQuery["myContract"][0]) =>
          contract.isCurrent === true
      );

      setCurrentContracts(currentContract);
    }
  }, [contractData]);

  if (contractError) {
    const errorMessage =
      contractError !== null
        ? //@ts-ignore
          contractError.response.errors[0].message
        : contractError !== null
        ? //@ts-ignore
          contractError.response.errors[0].message
        : "Unknow error occured";

    if (errorMessage === "Unauthorized") {
      clearUserData();
    }
  }

  const handleCurrentSearch = (search: string) => {
    setSearchCurrentContract(search.length);
    if (contractData) {
      const filtered: MyContractQuery["myContract"][0][] =
        currentContracts.filter(
          (contract: MyContractQuery["myContract"][0]) =>
            contract.House.name.toLowerCase().includes(search.toLowerCase()) ||
            contract.House.District.toLowerCase().includes(
              search.toLowerCase()
            ) ||
            contract.House.Region.toLowerCase().includes(
              search.toLowerCase()
            ) ||
            contract.House.Ward.toLowerCase().includes(search.toLowerCase()) ||
            contract.Total_rent.toLowerCase().includes(search.toLowerCase())
        );
      setFilteredCurrentContracts(filtered);
    } else {
      setFilteredCurrentContracts([]);
    }
  };

  const handleSearchHistory = (search: string) => {
    setSearchHistory(search.length);
    setSearchHistory(search.length);
    if (contractData) {
      const filtered: MyContractQuery["myContract"][0][] =
        contractData.myContract.filter(
          (contract: MyContractQuery["myContract"][0]) =>
            contract.House.name.toLowerCase().includes(search.toLowerCase()) ||
            contract.House.District.toLowerCase().includes(
              search.toLowerCase()
            ) ||
            contract.House.Region.toLowerCase().includes(
              search.toLowerCase()
            ) ||
            contract.House.Ward.toLowerCase().includes(search.toLowerCase()) ||
            contract.Total_rent.toLowerCase().includes(search.toLowerCase())
        );
      setFilteredHistory(filtered);
    } else {
      setFilteredHistory([]);
    }
  };

  const renderCurrentContract = () => {
    return (
      <ul className="flex flex-col sm:flex-col gap-3 sm:grid xl:grid-cols-2 2xl:grid-cols-4">
        {filteredCurrentContracts.length === 0 &&
        searchCurrentContract !== 0 ? (
          <div className="font-sans text-2xl"></div>
        ) : searchCurrentContract === 0 ? (
          currentContracts.map((house, index) => (
            <li key={index}>
              <CurrentContractUI props={{ ...house }} />
            </li>
          ))
        ) : (
          filteredCurrentContracts.map((house, index) => (
            <li key={index}>
              <CurrentContractUI props={{ ...house }} />
            </li>
          ))
        )}
      </ul>
    );
  };

  const renderHistoryContracts = () => {
    return (
      <ul className="flex flex-col sm:flex-col gap-3 sm:grid xl:grid-cols-2 2xl:grid-cols-4">
        {filteredHistory.length === 0 && searchHistory !== 0 ? (
          <div className="font-sans text-2xl"></div>
        ) : searchHistory === 0 ? (
          contractData?.myContract.map((house, index) => (
            <li key={index}>
              <CurrentContractUI props={{ ...house }} />
            </li>
          ))
        ) : (
          filteredHistory.map((house, index) => (
            <li key={index}>
              <CurrentContractUI props={{ ...house }} />
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
            onSearch={(value: string) => {
              selectedButton === "Current"
                ? handleCurrentSearch(value)
                : handleSearchHistory(value);
            }}
          />
        </div>
        <div
          className={`flex justify-end w-1/2 sm:w-auto md:w-auto lg:w-auto xl:w-auto 2xl:w-auto flex-row h-full gap-2 `}
        >
          <div className="bg-white w-40 h-full flex flex-row rounded-lg p-1">
            <ToggleButtonGroup
              onClick={setSelectedButton}
              name={"Current"}
              selectedButton={selectedButton}
            />
            <ToggleButtonGroup
              onClick={setSelectedButton}
              name={"History"}
              selectedButton={selectedButton}
            />
          </div>
          <div className="bg-white h-full justify-center items-center flex w-10 rounded-lg">
            <FiBell style={{ height: "100%", fontSize: 30 }} />
          </div>
        </div>
      </div>

      {/*CURRENT HOUSES*/}
      <div
        className={`w-full overflow-auto text-sm gap-2 flex flex-col h-full`}
      >
        <div className="flex flex-row place-content-between gap-2">
          <Text className="font-semibold font-serif">
            {selectedButton === "Current"
              ? "Current contracts"
              : "My contracts"}
          </Text>
        </div>
        <div
          className={`card justify-center items-center flex ${
            isLoadingContracts === false ? "hidden" : ""
          }`}
        >
          {isLoadingContracts && (
            <ProgressSpinner
              style={{ width: "50px", height: "50px" }}
              strokeWidth="5"
              fill="var(--surface-ground)"
              animationDuration=".5s"
            />
          )}
        </div>
        <div className="w-full h-auto">
          {selectedButton === "Current"
            ? renderCurrentContract()
            : renderHistoryContracts()}
        </div>
      </div>
    </div>
  );
};

export default Contracts;
