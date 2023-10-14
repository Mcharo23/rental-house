import { FC, useEffect, useState } from "react";
import {
  Container,
  Flex,
  Grid,
  Loader,
  Notification,
  Paper,
  Space,
  Title,
} from "@mantine/core";
import { GetHousesQuery } from "../../generated/graphql";
import {
  clearUserData,
  getUserAccessToken,
} from "../../utils/localStorageUtils";
import useFetchHouses from "./components/fetchHouses";
import Search from "../../globals/components/search";
import { color } from "../../lib/color/mantine-color";
import { IconX } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import HouseCardUi from "../../globals/components/house-card";

const Dashboard: FC = () => {
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [filteredInAllHouse, setFilteredInAllHouse] = useState<
    GetHousesQuery["houses"][0][]
  >([]);

  const [searchLength, setSearchLength] = useState<number>(0);

  useEffect(() => {
    const token = getUserAccessToken();
    if (token) {
      setAccessToken(token);
    }
  }, []);

  const {
    isLoading: isLoadingHouses,
    error: errorHouses,
    data: dataHouses,
  } = useFetchHouses(accessToken ?? "");

  // const { mutate: createContractMutate } = useCreateContractInputMutation(
  //   graphqlRequestClient.setHeaders({ Authorization: `Bearer ${accessToken}` }),
  //   {
  //     onSuccess: (data: CreateContractInputMutation) => {
  //       UpdateNotification(
  //         {
  //           id: "contract",
  //           message: data.createContract._id,
  //           title: "Successfully",
  //         },
  //         3000
  //       );
  //     },
  //     onError: (error: GraphQLError) => {
  //       const errorMessage =
  //         //@ts-ignore
  //         error.response.errors[0].extensions.originalError.message;
  //       //@ts-ignore
  //       const title = error.response.errors[0].message;

  //       notifications.hide("contract");
  //       Array.isArray(errorMessage)
  //         ? showMessage(title, errorMessage)
  //         : showMessage("Conflict", [`${errorMessage} 😡😡😡`]);
  //     },
  //   }
  // );

  useEffect(() => {
    if (errorHouses) {
      if (errorHouses.message === "Network request failed") {
        localStorage.setItem("error", "/home");
        navigate("/error", { replace: true });
        window.location.reload();
      } else {
        //@ts-ignore
        const errorMessage = errorHouses.response.errors[0].message;

        if (errorMessage === "Unauthorized") {
          clearUserData();
          navigate("/", { replace: true });
        }
      }
    }
  }, [accessToken]);

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

  // const handleOnSubmitContract = async (
  //   value: MyHouseInfoUpdatedProps,
  //   contract: OthersHouseInfoContractProps
  // ) => {
  //   LoadingNotification({
  //     id: "contract",
  //     message: "Please wait...",
  //     title: "Updating",
  //   });
  //   await createContractMutate({
  //     input: {
  //       Duration: contract.Duration,
  //       House: value._id,
  //       Total_rent: String(contract.totTotal_rent),
  //     },
  //   });
  // };

  // const renderHouses = () => {
  //   return (
  //     <ul className="flex flex-row gap-3 h-full overscroll-auto overflow-auto ">
  //       {filteredInAllHouse.length === 0 && searchLength !== 0 ? (
  //         <div className="font-sans text-2xl"></div>
  //       ) : searchLength === 0 ? (
  //         dataHouses?.houses.map((house, index) => (
  //           <li key={index}>
  //             <AllHousesUI
  //               onClick={(value, visible) => {
  //                 setDetailView(visible);
  //                 setSelectedOthersHouse(value);
  //               }}
  //               {...house}
  //             />
  //           </li>
  //         ))
  //       ) : (
  //         filteredInAllHouse.map((house, index) => (
  //           <li key={index}>
  //             <AllHousesUI
  //               onClick={(value, visible) => {
  //                 setDetailView(visible);
  //                 setSelectedOthersHouse(value);
  //               }}
  //               {...house}
  //             />
  //           </li>
  //         ))
  //       )}
  //     </ul>
  //   );
  // };

  return (
    <Container fluid>
      <Paper bg={`${color.gray_light_color}`} p={"md"} mt={"md"} radius={"md"}>
        <Flex direction={"row"} align={"center"} justify={"flex-end"}>
          <Paper>
            <Search
              props={{
                placeholder: "Search house",
                onChange: (value: string) => {
                  handleSearch(value);
                },
              }}
            />
          </Paper>
        </Flex>
      </Paper>

      <Space h="md" />

      {isLoadingHouses && (
        <Flex align={"center"} justify={"center"}>
          <Loader color="blue" type="bars" />
        </Flex>
      )}
      {errorHouses && (
        <Flex align={"center"} justify={"center"}>
          <Notification icon={<IconX />} color="red" title="Oops!">
            {
              //@ts-ignore
              error.response.errors[0].message
            }
          </Notification>
        </Flex>
      )}

      {isLoadingHouses === false && <Title order={2}>General</Title>}

      <Space h="md" />

      <Grid gutter="sm" justify="flex-start" align="flex-start">
        {filteredInAllHouse.length !== 0 && searchLength > 0 ? (
          filteredInAllHouse.map((house) => (
            <Grid.Col
              span={{ base: 12, sm: 12, md: 6, lg: 5, xl: 4 }}
              key={house._id}
            >
              <HouseCardUi props={{ ...house }} />
            </Grid.Col>
          ))
        ) : filteredInAllHouse.length === 0 && searchLength !== 0 ? (
          <Container>
            <Notification icon={<IconX />} color="red" title="Oops!">
              No such house
            </Notification>
          </Container>
        ) : (
          dataHouses?.houses.map((house) => (
            <Grid.Col
              span={{ base: 12, sm: 12, md: 6, lg: 5, xl: 4 }}
              key={house._id}
            >
              <HouseCardUi props={{ ...house }} />
            </Grid.Col>
          ))
        )}
      </Grid>

      <Space h={"xl"} />
    </Container>
  );
};
export default Dashboard;
