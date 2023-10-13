import { FC, useEffect, useState } from "react";
import {
  GetMyHouseQuery,
  useGetMyHouseQuery,
} from "../../../generated/graphql";
import {
  Button,
  Container,
  Flex,
  Loader,
  Modal,
  Notification,
  Paper,
  Space,
  Table,
  Tabs,
  Text,
  Title,
  rem,
} from "@mantine/core";
import { useQueryClient } from "@tanstack/react-query";
import graphqlRequestClient from "../../../lib/clients/graphqlRequestClient";
import {
  clearUserData,
  getUserAccessToken,
} from "../../../utils/localStorageUtils";
import { useNavigate } from "react-router-dom";
import { IconClock, IconHome, IconPlus, IconX } from "@tabler/icons-react";
import { color } from "../../../lib/color/mantine-color";
import Search from "../../../globals/components/search";
import HouseTable from "./house-table";
import { useDisclosure } from "@mantine/hooks";
import NewHouseForm from "./new-house-form";

type HouseTableProps = {
  onClick: (button: string) => void;
};

const MyHouse: FC<HouseTableProps> = ({ onClick }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // STRING STATES
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [clickedButton, setClickedButton] = useState<string>("");

  //NUMBER STATES
  const [searchLength, setSearchLength] = useState<number>(0);

  //BOOLEAN STATES
  const [showModal, setShowModal] = useState<boolean>(false);
  const [opened, { open, close }] = useDisclosure(false);

  // GRAPHQL STATES
  const [filteredHouse, setFilteredHouse] = useState<
    GetMyHouseQuery["myHouse"][0][]
  >([]);

  const {
    isLoading: isLoadingMyHouse,
    error: errorMyHouse,
    data: dataMyHouse,
  } = useGetMyHouseQuery<GetMyHouseQuery, Error>(
    graphqlRequestClient.setHeaders({ Authorization: `Bearer ${accessToken}` }),
    {}
  );

  // USE EFFECTS
  useEffect(() => {
    const token = getUserAccessToken();

    if (token) {
      setAccessToken(token);
    }
  }, []);

  // SELECTIONS
  if (errorMyHouse) {
    if (errorMyHouse.message === "Network request failed") {
      localStorage.setItem("error", "/home");
      navigate("/error", { replace: true });
      window.location.reload();
    } else {
      //@ts-ignore
      const errorMessage = errorMyHouse.response.errors[0].message;

      if (errorMessage === "Unauthorized") {
        clearUserData();
        navigate("/", { replace: true });
      }
    }
  }

  // TABLE ROWS
  const rows =
    filteredHouse.length !== 0 && searchLength > 0
      ? filteredHouse.map((house) => {
          return (
            <HouseTable
              props={{
                ...house,
              }}
              onClick={(
                button: string,
                house: {
                  __typename?: "MyHouseType" | undefined;
                  _id: string;
                  name: string;
                  Region: string;
                  District: string;
                  Ward: string;
                  price: number;
                  Description: string;
                  status: string;
                  imgUrl: string[];
                  contract: {
                    __typename?: "ContractType" | undefined;
                    _id: string;
                    Duration: number;
                    Total_rent: string;
                    Tenant: {
                      __typename?: "UserType" | undefined;
                      firstName: string;
                      gender: string;
                      lastname: string;
                      middleName: string;
                      phoneNumber: string;
                      username: string;
                    };
                  }[];
                }
              ) => {
                throw new Error("Function not implemented.");
              }}
            />
          );
        })
      : filteredHouse.length === 0 && searchLength > 0
      ? ""
      : dataMyHouse?.myHouse.map((house) => {
          return (
            <HouseTable
              props={{
                ...house,
              }}
              onClick={(
                button: string,
                house: GetMyHouseQuery["myHouse"][0]
              ) => {
                throw new Error("Function not implemented.");
              }}
            />
          );
        });

  const occupied =
    filteredHouse.length !== 0 && searchLength > 0
      ? filteredHouse
          .filter((hs: GetMyHouseQuery["myHouse"][0]) => hs.status === "Booked")
          .map((house) => {
            return (
              <HouseTable
                props={{
                  ...house,
                }}
                onClick={(
                  button: string,
                  house: GetMyHouseQuery["myHouse"][0]
                ) => {
                  throw new Error("Function not implemented.");
                }}
              />
            );
          })
      : filteredHouse.length === 0 && searchLength > 0
      ? ""
      : dataMyHouse?.myHouse
          .filter((hs: GetMyHouseQuery["myHouse"][0]) => hs.status === "Booked")
          .map((house) => {
            return (
              <HouseTable
                props={{
                  ...house,
                }}
                onClick={(
                  button: string,
                  house: GetMyHouseQuery["myHouse"][0]
                ) => {
                  throw new Error("Function not implemented.");
                }}
              />
            );
          });

  // STYLES
  const iconStyle = { width: rem(12), height: rem(12) };

  //FUNCTIONS
  const handleSearch = (search: string) => {
    setSearchLength(search.length);

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
  return (
    <>
      {showModal && (
        <Modal
          opened={opened}
          onClose={() => {
            close();
            setShowModal(false);
          }}
          title={clickedButton === "new" ? "New House" : ""}
          transitionProps={{
            transition: "fade",
            duration: 600,
            timingFunction: "linear",
          }}
        >
          {clickedButton === "new" ? (
            <NewHouseForm
              onClick={() => {
                setShowModal(false);
                close();
              }}
            />
          ) : (
            ""
          )}
        </Modal>
      )}
      <Paper bg={`${color.gray_light_color}`} p={"md"} mt={"md"} radius={"md"}>
        <Flex
          direction={"row"}
          align={"center"}
          justify={"space-between"}
          gap={"md"}
        >
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
          <Button
            leftSection={<IconPlus />}
            onClick={() => {
              setClickedButton("new");
              setShowModal(true);
              open();
            }}
          >
            New House
          </Button>
        </Flex>
      </Paper>

      <Space h="md" />

      <Tabs defaultValue={"all"}>
        <Tabs.List>
          <Tabs.Tab value="all" leftSection={<IconHome style={iconStyle} />}>
            House
          </Tabs.Tab>

          <Tabs.Tab
            value="occupied"
            leftSection={<IconClock style={iconStyle} />}
          >
            Occupied
          </Tabs.Tab>
        </Tabs.List>

        <Space h="md" />

        <Tabs.Panel value="all">
          {isLoadingMyHouse && (
            <Flex align={"center"} justify={"center"}>
              <Loader color="blue" type="bars" />
            </Flex>
          )}
          {errorMyHouse && (
            <Flex align={"center"} justify={"center"}>
              <Notification icon={<IconX />} color="red" title="Oops!">
                {
                  //@ts-ignore
                  error.response.errors[0].message
                }
              </Notification>
            </Flex>
          )}

          {/* TABLE */}
          {!isLoadingMyHouse && (
            <Table.ScrollContainer
              minWidth={900}
              bg={`${color.gray_light_color}`}
              p={"md"}
            >
              <Table verticalSpacing={"xs"}>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>House name</Table.Th>
                    <Table.Th>Region</Table.Th>
                    <Table.Th>District</Table.Th>
                    <Table.Th>Ward</Table.Th>
                    <Table.Th>Price</Table.Th>
                    <Table.Th>Status</Table.Th>
                    <Table.Th>Contracts</Table.Th>
                    <Table.Th>Action</Table.Th>
                  </Table.Tr>
                </Table.Thead>

                <Table.Tbody>{rows}</Table.Tbody>
              </Table>
            </Table.ScrollContainer>
          )}
        </Tabs.Panel>

        <Tabs.Panel value="occupied">
          {isLoadingMyHouse && (
            <Flex align={"center"} justify={"center"}>
              <Loader color="blue" type="bars" />
            </Flex>
          )}
          {errorMyHouse && (
            <Flex align={"center"} justify={"center"}>
              <Notification icon={<IconX />} color="red" title="Oops!">
                {
                  //@ts-ignore
                  error.response.errors[0].message
                }
              </Notification>
            </Flex>
          )}

          {/* TABLE */}
          {!isLoadingMyHouse && (
            <Table.ScrollContainer
              minWidth={900}
              bg={`${color.gray_light_color}`}
              p={"md"}
            >
              <Table verticalSpacing={"xs"}>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>House name</Table.Th>
                    <Table.Th>Region</Table.Th>
                    <Table.Th>District</Table.Th>
                    <Table.Th>Ward</Table.Th>
                    <Table.Th>Price</Table.Th>
                    <Table.Th>Status</Table.Th>
                    <Table.Th>Contracts</Table.Th>
                    <Table.Th>Action</Table.Th>
                  </Table.Tr>
                </Table.Thead>

                <Table.Tbody>{occupied}</Table.Tbody>
              </Table>
            </Table.ScrollContainer>
          )}
        </Tabs.Panel>
      </Tabs>

      <Space h="md" />
    </>
  );
};

export default MyHouse;
