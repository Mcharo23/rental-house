import { FC, useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Container,
  Flex,
  Grid,
  Group,
  Loader,
  Modal,
  Notification,
  Paper,
  Space,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import {
  GetHousesQuery,
  useCreateContractInputMutation,
} from "../../generated/graphql";
import {
  clearUserData,
  getUserAccessToken,
  getUserData,
} from "../../utils/localStorageUtils";
import useFetchHouses from "./components/fetchHouses";
import Search from "../../globals/components/search";
import { color } from "../../lib/color/mantine-color";
import { IconX } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import HouseCardUi from "../../globals/components/house-card";
import { useDisclosure } from "@mantine/hooks";
import { AccountType } from "../../lib/enums/enum";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { GraphQLError } from "graphql";
import showMessage from "../../global/components/notification";
import LoadingNotification from "../../globals/components/load-notification";
import UpdateNotification from "../../globals/components/update-notification";
import graphqlRequestClient from "../../lib/clients/graphqlRequestClient";
import SelectComponent from "../../globals/components/native-select";
import { useQueryClient } from "@tanstack/react-query";

const Dashboard: FC = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // STRING STATES

  const [accessToken, setAccessToken] = useState<string | null>(null);

  //BOOLEAN STATES
  const [showModal, setShowModal] = useState<boolean>(false);
  const [opened, { open, close }] = useDisclosure(false);

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

  const bookForm = useForm({
    initialValues: {
      time: "",
      total_rent: "",
      duration: "",
      _id: "",
      name: "",
      price: 0,
      terms: false,
    },
    validate: {
      time: (val) => (val.length === 0 ? "Time required" : null),
      duration: (val) => (val === "" ? "Please select duration" : null),
      terms: (val) => (val ? null : "You must agree"),
    },
  });

  const { mutate: createContractMutate } = useCreateContractInputMutation(
    graphqlRequestClient.setHeaders({ Authorization: `Bearer ${accessToken}` }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([
          "getMyHouse",
          "getDemoHouses",
          "getHouses",
        ]);
        UpdateNotification(
          {
            id: "contract",
            message: "Contact the landlord for signing contract",
            title: "Successfully",
          },
          3000
        );
        setShowModal(false);
        close();
        bookForm.reset();
        return;
      },
      onError: (error: GraphQLError) => {
        setShowModal(false);
        close();
        bookForm.reset();
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

  const handleOnSubmitContract = async () => {
    LoadingNotification({
      id: "contract",
      message: "Please wait...",
      title: "Updating",
    });
    await createContractMutate({
      input: {
        Duration: Number(bookForm.values.time),
        House: bookForm.values._id,
        Total_rent: String(
          bookForm.values.price * Number(bookForm.values.time)
        ),
      },
    });
  };

  //SELECTIONS
  const select = (
    <SelectComponent
      data={[
        { value: "", label: "Duration" },
        { value: "/Months", label: "Month" },
        { value: "/years", label: "Years" },
      ]}
      value={bookForm.values.duration}
      width={110}
      onChange={(value) => bookForm.setFieldValue("duration", value)}
    />
  );

  return (
    <Container fluid>
      {showModal && (
        <Modal
          opened={opened}
          onClose={() => {
            close();
            setShowModal(false);
            bookForm.reset();
          }}
          title={`Book ${bookForm.values.name} house`}
          transitionProps={{
            transition: "fade",
            duration: 600,
            timingFunction: "linear",
          }}
        >
          {getUserData()?.login.user.accountType === AccountType.OWNER ? (
            <Text>Sorry! you are not authorized to have tenant role</Text>
          ) : (
            <form onSubmit={bookForm.onSubmit(handleOnSubmitContract)}>
              <TextInput
                label="Duration"
                type="number"
                value={bookForm.values.time}
                placeholder="5"
                rightSection={select}
                rightSectionWidth={110}
                onChange={(event) => {
                  bookForm.setFieldValue("time", event.currentTarget.value);
                  bookForm.setFieldValue(
                    "total_rent",
                    String(
                      bookForm.values.price * Number(event.currentTarget.value)
                    )
                  );
                }}
                error={bookForm.errors.time && "invalid price input"}
                required
              />

              <Space h={"md"} />

              {bookForm.values.time !== "" && (
                <Paper bg={`${color.gray_light_color}`} radius={"md"} p={"md"}>
                  Total rent: {bookForm.values.total_rent} Tshs
                </Paper>
              )}

              <Space h={"md"} />

              <Group>
                <Checkbox
                  label="I agree all terms and condition"
                  checked={bookForm.values.terms}
                  onChange={(e) => {
                    bookForm.setFieldValue("terms", e.currentTarget.checked);
                  }}
                  error={bookForm.errors.terms && "You must agree"}
                />
              </Group>

              <Space h={"md"} />

              <Button type="submit" fullWidth>
                Submit
              </Button>
            </form>
          )}
        </Modal>
      )}
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
              <HouseCardUi
                props={{ ...house }}
                onClick={(id: string, name: string, price: number) => {
                  setShowModal(true);
                  open();
                  bookForm.setValues({ _id: id, name: name, price: price });
                }}
              />
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
              <HouseCardUi
                props={{ ...house }}
                onClick={(id: string, name: string, price: number) => {
                  setShowModal(true);
                  open();
                  bookForm.setValues({ _id: id, name: name, price: price });
                }}
              />
            </Grid.Col>
          ))
        )}
      </Grid>

      <Space h={"xl"} />
    </Container>
  );
};
export default Dashboard;
