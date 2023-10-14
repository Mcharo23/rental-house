import React, { FC } from "react";

import {
  Group,
  Button,
  Text,
  Anchor,
  Avatar,
  Flex,
  Container,
  Notification,
  Divider,
  Space,
  Loader,
  Paper,
  Title,
} from "@mantine/core";
import { banner1, logo } from "../../lib/images/url";
import { color } from "../../lib/color/mantine-color";
import { useNavigate } from "react-router-dom";
import useFetchDemoHouse from "./functions/get-demo-house";
import { IconX } from "@tabler/icons-react";
import DemoUi from "./components/demo-ui";
import ColorScheme from "../../globals/components/dark-light-modal";
import { clearUserData } from "../../utils/localStorageUtils";

const EntertainmentPage: FC = () => {
  const navigate = useNavigate();

  const { isLoading, error, data } = useFetchDemoHouse();
  if (error?.message === "Network request failed") {
    localStorage.setItem("error", "/");
    navigate("/error", { replace: true });
    window.location.reload();
  }

  //STYLES
  const textStyle: React.CSSProperties = {
    whiteSpace: "pre-line",
  };

  //CONSTANTS
  const about = `We are a company that connects the world of real estate and finance. We provide a complete service for the sale, purchase or rental of real estate.

Our advantage is more than 15 years of experience and soil in attractive locations in Slovakia with branches in Bratislava and Košice. We have a connection to all banks on the Slovak market, so we can solve everything under one roof.

By constantly innovating our business activities, we move forward and we are able to offer truly above-standard services that set us apart from the competition.`;

  const header = `We help people to get
home & renting with
good proce`;

  return (
    <Container fluid>
      <Flex
        align={"center"}
        justify={"space-between"}
        bg={`${color.gray_light_color}`}
        p={10}
      >
        <Flex align={"center"} direction={"row"} justify={"center"} gap={"md"}>
          <Avatar src={`${logo}`} alt="logo" radius={"xl"} size={"md"} />
          <Text size="md">
            The Estate <Anchor>Soko</Anchor>
          </Text>
        </Flex>

        <Group wrap="wrap">
          <Flex
            direction={"row"}
            gap={"sm"}
            align={"center"}
            justify={"center"}
          >
            <ColorScheme />
            <Button
              color="blue"
              variant="outline"
              onClick={() => {
                clearUserData();
                navigate("/auth");
              }}
            >
              Log in
            </Button>
            <Button>Contact us</Button>
          </Flex>
        </Group>
      </Flex>
      <Flex
        direction={{
          base: "column",
          sm: "column",
          md: "row",
          lg: "row",
          xl: "row",
        }}
        gap={"md"}
        justify={"center"}
        align={"center"}
        mt={"md"}
      >
        <Flex
          direction={"column"}
          align={"center"}
          justify={"center"}
          w={{ sm: "50%" }}
        >
          <Title order={1}>Your dream</Title>
          <Title order={2}>
            <Anchor size="25px">House</Anchor> is here.
          </Title>
          <Text>We provide a completeservice for the rent</Text>
          <Text>of real estate. We have been operating in Mainland</Text>

          <Space h="md" />

          <Text size="xl" c={`blue`}>
            {header}
          </Text>
        </Flex>
        <Flex
          w={{ sm: "100%", md: "50%", lg: "75%", xl: "75%" }}
          h={{ sm: 300, md: 350, lg: 400, xl: 500 }}
        >
          <img
            src={`${banner1}`}
            style={{
              width: "100%",
              borderTopLeftRadius: 5,
              borderTopRightRadius: 5,
              borderBottomLeftRadius: 5,
              borderBottomRightRadius: 5,
            }}
          />
        </Flex>
      </Flex>

      <Divider orientation="horizontal" size={"sm"} mt={"xl"} />

      <Space h="xl" />

      <Title order={2}>Top 10 House of the week</Title>

      <Space h="sm" />

      <Text>
        Fullfill your career dreams, enjoy all the achievement of the city
      </Text>
      <Text>center and luxury housing to the fullest</Text>

      <Space h="xl" />

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

      {/* <Grid gutter="sm" justify="flex-start" align="flex-start">
        {data?.demo.map((house) => (
          <Grid.Col
            span={{ base: 12, sm: 6, md: 4, lg: 4, xl: 3 }}
            key={house._id}
          >
            <DemoUi props={{ ...house }} />
          </Grid.Col>
        ))}
      </Grid> */}
      <Flex direction={"row"} gap={"sm"} style={{ overflowX: "scroll" }}>
        {data?.demo.map((house) => (
          <Flex
            key={house._id}
            w={{ base: "85%", sm: "50%", md: "40%", lg: "30%", xl: "400px" }}
          >
            <DemoUi props={{ ...house }} />
          </Flex>
        ))}
      </Flex>

      <Space h="md" />

      <Paper bg={`${color.gray_light_color}`} radius={"md"}>
        <Flex direction={"row"} display={"flex"} align={"center"} p={"md"}>
          <Flex direction={"column"}>
            <Title>About us</Title>
            <div style={textStyle}>{about}</div>
          </Flex>
        </Flex>
      </Paper>

      <Space h="md" />

      <Paper bg={`blue`} p={"md"}>
        <Flex align={"center"} justify={"center"}>
          <Text c={"white"}>
            ©Copyright 2023 by The estate soko. All right reserved
          </Text>
        </Flex>
      </Paper>
    </Container>
  );
};

export default EntertainmentPage;
