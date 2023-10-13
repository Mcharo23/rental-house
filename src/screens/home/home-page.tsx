import { FC, useEffect, useState } from "react";
import {
  Anchor,
  AppShell,
  Avatar,
  Burger,
  Flex,
  Group,
  Text,
} from "@mantine/core";

import Account from "../account/account";

import NavBar from "./components/navBar";
import House from "../house/house-page";
import Dashboard from "../dashboard/dashboard";
import { getUserAccessToken } from "../../utils/localStorageUtils";
import { useNavigate } from "react-router-dom";
import ShowNotification from "../../global/components/show-notification";
import Rentals from "../Rental/Rentals";
import Tenants from "../tenants/tenant";
import Contracts from "../tenants/contract";
import Headers from "./components/header";
import { logo } from "../../lib/images/url";
import { ServerOverload } from "../error/server-error";

const HomePage: FC = () => {
  const [opened, setOpened] = useState(false);
  const navigate = useNavigate();

  const [activeScreen, setActiveScreen] = useState<string>("Dashboard");
  const token = getUserAccessToken();

  useEffect(() => {
    if (!token) {
      ShowNotification({
        title: "Session Expired ⚠️",
        message:
          " Your session has expired. Please log in again to continue. 🔐",
      });
      navigate("/", { replace: true });
    }
  }, [activeScreen, navigate, token]);

  return (
    <AppShell
      header={{ height: 50 }}
      navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }}
    >
      <AppShell.Header>
        <Flex
          mih={50}
          gap="md"
          justify="space-between"
          align={"center"}
          direction="row"
          display={"flex"}
        >
          <Group>
            <Burger
              opened={opened}
              onClick={() => setOpened((o) => !o)}
              size="sm"
              hiddenFrom="sm"
            />
          </Group>
          <Flex align={"center"} direction={"row"} justify={"center"}>
            <Avatar src={`${logo}`} alt="logo" radius={"xl"} size={"md"} />
            <Text size="lg">
              The Estate <Anchor>Soko</Anchor>
            </Text>
          </Flex>
          <Headers />
        </Flex>
      </AppShell.Header>

      <AppShell.Navbar>
        <NavBar
          onClick={(value: string) => {
            setActiveScreen(value);
            setOpened(!opened);
          }}
        />
      </AppShell.Navbar>

      <AppShell.Main>
        {activeScreen === "Dashboard" ? (
          <Dashboard />
        ) : activeScreen === "House" ? (
          <House />
        ) : activeScreen === "PendingNest" ? (
          <Rentals />
        ) : activeScreen === "Luxe Living" ? (
          <Tenants />
        ) : activeScreen === "Contracts" ? (
          <Contracts />
        ) : activeScreen === "Account" ? (
          <Account />
        ) : (
          <ServerOverload />
        )}
      </AppShell.Main>
    </AppShell>
  );
};

export default HomePage;
