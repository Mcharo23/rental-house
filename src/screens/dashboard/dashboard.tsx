import { FC, useEffect, useState } from "react";
import { Text } from "@mantine/core";
import { FiBell, FiMapPin } from "react-icons/fi";
import ToggleButtonGroup from "../../global/components/toggle-button";
import SearchBar from "../../global/components/search-bar";
import AllHousesUI from "../../global/components/houses";
import {
  CreateContractInputMutation,
  GetHousesQuery,
  useCreateContractInputMutation,
  useGetHousesQuery,
} from "../../generated/graphql";
import graphqlRequestClient from "../../lib/clients/graphqlRequestClient";
import {
  clearUserData,
  getUserAccessToken,
} from "../../utils/localStorageUtils";
import { ProgressSpinner } from "primereact/progressspinner";
import OthersHouseInfo from "../house/components/othersHouseInfo";
import {
  MyHouseInfoUpdatedProps,
  OthersHouseInfoContractProps,
} from "../../global/interfaces/type";
import { notifications } from "@mantine/notifications";
import { GraphQLError } from "graphql";
import LoadingNotification from "../../global/components/load-notification";
import showMessage from "../../global/components/notification";
import UpdateNotification from "../../global/components/update-notification";

const Dashboard: FC = () => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [shouldFetchData, setShouldFetchData] = useState(false);
  const [selectedButton, setSelectedButton] = useState<string>("Owner");
  const [detailView, setDetailView] = useState<boolean>(false);
  const [filteredInAllHouse, setFilteredInAllHouse] = useState<
    GetHousesQuery["houses"][0][]
  >([]);
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
    },
  });
  const [searchLength, setSearchLength] = useState<number>(0);

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
  } = useGetHousesQuery<GetHousesQuery, Error>(
    graphqlRequestClient.setHeaders({ Authorization: `Bearer ${accessToken}` }),
    {},
    {
      enabled: shouldFetchData,
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

  useEffect(() => {
    if (dataHouses) {
      setShouldFetchData(false);
    }
  }, [dataHouses]);

  if (errorHouses) {
    const errorMessage = errorHouses.response.errors[0].message;

    if (errorMessage === "Unauthorized") {
      clearUserData();
    }
  }

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
                  setDetailView(visible);
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
                  setDetailView(visible);
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
      <div
        className={`w-full overflow-auto flex flex-col h-full text-lg ${
          detailView === false ? "" : "hidden"
        }`}
      >
        <div className="flex flex-row place-content-between gap-2">
          <Text className="font-semibold font-serif">Popular of the week</Text>
          <Text className="font-sans text-blue-600">Seen More</Text>
        </div>
        <div className="w-full h-2/6 flex-row">
          <div
            className={`card justify-center items-center flex ${
              isLoadingHouses === false ? "hidden" : ""
            }`}
          >
            {isLoadingHouses === false
              ? "hidden"
              : "" && (
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
        <div className="flex flex-row place-content-between mt-5 gap-2">
          <Text className="font-semibold font-serif ">
            Find the nearest of you
          </Text>
          <Text className="font-sans text-blue-600 flex flex-row gap-3">
            <FiMapPin /> Kinondoni
          </Text>
        </div>
      </div>
      {/*detail page*/}
      <div
        className={`w-full overflow-auto text-sm gap-2 flex flex-col h-full ${
          detailView === true ? "" : "hidden"
        }`}
      >
        <OthersHouseInfo
          onClickBack={setDetailView}
          house={selectedOthersHouse}
          onChange={handleOnSubmitContract}
        />
      </div>
    </div>
  );
};

export default Dashboard;
