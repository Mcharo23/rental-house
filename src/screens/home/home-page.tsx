import { FC, useState } from "react";
import {
  AppShell,
  Navbar,
  Header,
  Footer,
  Aside,
  MediaQuery,
  Burger,
  useMantineTheme,
} from "@mantine/core";

import Dashboard from "../dashboard/dashboard";
import Account from "../account/account";
import Sidebar from "./components/side-bar";

import Headers from "./components/header";
import NavBar from "./components/navBar";
import House from "../house/house";

const HomePage: FC = () => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

  const [activeScreen, setActiveScreen] = useState<string>("dashboard");

  return (
    <AppShell
      className="bg-slate-200"
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={
        <Navbar
          p="md"
          hiddenBreakpoint="sm"
          hidden={!opened}
          width={{ sm: 200, lg: 300 }}
          className="w-40 sm:w-52"
        >
          <NavBar onClick={setActiveScreen} />
        </Navbar>
      }
      aside={
        <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
          <Aside
            p="md"
            hiddenBreakpoint="sm"
            width={{ sm: 250, lg: 350 }}
            className=""
          >
            <Sidebar />
          </Aside>
        </MediaQuery>
      }
      footer={
        <Footer height={60} p="md">
          Application footer
        </Footer>
      }
      header={
        <Header height={{ base: 50, md: 70 }} p="md">
          <div
            style={{ display: "flex", alignItems: "center", height: "100%" }}
          >
            <MediaQuery largerThan="sm" styles={{ display: "none" }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>

            <Headers />
          </div>
        </Header>
      }
    >
      {activeScreen === "dashboard" ? (
        <Dashboard />
      ) : activeScreen === "house" ? (
        <House />
      ) : (
        <Account />
      )}
    </AppShell>
  );
};

export default HomePage;
