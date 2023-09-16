import { FC, useEffect, useState } from "react";
import { Text } from "@mantine/core";
import HouseUI from "../../components/houseUI";
import { FiBell, FiMapPin } from "react-icons/fi";
import ToggleButtonGroup from "../../global/components/toggle-button";
import SearchBar from "../../global/components/search-bar";
import CustomInputField from "../../global/components/input-text";
import CustomButton from "../../components/custom-button";
import colors from "../../lib/color/colors";
import { FaMinus, FaPlus } from "react-icons/fa";
import {
  CreateContractInputMutation,
  GetHousesQuery,
  GetMyHouseQuery,
  MyHouseType,
  UpdateHouseInputMutation,
  useCreateContractInputMutation,
  useCreateHouseInputMutation,
  useGetHousesQuery,
  useGetMyHouseQuery,
  useUpdateHouseInputMutation,
} from "../../generated/graphql";
import graphqlRequestClient from "../../lib/clients/graphqlRequestClient";
import { useQueryClient } from "@tanstack/react-query";
import { GraphQLError } from "graphql";
import {
  clearUserData,
  getUserAccessToken,
} from "../../utils/localStorageUtils";
import { notifications } from "@mantine/notifications";
import { ProgressSpinner } from "primereact/progressspinner";
import AllHousesUI from "../../global/components/houses";
import ShowNotification from "../../global/components/show-notification";
import TextArea from "../../global/components/text-area";
import MyHouseInfo from "./components/my-house-info";
import {
  MyHouseInfoUpdatedProps,
  OthersHouseInfoContractProps,
} from "../../global/interfaces/type";
import showMessage from "../../global/components/notification";
import UpdateNotification from "../../global/components/update-notification";
import LoadingNotification from "../../global/components/load-notification";
import CustomizedNotification from "../../global/components/customized-notification";
import OthersHouseInfo from "./components/othersHouseInfo";

