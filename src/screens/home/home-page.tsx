import { FC, useState } from "react";
import {
  Anchor,
  AppShell,
  Avatar,
  Burger,
  Flex,
  Group,
  Text,
} from "@mantine/core";

import NavBar from "./components/navBar";
import Dashboard from "../dashboard/dashboard";
import Headers from "./components/header";
import { logo } from "../../lib/images/url";
import { ServerOverload } from "../error/server-error";
import House from "../house/house-page";
import PendingNest from "../PendingNest/pending-nest-page";
import { color } from "../../lib/color/mantine-color";
import LuxeLivingPage from "../luxeLiving/luxe-living";
import TenantLiving from "../tenant-living/tenantLiving";
import Account from "../account/account-page";

const HomePage: FC = () => {
  const [opened, setOpened] = useState(false);

  const [activeScreen, setActiveScreen] = useState<string>("Dashboard");

  return (
    <AppShell
      header={{ height: 50 }}
      navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }}
      bg={`${color.gray_light_color}`}
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
          <PendingNest />
        ) : activeScreen === "Luxe Living" ? (
          <LuxeLivingPage />
        ) : activeScreen === "Home" ? (
          <TenantLiving />
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
