import { FC, useEffect, useState } from "react";
import {
  Button,
  Container,
  Flex,
  Loader,
  Notification,
  Paper,
  Space,
} from "@mantine/core";
import HouseUI from "../../components/houseUI";
import {
  CreateContractInputMutation,
  GetHousesQuery,
  GetMyHouseQuery,
  UpdateHouseInputMutation,
  useCreateContractInputMutation,
  useCreateHouseInputMutation,
  useGetMyHouseQuery,
  useUpdateHouseInputMutation,
} from "../../generated/graphql";
import graphqlRequestClient from "../../lib/clients/graphqlRequestClient";
import { useQueryClient } from "@tanstack/react-query";
import { GraphQLError } from "graphql";
import {
  clearUserData,
  getUserAccessToken,
  getUserData,
} from "../../utils/localStorageUtils";
import { notifications } from "@mantine/notifications";
import AllHousesUI from "../../global/components/houses";
import ShowNotification from "../../global/components/show-notification";
import {
  MyHouseInfoUpdatedProps,
  OthersHouseInfoContractProps,
} from "../../global/interfaces/type";
import showMessage from "../../global/components/notification";
import UpdateNotification from "../../globals/components/update-notification";
import LoadingNotification from "../../globals/components/load-notification";
import CustomizedNotification from "../../global/components/customized-notification";
import TenantHouseUI from "./components/houses";
import { AccountType } from "../../lib/enums/enum";
import uploadImages from "./components/postHouseImages";
import { useNavigate } from "react-router-dom";
import Search from "../../globals/components/search";
import { color } from "../../lib/color/mantine-color";
import { IconPlus, IconX } from "@tabler/icons-react";
import MyHouse from "./components/all-house";

const House: FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const user = getUserData();

  // STRING STATES
  const [currentView, setCurrentView] = useState<string>("my-house");
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [shouldFetchData, setShouldFetchData] = useState(false);

  const [selectedButton, setSelectedButton] = useState<string>(
    `${user?.login.user.accountType === AccountType.TENANT ? "Others" : "Mine"}`
  );
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
  const [description, setDescription] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<File[] | null>(null);
  const [mineView, setMineView] = useState<boolean>(false);
  const [OthersView, setOthersView] = useState<boolean>(false);

  const [selectedHouse, setSelectedHouse] = useState<
    GetMyHouseQuery["myHouse"][0]
  >({
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
        },
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
            "The house has been added to the database successfully. Congratulations! 🎉",
        });
        return;
      },
      onError: (error: GraphQLError) => {
        //@ts-ignore
        Array.isArray(error.response.errors[0].extensions.originalError.message)
          ? Array(
              //@ts-ignore
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
            id: "update-house",
            message: data.updateHouse,
            title: "Successfully",
          },
          3000
        );
      },
      onError: (error: GraphQLError) => {
        const errorMessage =
          //@ts-ignore
          error.response.errors[0].extensions.originalError.message;
        //@ts-ignore
        const title = error.response.errors[0].message;

        notifications.hide("update-house");
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
        queryClient.invalidateQueries(["houses, demo, myContract"]);

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
          //@ts-ignore
          error.response.errors[0].extensions.originalError.message;
        //@ts-ignore
        const title = error.response.errors[0].message;

        notifications.hide("contract");
        Array.isArray(errorMessage)
          ? showMessage(title, errorMessage)
          : showMessage("Conflict", [`${errorMessage} 😡😡😡`]);
      },
    }
  );

  const handleAddhouse = async () => {
    if (
      name.length === 0 ||
      region.length === 0 ||
      ward.length === 0 ||
      district.length === 0 ||
      description.length === 0
    ) {
      CustomizedNotification({
        title: "Empty Fields",
        message: "All fields are required 😟🫣🥵🥵🥵🥵🥵",
      });
    } else if (price.length === 0) {
      alert("are you sure the price is 0?");
    } else if (
      (imageUrl?.length ?? 0) < 5 ||
      imageUrl === null ||
      imageUrl === undefined
    ) {
      alert("Your are required to upload 5 images");
    } else {
      try {
        const response = await uploadImages(imageUrl, accessToken);
        await createHouseMutate({
          input: {
            name: name,
            Region: region,
            District: district,
            Ward: ward,
            Description: description,
            price: Number(price),
            imgUrl: response,
          },
        });
      } catch (error) {
        console.error("Error uploading files:", error);
      }
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

  const HandleOnSave = async (value: MyHouseInfoUpdatedProps) => {
    LoadingNotification({
      id: "update-house",
      message: "Please wait...",
      title: "Updating",
    });
    await updateHouseMutate({
      input: {
        Description: value.description,
        _id: value._id,
        name: value.name,
        price: Number(value.price),
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
      <ul
        className={`flex gap-3 h-full overscroll-auto overflow-auto ${
          user?.login.user.accountType === AccountType.TENANT
            ? "flex-col w-full sm:grid sm:grid-cols-2 2xl:grid-cols-3"
            : "flex-row "
        }`}
      >
        {filteredInAllHouse.length === 0 && searchLength !== 0 ? (
          <div className="font-sans text-2xl"></div>
        ) : searchLength === 0 ? (
          dataHouses?.houses.map((house, index) =>
            user?.login.user.accountType === AccountType.TENANT ? (
              <li key={index} className="">
                <TenantHouseUI
                  onClick={(value, visible) => {
                    setOthersView(visible);
                    setSelectedOthersHouse(value);
                  }}
                  {...house}
                />
              </li>
            ) : (
              <li key={index} className="">
                <AllHousesUI
                  onClick={(value, visible) => {
                    setOthersView(visible);
                    setSelectedOthersHouse(value);
                  }}
                  {...house}
                />
              </li>
            )
          )
        ) : (
          filteredInAllHouse.map((house, index) =>
            user?.login.user.accountType === AccountType.TENANT ? (
              <li key={index}>
                <TenantHouseUI
                  onClick={(value, visible) => {
                    setOthersView(visible);
                    setSelectedOthersHouse(value);
                  }}
                  {...house}
                />
              </li>
            ) : (
              <li key={index}>
                <AllHousesUI
                  onClick={(value, visible) => {
                    setOthersView(visible);
                    setSelectedOthersHouse(value);
                  }}
                  {...house}
                />
              </li>
            )
          )
        )}
      </ul>
    );
  };

  return (
    <Container fluid>
      

      {currentView === "my-house" && (
        <MyHouse
          onClick={(button: string) => {
            setCurrentView(button);
          }}
        />
      )}
    </Container>
  );
};

export default House;
