import { FC, useEffect, useState } from "react";
import {
  AppShell,
  Navbar,
  Header,
  Aside,
  MediaQuery,
  Burger,
  useMantineTheme,
} from "@mantine/core";

import Account from "../account/account";

import Headers from "./components/header";
import NavBar from "./components/navBar";
import House from "../house/house";
import Dashboard from "../dashboard/dashboard";
import { getUserAccessToken } from "../../utils/localStorageUtils";
import { useNavigate } from "react-router-dom";
import ShowNotification from "../../global/components/show-notification";
import Rentals from "../Rental/Rentals";
import Tenants from "../tenants/tenant";
import Contracts from "../tenants/contract";
import RightBar from "./components/RightBar";

const HomePage: FC = () => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const navigate = useNavigate();

  const [activeScreen, setActiveScreen] = useState<string>("dashboard");
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
          <NavBar
            onClick={(value: string) => {
              setActiveScreen(value);
              setOpened(!opened);
            }}
          />
        </Navbar>
      }
      aside={
        <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
          <Aside
            hiddenBreakpoint="sm"
            width={{ sm: 250, lg: 350 }}
            className="flex justify-center items-center"
          >
            <RightBar onClick={(value) => setActiveScreen(value)} />
          </Aside>
        </MediaQuery>
      }
      // footer={
      //   <Footer height={60} p="md">
      //     Application footer
      //   </Footer>
      // }
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
      ) : activeScreen === "rentals" ? (
        <Rentals />
      ) : activeScreen === "tenants" ? (
        <Tenants />
      ) : activeScreen === "contracts" ? (
        <Contracts />
      ) : (
        <Account />
      )}
    </AppShell>
  );
};

export default HomePage;
