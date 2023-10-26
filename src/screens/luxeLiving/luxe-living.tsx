import {
  Container,
  Flex,
  Loader,
  Paper,
  Space,
  Stack,
  Table,
} from "@mantine/core";

import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getUserAccessToken,
  clearUserData,
} from "../../utils/localStorageUtils";
import useFetchBookedHouses from "./functions/fetchBookedHouses";
import Search from "../../globals/components/search";
import { BookedHouseQuery } from "../../generated/graphql";
import LuxeLivingTable from "./components/luxe-living-table";

const LuxeLivingPage: FC = () => {
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useState<string | null>(null);

  // STRING STATES
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    const token = getUserAccessToken();

    if (token) {
      setAccessToken(token);
    }
  }, []);

  const { isLoading, error, data } = useFetchBookedHouses(accessToken ?? "");

  useEffect(() => {
    if (error) {
      if (error.message === "Network request failed") {
        localStorage.setItem("error", "/home");
        navigate("/error", { replace: true });
        window.location.reload();
      } else {
        //@ts-ignore
        const errorMessage = error.response.errors[0].message;

        if (errorMessage === "Unauthorized") {
          clearUserData();
          navigate("/", { replace: true });
        }
      }
    }
  }, [accessToken]);

  //   TABLES
  const rows =
    search.length > 0
      ? data?.myHouse
          .filter(
            (house: BookedHouseQuery["myHouse"][0]) =>
              house.name.toLowerCase().includes(search.toLowerCase()) ||
              house.District.toLowerCase().includes(search.toLowerCase()) ||
              house.Region.toLowerCase().includes(search.toLowerCase()) ||
              house.Ward.toLowerCase().includes(search.toLowerCase()) ||
              house.status.toLowerCase().includes(search.toLowerCase())
          )
          .filter(
            (house: BookedHouseQuery["myHouse"][0]) =>
              house.status === "Booked" &&
              house.contract.find(
                (contract) =>
                  contract.isCurrent === true &&
                  contract.Date_of_contract !== null
              )
          )
          .map((house, index) => (
            <LuxeLivingTable
              key={index}
              house={{
                ...house,
              }}
            />
          ))
      : data?.myHouse
          .filter(
            (house: BookedHouseQuery["myHouse"][0]) =>
              house.status === "Booked" &&
              house.contract.find(
                (contract) =>
                  contract.isCurrent === true &&
                  contract.Date_of_contract !== null
              )
          )
          .map((house, index) => (
            <LuxeLivingTable
              key={index}
              house={{
                ...house,
              }}
            />
          ));

  //   FUNCTIONS

  return (
    <Container size={"xl"}>
      <Space h="md" />

      <Flex direction={"row"} align={"center"} justify={"flex-end"}>
        <Paper>
          <Search
            props={{
              placeholder: "Search house",
              onChange: (value: string) => {
                setSearch(value);
              },
            }}
          />
        </Paper>
      </Flex>

      <Space h="md" />

      <Stack>
        {isLoading && (
          <Flex align={"center"} justify={"center"}>
            <Loader color="blue" type="bars" />
          </Flex>
        )}

        {!isLoading && (
          <Paper p={"md"} shadow="sm" radius={"md"}>
            <Table.ScrollContainer minWidth={1100} p={"md"}>
              <Table verticalSpacing={"xs"}>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>House name</Table.Th>
                    <Table.Th>Region</Table.Th>
                    <Table.Th>District</Table.Th>
                    <Table.Th>Ward</Table.Th>
                    <Table.Th>Tenant</Table.Th>
                    <Table.Th>Start date</Table.Th>
                    <Table.Th>End date</Table.Th>
                    <Table.Th>Remain</Table.Th>
                    <Table.Th>Action</Table.Th>
                  </Table.Tr>
                </Table.Thead>

                <Table.Tbody>{rows}</Table.Tbody>
              </Table>
            </Table.ScrollContainer>
          </Paper>
        )}
      </Stack>
    </Container>
  );
};

export default LuxeLivingPage;
