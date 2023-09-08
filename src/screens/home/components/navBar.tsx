import { FC, useState } from "react";
import { Text } from "@mantine/core";
import { FiGrid, FiUser, FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { clearUserData } from "../../../utils/localStorageUtils";
import { NavBarprop } from "../interface/type";
import { FaHouseUser, FaUser } from "react-icons/fa";

const NavBar: FC<NavBarprop> = ({ onClick }) => {
  const navigate = useNavigate();
  const [activeScreen, setActiveScreen] = useState<string>("dashboard");

  const handleLogOut = () => {
    clearUserData();
    navigate("/", { replace: true });
  };

  const switchScreen = (value: string) => {
    setActiveScreen(value);
    onClick(value);
  };

  return (
    <div className="flex flex-col w-full h-full place-content-between text-sm">
      <ul className="text-gray-800">
        <li
          className={`relative w-full  ${
            activeScreen === "dashboard" ? "bg-gray-200 text-blue-600" : ""
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
            activeScreen === "house" ? "bg-gray-200 text-blue-600" : ""
          }`}
          onClick={() => switchScreen("house")}
        >
          <span className="absolute inset-y-0 flex items-center pl-2">
            <FaHouseUser className="text-light-blue" />
          </span>
          <Text className="h-full rounded-lg p-2 pl-8 w-full cursor-pointer">
            House
          </Text>
        </li>
        <li
          className={`relative w-full  ${
            activeScreen === "account" ? "bg-gray-200 text-blue-600" : ""
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
      <ul className="text-gray-800">
        {/* <li>
          <div className="flex-row gap-3 items-center flex text-sm">
            <span>
              <FaUser className="bg-light-blue text-white-smoke rounded-full p-1 text-lg " />
            </span>
            <div className="flex flex-col w-full">
              <Text className="flex font-semibold font-sans text-gray-800">
                Mcharo
              </Text>
            </div>
          </div>
        </li> */}
        <li
          className={`relative w-full ${
            activeScreen === "logout" ? "bg-gray-200 text-blue-600" : ""
          }`}
          onClick={() => handleLogOut()}
        >
          <span className="absolute inset-y-0 flex items-center">
            <FiLogOut className="text-light-blue" size={20} />
          </span>
          <Text className="h-full p-2 pl-6 w-full cursor-pointer">Log out</Text>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
