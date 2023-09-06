import { FC, useEffect, useState } from "react";
import { Text } from "@mantine/core";
import { HOUSE } from "../../house";
import { HouseProps } from "../../lib/design-interface/house-type";
import HouseUI from "../../components/houseUI";
import { FiBell, FiMapPin } from "react-icons/fi";
import ToggleButtonGroup from "../../global/components/toggle-button";
import SearchBar from "../../global/components/search-bar";
import CustomInputField from "../../global/components/input-text";
import CustomButton from "../../components/custom-button";
import colors from "../../lib/color/colors";
import { FaMinus, FaPlus } from "react-icons/fa";
import {
  CreateHouseInputMutation,
  useCreateHouseInputMutation,
} from "../../generated/graphql";
import graphqlRequestClient from "../../lib/clients/graphqlRequestClient";
import { useQueryClient } from "@tanstack/react-query";
import { GraphQLError } from "graphql";
import { getUserAccessToken } from "../../utils/localStorageUtils";
import { notifications } from "@mantine/notifications";

const House: FC = () => {
  const queryClient = useQueryClient();
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const [selectedButton, setSelectedButton] = useState<string>("Mine");
  const [houses, setHouses] = useState<HouseProps[]>(HOUSE);
  const [filteredHouse, setFilteredHouse] = useState<HouseProps[]>([]);
  const [searchLength, setSearchLength] = useState<number>(0);
  const [name, setName] = useState<string>("");
  const [region, setRegion] = useState<string>("");
  const [district, setDistrict] = useState<string>("");
  const [ward, setWard] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string[]>([]);
  const [hidePlus, setHidePlus] = useState<boolean>(false);
  const [hideMinus, setHideMinus] = useState<boolean>(true);

  useEffect(() => {
    const token = getUserAccessToken();
    if (token) {
      setAccessToken(token);
    }
  }, []);

  const { mutate } = useCreateHouseInputMutation(
    graphqlRequestClient.setHeaders({ Authorization: `Bearer ${accessToken}` }),
    {
      onSuccess: (data: CreateHouseInputMutation) => {
        queryClient.invalidateQueries(["createUserInput"]);
        alert("Successfull");
        return console.log("mutation data", data);
      },
      onError: (error: GraphQLError) => {
        Array.isArray(error.response.errors[0].extensions.originalError.message)
          ? Array(
              error.response.errors[0].extensions.originalError.message.length
            )
              .fill(0)
              .forEach((_, index) => {
                setTimeout(() => {
                  notifications.show({
                    title: `Notification ${index + 1}`,
                    message: "message",
                  });
                }, 200 * index);
              })
          : alert("message");
      },
    }
  );

  const handleAddhouse = async () => {
    if (
      name.length === 0 ||
      region.length === 0 ||
      ward.length === 0 ||
      district.length === 0 ||
      status.length === 0 ||
      description.length === 0
    ) {
      alert("All fields are required");
    } else if (price.length === 0) {
      alert("are you sure the price is 0?");
    } else if (imageUrl.length !== 5) {
      alert("Your are required to upload 5 images");
    } else {
      await mutate({
        input: {
          name: name,
          Region: region,
          District: district,
          Ward: ward,
          Description: description,
          status: status,
          price: Number(price),
          imgUrl: imageUrl,
        },
      });
    }
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
    setHidePlus(false);

    setImageUrl(updatedImageUrl);
    if (imageUrl.length === 1) {
      setHideMinus(true);
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
        <div className="bg-white w-full h-full flex-col flex rounded-lg p-3 overflow-auto ">
          <div className="gap-6 pt-4 flex flex-col sm:grid sm:grid-cols-2 sm:gap-10 md:grid-cols-1 md:gap-6 lg:grid-cols-2 lg:gap-6 xl:grid-cols-2 xl:gap-6 2xl:grid-cols-3 2xl:gap-6 ">
            <CustomInputField
              onChange={setName}
              name={"House Name"}
              id={"name"}
            />
            <CustomInputField
              onChange={setRegion}
              name={"Region"}
              id={"region"}
            />
            <CustomInputField
              onChange={setDistrict}
              name={"District"}
              id={"district"}
            />
            <CustomInputField onChange={setWard} name={"Ward"} id={"ward"} />
            <CustomInputField
              onChange={setDescription}
              name={"Desription"}
              id={"description"}
            />
            <CustomInputField onChange={setPrice} name={"Price"} id={"price"} />
            <CustomInputField
              onChange={setStatus}
              name={"Status"}
              id={"status"}
            />
            <div className="flex relative w-full h-auto flex-row place-content-between">
              <div className="w-full">
                <CustomInputField
                  onChange={setImage}
                  name={`${imageUrl.length} image`}
                  id={"image"}
                />
              </div>
              <span className="inset-y-0 flex h-full pl-2 pr-2 items-center">
                <div className="flex flex-col gap-1">
                  <FaPlus
                    className={`cursor-pointer text-light-blue ${
                      hidePlus ? "hidden" : "h-1/2 bg-slate-200 rounded-md"
                    }`}
                    onClick={handleAddImage}
                  />
                  <FaMinus
                    className={`cursor-pointer text-light-blue ${
                      hideMinus ? "hidden" : "h-1/2 bg-slate-200 rounded-md"
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