const House: FC = () => {
  const queryClient = useQueryClient();
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [shouldFetchData, setShouldFetchData] = useState(false);

  const [selectedButton, setSelectedButton] = useState<string>("Mine");
  const [filteredHouse, setFilteredHouse] = useState<
    GetMyHouseQuery["myHouse"][0][]
  >([]);
  const [filteredInAllHouse, setFilteredInAllHouse] = useState<
    GetHousesQuery["houses"][0][]
  >([]);
  const [searchLength, setSearchLength] = useState<number>(0);
  const [searchMineLength, setSearchMineLength] = useState<number>(0);
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
  const [mineView, setMineView] = useState<boolean>(false);
  const [OthersView, setOthersView] = useState<boolean>(false);

  const [selectedHouse, setSelectedHouse] = useState<GetMyHouseQuery['myHouse'][0]>({
    _id: "",
    name: "",
    Region: "",
    District: "",
    Ward: "",
    price: 0,
    Description: "",
    status: "",
    imgUrl: [],
    contract: [
      {
        _id: "",
        Duration: 0,
        Total_rent: "",
        Tenant: {
          __typename: "UserType",
          firstName: "",
          gender: "",
          lastname: "",
          middleName: "",
          phoneNumber: "",
          username: "",
        }
      },
    ],
  });

  const [selectedOthersHouse, setSelectedOthersHouse] = useState<
    GetHousesQuery["houses"][0]
  >({
    _id: "",
    name: "",
    Region: "",
    District: "",
    Ward: "",
    Description: "",
    imgUrl: [],
    price: 0,
    status: "",
    user: {
      firstName: "",
      lastname: "",
      middleName: "",
      phoneNumber: "",
      username: "",
      gender: "",
    },
  });

  useEffect(() => {
    const token = getUserAccessToken();

    if (token) {
      setAccessToken(token);
      setShouldFetchData(true);
    }
  }, []);

  const { mutate: createHouseMutate } = useCreateHouseInputMutation(
    graphqlRequestClient.setHeaders({ Authorization: `Bearer ${accessToken}` }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["getMyHouse"]);
        ShowNotification({
          title: "House Added Successfully 🏡",
          message:
            " The house has been added to the database successfully. Congratulations! 🎉",
        });
        return;
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

  const { mutate: updateHouseMutate } = useUpdateHouseInputMutation(
    graphqlRequestClient.setHeaders({ Authorization: `Bearer ${accessToken}` }),
    {
      onSuccess: (data: UpdateHouseInputMutation) => {
        queryClient.invalidateQueries(["getMyHouse"]);
        UpdateNotification(
          {
            id: "update",
            message: data.updateHouse,
            title: "Successfully",
          },
          3000
        );
      },
      onError: (error: GraphQLError) => {
        const errorMessage =
          error.response.errors[0].extensions.originalError.message;
        const title = error.response.errors[0].message;

        notifications.hide("update");
        Array.isArray(errorMessage)
          ? showMessage(title, errorMessage)
          : showMessage("Conflict", [`${errorMessage} 😡😡😡`]);
      },
    }
  );

  const { mutate: createContractMutate } = useCreateContractInputMutation(
    graphqlRequestClient.setHeaders({ Authorization: `Bearer ${accessToken}` }),
    {
      onSuccess: (data: CreateContractInputMutation) => {
        UpdateNotification(
          {
            id: "contract",
            message: data.createContract._id,
            title: "Successfully",
          },
          3000
        );
      },
      onError: (error: GraphQLError) => {
        const errorMessage =
          error.response.errors[0].extensions.originalError.message;
        const title = error.response.errors[0].message;

        notifications.hide("contract");
        Array.isArray(errorMessage)
          ? showMessage(title, errorMessage)
          : showMessage("Conflict", [`${errorMessage} 😡😡😡`]);
      },
    }
  );

  const {
    isLoading: isLoadingMyHouse,
    error: errorMyHouse,
    data: dataMyHouse,
  } = useGetMyHouseQuery<GetMyHouseQuery, Error>(
    graphqlRequestClient.setHeaders({ Authorization: `Bearer ${accessToken}` }),
    {},
    {
      enabled: shouldFetchData,
    }
  );

  const {
    isLoading: isLoadingHouses,
    error: errorHouses,
    data: dataHouses,
  } = useGetHousesQuery<GetHousesQuery, Error>(
    graphqlRequestClient.setHeaders({ Authorization: `Bearer ${accessToken}` }),
    {},
    {
      enabled: shouldFetchData,
    }
  );

  useEffect(() => {
    if (dataMyHouse) {
      setShouldFetchData(false);
    }
  }, [dataMyHouse]);

  if (errorMyHouse || errorHouses) {
    const errorMessage =
      errorMyHouse !== null
        ? errorMyHouse.response.errors[0].message
        : errorHouses !== null
        ? errorHouses.response.errors[0].message
        : "Unknow error occured";

    if (errorMessage === "Unauthorized") {
      clearUserData();
    }
  }

  const handleAddhouse = async () => {
    if (
      name.length === 0 ||
      region.length === 0 ||
      ward.length === 0 ||
      district.length === 0 ||
      status.length === 0 ||
      description.length === 0
    ) {
      CustomizedNotification({
        title: "Empty Fields",
        message: "All fields are required 😟🫣🥵🥵🥵🥵🥵",
      });
    } else if (price.length === 0) {
      alert("are you sure the price is 0?");
    } else if (imageUrl.length !== 5) {
      alert("Your are required to upload 5 images");
    } else {
      await createHouseMutate({
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

    if (dataHouses) {
      const filtered: GetHousesQuery["houses"][0][] = dataHouses.houses.filter(
        (house: GetHousesQuery["houses"][0]) =>
          house.name.toLowerCase().includes(search.toLowerCase()) ||
          house.District.toLowerCase().includes(search.toLowerCase()) ||
          house.Region.toLowerCase().includes(search.toLowerCase()) ||
          house.Ward.toLowerCase().includes(search.toLowerCase()) ||
          house.status.toLowerCase().includes(search.toLowerCase())
      );

      setFilteredInAllHouse(filtered);
    } else {
      setFilteredInAllHouse([]);
    }
  };

  const handleSearchInMyHouse = (search: string) => {
    setSearchMineLength(search.length);

    if (dataMyHouse) {
      const filtered: GetMyHouseQuery["myHouse"][0][] =
        dataMyHouse.myHouse.filter(
          (house: GetMyHouseQuery["myHouse"][0]) =>
            house.name.toLowerCase().includes(search.toLowerCase()) ||
            house.District.toLowerCase().includes(search.toLowerCase()) ||
            house.Region.toLowerCase().includes(search.toLowerCase()) ||
            house.Ward.toLowerCase().includes(search.toLowerCase()) ||
            house.status.toLowerCase().includes(search.toLowerCase())
        );

      setFilteredHouse(filtered);
    } else {
      setFilteredHouse([]);
    }
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

  const HandleOnSave = async (value: MyHouseInfoUpdatedProps) => {
    LoadingNotification({
      id: notificationId,
      message: "Please wait...",
      title: "Updating",
    });
    await updateHouseMutate({
      input: {
        Description: value.description,
        _id: value._id,
        name: value.name,
        price: Number(value.price),
        status: value.status,
      },
    });
  };

  const handleOnSubmitContract = async (
    value: MyHouseInfoUpdatedProps,
    contract: OthersHouseInfoContractProps
  ) => {
    LoadingNotification({
      id: "contract",
      message: "Please wait...",
      title: "Updating",
    });
    await createContractMutate({
      input: {
        Duration: contract.Duration,
        House: value._id,
        Total_rent: String(contract.totTotal_rent),
      },
    });
  };

  const renderMyHouses = () => {
    return (
      <ul className="flex flex-row gap-3 h-full overscroll-auto overflow-auto ">
        {filteredHouse.length === 0 && searchMineLength !== 0 ? (
          <div className="font-sans text-2xl"></div>
        ) : searchMineLength === 0 ? (
          dataMyHouse?.myHouse.map((house, index) => (
            <li key={index}>
              <HouseUI
                onClick={(value, visible) => {
                  setMineView(visible);
                  setSelectedHouse(value);
                }}
                {...house}
              />
            </li>
          ))
        ) : (
          filteredHouse.map((house, index) => (
            <li key={index}>
              <HouseUI
                onClick={(value, visible) => {
                  setMineView(visible);
                  setSelectedHouse(value);
                }}
                {...house}
              />
            </li>
          ))
        )}
      </ul>
    );
  };

  const renderHouses = () => {
    return (
      <ul className="flex flex-row gap-3 h-full overscroll-auto overflow-auto ">
        {filteredInAllHouse.length === 0 && searchLength !== 0 ? (
          <div className="font-sans text-2xl"></div>
        ) : searchLength === 0 ? (
          dataHouses?.houses.map((house, index) => (
            <li key={index}>
              <AllHousesUI
                onClick={(value, visible) => {
                  setOthersView(visible);
                  setSelectedOthersHouse(value);
                }}
                {...house}
              />
            </li>
          ))
        ) : (
          filteredInAllHouse.map((house, index) => (
            <li key={index}>
              <AllHousesUI
                onClick={(value, visible) => {
                  setOthersView(visible);
                  setSelectedOthersHouse(value);
                }}
                {...house}
              />
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
              selectedButton === "Mine" ? handleSearchInMyHouse : handleSearch
            }
          />
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
      {/*OWNER HOUSES SECTION*/}
      <div
        className={`w-full overflow-auto text-sm gap-2 flex flex-col h-full ${
          selectedButton === "Mine" && !mineView ? "" : "hidden"
        }`}
      >
        <div className="flex flex-row place-content-between gap-2">
          <Text className="font-semibold font-serif">My Houses</Text>
          <Text className="font-sans text-blue-600">Seen More</Text>
        </div>
        <div className="w-full h-4/6 flex-row sm:h-3/6 md:h-3/6 lg:h-3/6">
          <div
            className={`card justify-center items-center flex ${
              isLoadingMyHouse === false ? "hidden" : ""
            }`}
          >
            {isLoadingMyHouse && (
              <ProgressSpinner
                style={{ width: "50px", height: "50px" }}
                strokeWidth="5"
                fill="var(--surface-ground)"
                animationDuration=".5s"
              />
            )}
          </div>
          {renderMyHouses()}
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
              disabled={false}
              value={""}
            />
            <CustomInputField
              onChange={setRegion}
              name={"Region"}
              id={"region"}
              disabled={false}
              value={""}
            />
            <CustomInputField
              onChange={setDistrict}
              name={"District"}
              id={"district"}
              disabled={false}
              value={""}
            />
            <CustomInputField
              onChange={setWard}
              name={"Ward"}
              id={"ward"}
              disabled={false}
              value={""}
            />

            <CustomInputField
              onChange={setPrice}
              name={"Price"}
              id={"price"}
              disabled={false}
              value={""}
            />
            <CustomInputField
              onChange={setStatus}
              name={"Status"}
              id={"status"}
              disabled={false}
              value={""}
            />

            <TextArea
              onChange={setDescription}
              name={"Desription"}
              id={"description"}
              disabled={false}
              value={""}
            />
            <div className="flex relative w-full h-auto flex-row place-content-between">
              <div className="w-full">
                <CustomInputField
                  onChange={setImage}
                  name={`${imageUrl.length} image`}
                  id={"image"}
                  disabled={false}
                  value={""}
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
      {/*OTHHER HOUSES SECTION*/}
      <div
        className={`w-full overflow-auto text-sm gap-2 flex flex-col h-full ${
          selectedButton === "Others" && !OthersView ? "" : "hidden"
        }`}
      >
        <div className="flex flex-row place-content-between gap-2">
          <Text className="font-semibold font-serif">All Houses</Text>
          <Text className="font-sans text-blue-600">Seen More</Text>
        </div>
        <div className="w-full h-2/6 flex-row">
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
          {renderHouses()}
        </div>
        <div className="flex flex-row place-content-between gap-2">
          <Text className="font-semibold font-serif ">
            Find the nearest of you
          </Text>
          <Text className="font-sans text-blue-600 flex flex-row gap-3">
            <FiMapPin /> Kinondoni
          </Text>
        </div>
      </div>
      {/*EDITING PAGE*/}
      <div
        className={`w-full overflow-auto text-sm gap-2 flex flex-col h-full ${
          selectedButton === "Mine" && mineView ? "" : "hidden"
        }`}
      >
        <MyHouseInfo
          onClickBack={setMineView}
          house={selectedHouse}
          onChange={HandleOnSave}
        />
      </div>
      {/*VIEW OTHERS HOUSE PAGE*/}
      <div
        className={`w-full overflow-auto text-sm gap-2 flex flex-col h-full ${
          selectedButton === "Others" && OthersView ? "" : "hidden"
        }`}
      >
        <OthersHouseInfo
          onClickBack={setOthersView}
          house={selectedOthersHouse}
          onChange={handleOnSubmitContract}
        />
      </div>
    </div>
  );
};

export default House;
