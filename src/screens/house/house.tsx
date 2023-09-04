import { FC, useState } from "react";
import { Text } from "@mantine/core";
import { HOUSE } from "../../house";
import { HouseProps } from "../../lib/design-interface/house-type";
import HouseUI from "../../components/houseUI";
import { FiBell, FiMapPin } from "react-icons/fi";
import ToggleButtonGroup from "../../global/components/toggle-button";
import SearchBar from "../../global/components/search-bar";
import InputText from "../../global/components/input-text";
import CustomButton from "../../components/custom-button";
import colors from "../../lib/color/colors";
import TextArea from "../../global/components/text-area";
import { FaMinus, FaPlus } from "react-icons/fa";

const House: FC = () => {
  const [selectedButton, setSelectedButton] = useState<string>("Mine");
  const [houses, setHouses] = useState<HouseProps[]>(HOUSE);
  const [filteredHouse, setFilteredHouse] = useState<HouseProps[]>([]);
  const [searchLength, setSearchLength] = useState<number>(0);
  const [name, setName] = useState<string>("");
  const [region, setRegion] = useState<string>("");
  const [district, setDistrict] = useState<string>("");
  const [ward, setWard] = useState<string>("");
  const [prica, setPrice] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  // const [imageLength, setImageLength] = useState<number>();
  const [imageUrl, setImageUrl] = useState<string[]>([]);
  const [hidePlus, setHidePlus] = useState<boolean>(false);
  const [hideMinus, setHideMinus] = useState<boolean>(true);

  const handleAddhouse = () => {
    console.log(imageUrl);
  };

  const handleSearch = (search: string) => {
    setSearchLength(search.length);
    const filtered: HouseProps[] = houses.filter(
      (house: HouseProps) =>
        house.name.toLowerCase().includes(search.toLowerCase()) ||
        house.location.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredHouse(filtered);
  };

  const handleAddImage = () => {
    if (image === "") {
      alert("Please enter image url");
    } else {
      setImageUrl([...imageUrl, image]);
      setHideMinus(false);
      if (imageUrl.length === 4) {
        setHidePlus(true);
      }
    }
  };

  const handleMinusImage = () => {
    const updatedImageUrl = [...imageUrl];
    updatedImageUrl.pop();

    setImageUrl(updatedImageUrl);
    if (imageUrl.length === 1) {
      setHideMinus(true);
      setHidePlus(false);
    }
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
    <div className="flex flex-col h-full overflow-hidden w-full text-gray-800 gap-5">
      <div className="w-full flex flex-row h-11 p-1 gap-5 items-center place-content-between ">
        <div className="w-1/2 sm:w-full md:w-full lg:w-full xl:w-full 2xl:w-full h-full sm:flex sm:justify-center  sm:items-center md:justify-center md:items-center lg:justify-center lg:items-center xl:justify-center xl:items-center 2xl:justify-center 2xl:items-center ">
          <SearchBar onSearch={handleSearch} />
        </div>
        <div className="flex justify-end w-1/2 sm:w-auto md:w-auto lg:w-auto xl:w-auto 2xl:w-auto flex-row h-full gap-2">
          <div className="bg-white w-36 h-full flex flex-row rounded-lg p-1">
            <ToggleButtonGroup
              onClick={setSelectedButton}
              name={"Mine"}
              selectedButton={selectedButton}
            />
            <ToggleButtonGroup
              onClick={setSelectedButton}
              name={"Others"}
              selectedButton={selectedButton}
            />
          </div>
          <div className="bg-white h-full justify-center items-center flex w-10 rounded-lg">
            <FiBell style={{ height: "100%", fontSize: 30 }} />
          </div>
        </div>
      </div>
      <div
        className={`w-full overflow-auto text-sm gap-2 flex flex-col h-full ${
          selectedButton === "Mine" ? "" : "hidden"
        }`}
      >
        <div className="flex flex-row place-content-between gap-2">
          <Text className="font-semibold font-serif">My Houses</Text>
          <Text className="font-sans text-blue-600">Seen More</Text>
        </div>
        <div className="w-full h-4/6 flex-row sm:h-3/6 md:h-3/6 lg:h-3/6">
          {renderHouses()}
        </div>
        <div className="flex flex-row place-content-between gap-2">
          <Text className="font-semibold font-serif ">Add more house</Text>
          <Text className="font-sans text-blue-600 flex flex-row gap-3">
            <FiMapPin /> Kinondoni
          </Text>
        </div>
        <div className="bg-white w-full h-full flex-col flex rounded-lg p-3 overflow-auto">
          <div className="sm:grid sm:grid-cols-2 sm:gap-3 md:grid-cols-1 md:gap-1 lg:grid-cols-2 lg:gap-3 xl:grid-cols-2 xl:gap-3 2xl:grid-cols-3 gap-3">
            <InputText onChange={setName} name={"House Name"} />
            <InputText onChange={setRegion} name={"Region"} />
            <InputText onChange={setDistrict} name={"District"} />
            <InputText onChange={setWard} name={"Ward"} />
            <TextArea onChange={setDescription} name={"Desription"} />
            <InputText onChange={setPrice} name={"Price"} />
            <InputText onChange={setStatus} name={"Region"} />
            <div className="flex relative pr-4 w-full h-auto flex-row place-content-between">
              <div className="w-full">
                <InputText
                  onChange={setImage}
                  name={`${imageUrl.length} image`}
                />
              </div>
              <span className="inset-y-0 flex mt-2 items-center">
                <div className="flex flex-col gap-2">
                  <FaPlus
                    className={`cursor-pointer text-light-blue ${
                      hidePlus ? "hidden" : ""
                    }`}
                    onClick={handleAddImage}
                  />
                  <FaMinus
                    className={`cursor-pointer text-light-blue ${
                      hideMinus ? "hidden" : ""
                    }`}
                    onClick={handleMinusImage}
                  />
                </div>
              </span>
            </div>
          </div>
          <div className="justify-center items-center flex mt-5">
            <CustomButton
              backgroundColor={colors.lightBlue}
              borderRadius={8}
              name={"Add"}
              color={"white"}
              fontSize={14}
              border={"none"}
              paddingLeft={30}
              paddingRight={30}
              paddingTop={10}
              paddingBottom={10}
              onClick={handleAddhouse}
            />
          </div>
        </div>
      </div>
      <div
        className={`w-full overflow-auto text-sm gap-2 flex flex-col h-full ${
          selectedButton === "Others" ? "" : "hidden"
        }`}
      >
        <div className="flex flex-row place-content-between gap-2">
          <Text className="font-semibold font-serif">All Houses</Text>
          <Text className="font-sans text-blue-600">Seen More</Text>
        </div>
        <div className="w-full h-2/6 flex-row">{renderHouses()}</div>
        <div className="flex flex-row place-content-between gap-2">
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

export default House;
