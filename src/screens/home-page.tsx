import React, { FC, useState } from "react";
import {
  AppShell,
  Navbar,
  Header,
  Footer,
  Aside,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
} from "@mantine/core";
// import ToggleButtonGroup from "../global/components/toggle-button";
import { FiGrid, FiUser } from "react-icons/fi";
// import SearchBar from "../global/components/search-bar";
// import { HouseProps } from "../lib/design-interface/house-type";
// import { HOUSE } from "../house";
// import HouseUI from "../components/houseUI";
import Dashboard from "./dashboard/dashboard";
import Account from "./account/account";

const HomePage: FC = () => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const [activeScreen, setActiveScreen] = useState<string>("dashboard");

  const switchScreen = (screen: string) => {
    setActiveScreen(screen);
  };

  // const [selectedButton, setSelectedButton] = useState<string>("Owner");
  // const [houses, setHouses] = useState<HouseProps[]>(HOUSE);
  // const [filteredHouse, setFilteredHouse] = useState<HouseProps[]>([]);
  // const [searchLength, setSearchLength] = useState<number>(0);

  // const handleSearch = (search: string) => {
  //   setSearchLength(search.length);
  //   const filtered: HouseProps[] = houses.filter(
  //     (house: HouseProps) =>
  //       house.name.toLowerCase().includes(search.toLowerCase()) ||
  //       house.location.toLowerCase().includes(search.toLowerCase())
  //   );
  //   setFilteredHouse(filtered);
  // };

  // const renderHouses = () => {
  //   return (
  //     <ul className="flex flex-row gap-3 h-full overscroll-auto overflow-auto ">
  //       {filteredHouse.length === 0 && searchLength !== 0 ? (
  //         <div className="font-sans text-2xl"></div>
  //       ) : searchLength === 0 ? (
  //         houses.map((house, index) => (
  //           <li key={index}>
  //             <HouseUI
  //               name={house.name}
  //               price={house.price}
  //               location={house.location}
  //               img={house.img}
  //             />
  //           </li>
  //         ))
  //       ) : (
  //         filteredHouse.map((house, index) => (
  //           <li key={index}>
  //             <HouseUI
  //               name={house.name}
  //               price={house.price}
  //               location={house.location}
  //               img={house.img}
  //             />
  //           </li>
  //         ))
  //       )}
  //     </ul>
  //   );
  // };

  return (
    <AppShell
      // styles={{
      //   main: {
      //     background:
      //       theme.colorScheme === "dark"
      //         ? theme.colors.dark[8]
      //         : theme.colors.gray[0],
      //   },
      // }}
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
          {/* <Text>Application navbar</Text> */}
          <ul>
            <li
              className={`relative w-full  ${
                activeScreen === "dashboard" ? "bg-gray-200" : ""
              }`}
              onClick={() => switchScreen("dashboard")}
            >
              <span className="absolute inset-y-0 flex items-center pl-2">
                <FiGrid className="text-light-blue" />
              </span>
              <Text className="h-full rounded-lg p-2 pl-8 w-full cursor-pointer">
                Dashboard
              </Text>
            </li>
            <li
              className={`relative w-full  ${
                activeScreen === "account" ? "bg-gray-200" : ""
              }`}
              onClick={() => switchScreen("account")}
            >
              <span className="absolute inset-y-0 flex items-center pl-2">
                <FiUser className="text-light-blue" />
              </span>
              <Text className="h-full rounded-lg p-2 pl-8 w-full cursor-pointer">
                Account
              </Text>
            </li>
          </ul>
        </Navbar>
      }
      aside={
        <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
          <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
            <Text>Application sidebar</Text>
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

            <Text>Application header</Text>
          </div>
        </Header>
      }
    >
      {/* <div className="w-full flex flex-row h-14 p-1 gap-5 items-center place-content-between">
        <div className="w-1/2 sm:w-full md:w-full lg:w-full xl:w-full 2xl:w-full h-full sm:flex sm:justify-center  sm:items-center md:justify-center md:items-center lg:justify-center lg:items-center xl:justify-center xl:items-center 2xl:justify-center 2xl:items-center ">
          <SearchBar onSearch={handleSearch} />
        </div>
        <div className="flex justify-end w-1/2 sm:w-auto md:w-auto lg:w-auto xl:w-auto 2xl:w-auto flex-row h-full gap-2">
          <div className="bg-white w-36 h-full flex flex-row rounded-lg p-1">
            <ToggleButtonGroup
              onClick={setSelectedButton}
              name={"Owner"}
              selectedButton={selectedButton}
            />
            <ToggleButtonGroup
              onClick={setSelectedButton}
              name={"Tenant"}
              selectedButton={selectedButton}
            />
          </div>
          <div className="bg-white h-full justify-center items-center flex w-10 rounded-lg">
            <FiBell style={{ height: "100%", fontSize: 30 }} />
          </div>
        </div>
      </div>
      <div className="w-full mt-5 overflow-auto flex flex-col h-full">
        <div className="flex flex-row place-content-between gap-2">
          <Text className="font-semibold text-2xl font-serif">
            Popular of the week
          </Text>
          <Text className="font-sans text-blue-600">Seen More</Text>
        </div>
        <div className="w-full h-2/6 flex-row mt-5">{renderHouses()}</div>
        <div className="flex flex-row place-content-between mt-5 gap-2">
          <Text className="font-semibold text-2xl font-serif ">
            Find the nearest of you
          </Text>
          <Text className="font-sans text-blue-600 flex flex-row gap-3">
            <FiMapPin /> Kinondoni
          </Text>
        </div>
      </div> */}
      {activeScreen === "dashboard" ? <Dashboard /> : <Account />}
    </AppShell>
  );
};

export default HomePage;
