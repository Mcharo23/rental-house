import {
  Container,
  Flex,
  Loader,
  Paper,
  Space,
  Stack,
  Table,
  Tabs,
  rem,
} from "@mantine/core";
import { IconHeart, IconCurrentLocation } from "@tabler/icons-react";
import { FC, useEffect, useState } from "react";
import Search from "../../global/components/search";
import { useNavigate } from "react-router-dom";
import useFetchMyContracts from "./functions/myContract";
import { MyContractQuery } from "../../generated/graphql";
import {
  clearUserData,
  getUserAccessToken,
} from "../../utils/localStorageUtils";
import CurrentContractTable from "./components/current-contract-table";
import FavouriteHouseTable from "./components/favourite-house-table";
import { color } from "../../lib/color/mantine-color";

const TenantLiving: FC = () => {
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

  const {
    isLoading: isLoadingContracts,
    error: contractError,
    data: contractData,
  } = useFetchMyContracts(accessToken ?? "");

  useEffect(() => {
    if (contractError) {
      if (contractError.message === "Network request failed") {
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

  //   ROWS
  const current_rows =
    search.length > 0
      ? contractData?.myContract
          .filter(
            (contract: MyContractQuery["myContract"][0]) =>
              contract.House.name
                .toLowerCase()
                .includes(search.toLowerCase()) ||
              contract.House.District.toLowerCase().includes(
                search.toLowerCase()
              ) ||
              contract.House.Region.toLowerCase().includes(
                search.toLowerCase()
              ) ||
              contract.House.Ward.toLowerCase().includes(
                search.toLowerCase()
              ) ||
              contract.Total_rent.toLowerCase().includes(search.toLowerCase())
          )
          .filter(
            (contract: MyContractQuery["myContract"][0]) =>
              contract.isCurrent === true
          )
          .map((contract, index) => {
            return (
              <CurrentContractTable
                key={index}
                props={{
                  ...contract,
                }}
              />
            );
          })
      : contractData?.myContract
          .filter(
            (contract: MyContractQuery["myContract"][0]) =>
              contract.isCurrent === true
          )
          .map((contract, index) => {
            return (
              <CurrentContractTable
                key={index}
                props={{
                  ...contract,
                }}
              />
            );
          });

  const favourite_rows =
    search.length > 0
      ? contractData?.myContract
          .filter(
            (contract: MyContractQuery["myContract"][0]) =>
              contract.House.name
                .toLowerCase()
                .includes(search.toLowerCase()) ||
              contract.House.District.toLowerCase().includes(
                search.toLowerCase()
              ) ||
              contract.House.Region.toLowerCase().includes(
                search.toLowerCase()
              ) ||
              contract.House.Ward.toLowerCase().includes(
                search.toLowerCase()
              ) ||
              contract.Total_rent.toLowerCase().includes(search.toLowerCase())
          )
          .map((contract, index) => {
            return (
              <FavouriteHouseTable
                key={index}
                props={{
                  ...contract,
                }}
              />
            );
          })
      : contractData?.myContract.map((contract, index) => {
          return (
            <FavouriteHouseTable
              key={index}
              props={{
                ...contract,
              }}
            />
          );
        });

  //   STYLES
  const iconStyle = { width: rem(12), height: rem(12) };

  return (
    <Container size="xl">
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
        {isLoadingContracts && (
          <Flex align={"center"} justify={"center"}>
            <Loader color="blue" type="bars" />
          </Flex>
        )}

        {!isLoadingContracts && (
          <Tabs defaultValue="current" variant="pills">
            <Tabs.List>
              <Tabs.Tab
                value="current"
                leftSection={<IconCurrentLocation style={iconStyle} />}
              >
                Currently in
              </Tabs.Tab>
              <Tabs.Tab
                value="favourite"
                leftSection={<IconHeart style={iconStyle} />}
              >
                favourite
              </Tabs.Tab>
            </Tabs.List>

            <Space h="md" />

            <Tabs.Panel value="current">
              <Paper p={"md"} shadow="sm" radius={"md"}>
                <Table.ScrollContainer minWidth={1100} p={"md"}>
                  <Table verticalSpacing={"xs"}>
                    <Table.Thead bg={`${color.blue_light_color}`}>
                      <Table.Tr>
                        <Table.Th>House name</Table.Th>
                        <Table.Th>Region</Table.Th>
                        <Table.Th>District</Table.Th>
                        <Table.Th>Ward</Table.Th>
                        <Table.Th>Start date</Table.Th>
                        <Table.Th>End date</Table.Th>
                        <Table.Th>Remain</Table.Th>
                      </Table.Tr>
                    </Table.Thead>

                    <Table.Tbody>{current_rows}</Table.Tbody>
                  </Table>
                </Table.ScrollContainer>
              </Paper>
            </Tabs.Panel>

            <Tabs.Panel value="favourite">
              <Paper p={"md"} shadow="sm" radius={"md"}>
                <Table.ScrollContainer minWidth={1100} p={"md"}>
                  <Table verticalSpacing={"xs"}>
                    <Table.Thead bg={`${color.blue_light_color}`}>
                      <Table.Tr>
                        <Table.Th>House name</Table.Th>
                        <Table.Th>Region</Table.Th>
                        <Table.Th>District</Table.Th>
                        <Table.Th>Ward</Table.Th>
                        <Table.Th>Start date</Table.Th>
                        <Table.Th>End date</Table.Th>
                        <Table.Th>Remain</Table.Th>
                      </Table.Tr>
                    </Table.Thead>

                    <Table.Tbody>{favourite_rows}</Table.Tbody>
                  </Table>
                </Table.ScrollContainer>
              </Paper>
            </Tabs.Panel>
          </Tabs>
        )}
      </Stack>
    </Container>
  );
};

export default TenantLiving;
