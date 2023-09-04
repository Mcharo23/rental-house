import { FC, useState } from "react";
import { Text } from "@mantine/core";
import { HOUSE } from "../../house";
import { HouseProps } from "../../lib/design-interface/house-type";
import HouseUI from "../../components/houseUI";
import { FiBell, FiMapPin } from "react-icons/fi";
import ToggleButtonGroup from "../../global/components/toggle-button";
import SearchBar from "../../global/components/search-bar";

const Dashboard: FC = () => {
  const [selectedButton, setSelectedButton] = useState<string>("Owner");
  const [houses, setHouses] = useState<HouseProps[]>(HOUSE);
  const [filteredHouse, setFilteredHouse] = useState<HouseProps[]>([]);
  const [searchLength, setSearchLength] = useState<number>(0);

  const handleSearch = (search: string) => {
    setSearchLength(search.length);
    const filtered: HouseProps[] = houses.filter(
      (house: HouseProps) =>
        house.name.toLowerCase().includes(search.toLowerCase()) ||
        house.location.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredHouse(filtered);
  };

  const renderHouses = () => {
    return (
      <ul className="flex flex-row gap-3 h-full overscroll-auto overflow-auto ">
        {filteredHouse.length === 0 && searchLength !== 0 ? (
          <div className="font-sans text-2xl"></div>
        ) : searchLength === 0 ? (
          houses.map((house, index) => (
            <li key={index}>
              <HouseUI {...house} />
            </li>
          ))
        ) : (
          filteredHouse.map((house, index) => (
            <li key={index}>
              <HouseUI
                name={house.name}
                price={house.price}
                location={house.location}
                img={house.img}
              />
            </li>
          ))
        )}
      </ul>
    );
  };

  return (
    <div className="flex flex-col h-full w-full text-gray-800 gap-5">
      <div className="w-full flex flex-row h-11 p-1 gap-5 items-center place-content-between">
        <div className="w-1/2 sm:w-full md:w-full lg:w-full xl:w-full 2xl:w-full h-full sm:flex sm:justify-center  sm:items-center md:justify-center md:items-center lg:justify-center lg:items-center xl:justify-center xl:items-center 2xl:justify-center 2xl:items-center ">
          <SearchBar onSearch={handleSearch} />
        </div>
        <div className="flex justify-end w-1/2 sm:w-auto md:w-auto lg:w-auto xl:w-auto 2xl:w-auto flex-row h-full gap-2">
          <div className="bg-white w-36 h-full flex flex-row rounded-lg p-1">
            <ToggleButtonGroup
              onClick={setSelectedButton}
              name={"Owner"}
              selectedButton={selectedButton}
            />
            <ToggleButtonGroup
              onClick={setSelectedButton}
              name={"Tenant"}
              selectedButton={selectedButton}
            />
          </div>
          <div className="bg-white h-full justify-center items-center flex w-10 rounded-lg">
            <FiBell style={{ height: "100%", fontSize: 30 }} />
          </div>
        </div>
      </div>
      <div className="w-full overflow-auto flex flex-col h-full text-lg">
        <div className="flex flex-row place-content-between gap-2">
          <Text className="font-semibold font-serif">Popular of the week</Text>
          <Text className="font-sans text-blue-600">Seen More</Text>
        </div>
        <div className="w-full h-2/6 flex-row">{renderHouses()}</div>
        <div className="flex flex-row place-content-between mt-5 gap-2">
          <Text className="font-semibold font-serif ">
            Find the nearest of you
          </Text>
          <Text className="font-sans text-blue-600 flex flex-row gap-3">
            <FiMapPin /> Kinondoni
          </Text>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
