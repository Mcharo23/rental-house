import {
  Container,
  Flex,
  Loader,
  Notification,
  Paper,
  Space,
  Table,
  Tabs,
} from "@mantine/core";
import { FC, useEffect, useState } from "react";
import { color } from "../../lib/color/mantine-color";
import Search from "../../globals/components/search";
import { BookedHouseQuery } from "../../generated/graphql";
import { useNavigate } from "react-router-dom";
import { getUserAccessToken } from "../../utils/localStorageUtils";
import useFetchBookedHouses from "./functions/useFetchBookedHouses";
import { IconX } from "@tabler/icons-react";
import PendingSignatureTable from "./components/pending-signature-table";
import AwaitingTenantMoveInTable from "./components/awaiting-tenant-move-in";

const PendingNest: FC = () => {
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useState<string | null>(null);

  // USE EFFECTS
  useEffect(() => {
    const token = getUserAccessToken();
    if (token) {
      setAccessToken(token);
    }
  }, []);

  // NUMBER STATES
  const [searchLength, setSearchLength] = useState<number>(0);

  // GRAPHQL STATES
  const [pendingHouse, setPendingHouse] = useState<
    BookedHouseQuery["myHouse"][0][]
  >([]);

  const { isLoading, error, data } = useFetchBookedHouses(accessToken ?? "");

  useEffect(() => {
    if (error) {
      if (error.message === "Network request failed") {
        localStorage.setItem("error", "/home");
        navigate("/error", { replace: true });
        window.location.reload();
      } else {
        //@ts-ignore
        const errorMessage = errorHouses.response.errors[0].message;

        if (errorMessage === "Unauthorized") {
          navigate("/", { replace: true });
        }
      }
    }
  }, [accessToken]);

  // METHODS
  const handleSearch = (search: string) => {
    setSearchLength(search.length);

    if (data) {
      const filtered: BookedHouseQuery["myHouse"][0][] = data.myHouse.filter(
        (house: BookedHouseQuery["myHouse"][0]) =>
          house.name.toLowerCase().includes(search.toLowerCase()) ||
          house.District.toLowerCase().includes(search.toLowerCase()) ||
          house.Region.toLowerCase().includes(search.toLowerCase()) ||
          house.Ward.toLowerCase().includes(search.toLowerCase()) ||
          house.status.toLowerCase().includes(search.toLowerCase())
      );

      setPendingHouse(filtered);
    } else {
      setPendingHouse([]);
    }
  };

  // ROWS
  const pending_signature =
    pendingHouse.length !== 0 && searchLength > 0
      ? pendingHouse.map((house) => {
          return <PendingSignatureTable props={{ ...house }} />;
        })
      : pendingHouse.length === 0 && searchLength > 0
      ? ""
      : data?.myHouse
          .filter(
            (house: BookedHouseQuery["myHouse"][0]) =>
              house.status === "Pending"
          )
          .map((pending) => {
            return (
              <PendingSignatureTable
                props={{
                  ...pending,
                }}
              />
            );
          });

  const pending_move_in =
    pendingHouse.length !== 0 && searchLength > 0
      ? pendingHouse.map((house) => {
          return <AwaitingTenantMoveInTable props={{ ...house }} />;
        })
      : pendingHouse.length === 0 && searchLength > 0
      ? ""
      : data?.myHouse
          .filter(
            (house: BookedHouseQuery["myHouse"][0]) =>
              house.status === "Booked" &&
              house.contract.some(
                (contract) => contract.Date_of_contract === null
              )
          )
          .map((pending) => {
            return (
              <AwaitingTenantMoveInTable
                props={{
                  ...pending,
                }}
              />
            );
          });

  return (
    <Container size={"xl"}>
      <Space h={"md"} />

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

      <Space h={"md"} />

      <Tabs color={`${color.blue_light_filled}`} defaultValue="first">
        <Tabs.List justify="center">
          <Tabs.Tab value="first">Pending Signatures</Tabs.Tab>
          <Tabs.Tab value="second">Awaiting Tenant Move-In</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="first" pt="xs">
          <Space h="md" />

          {isLoading && (
            <Flex align={"center"} justify={"center"}>
              <Loader color="blue" type="bars" />
            </Flex>
          )}
          {error && (
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
          {!isLoading && (
            <Paper p={"md"} shadow="sm" radius={"md"}>
              <Table.ScrollContainer minWidth={1200} p={"md"}>
                <Table verticalSpacing={"xs"}>
                  <Table.Thead bg={`${color.blue_light_color}`}>
                    <Table.Tr>
                      <Table.Th>House name</Table.Th>
                      <Table.Th>Region</Table.Th>
                      <Table.Th>District</Table.Th>
                      <Table.Th>Ward</Table.Th>
                      <Table.Th>Requesting tenant</Table.Th>
                      <Table.Th>Created at</Table.Th>
                      <Table.Th>days</Table.Th>
                      <Table.Th>Contract action</Table.Th>
                    </Table.Tr>
                  </Table.Thead>

                  <Table.Tbody>{pending_signature}</Table.Tbody>
                </Table>
              </Table.ScrollContainer>
            </Paper>
          )}
        </Tabs.Panel>

        <Tabs.Panel value="second" pt="xs">
          <Space h="md" />

          {isLoading && (
            <Flex align={"center"} justify={"center"}>
              <Loader color="blue" type="bars" />
            </Flex>
          )}
          {error && (
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
          {!isLoading && (
            <Paper p={"md"} shadow="sm" radius={"md"}>
              <Table.ScrollContainer minWidth={1300} p={"md"}>
                <Table verticalSpacing={"xs"}>
                  <Table.Thead bg={`${color.blue_light_color}`}>
                    <Table.Tr>
                      <Table.Th>House name</Table.Th>
                      <Table.Th>Region</Table.Th>
                      <Table.Th>District</Table.Th>
                      <Table.Th>Ward</Table.Th>
                      <Table.Th>Requesting tenant</Table.Th>
                      <Table.Th>Created at</Table.Th>
                      <Table.Th>Signed on</Table.Th>
                      <Table.Th>days</Table.Th>
                      <Table.Th>Move in</Table.Th>
                    </Table.Tr>
                  </Table.Thead>

                  <Table.Tbody>{pending_move_in}</Table.Tbody>
                </Table>
              </Table.ScrollContainer>
            </Paper>
          )}
        </Tabs.Panel>
      </Tabs>
    </Container>
  );
};

export default PendingNest;
