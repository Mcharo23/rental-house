import { FC, useState } from "react";
import { Text } from "@mantine/core";
import { FaHome, FaUser } from "react-icons/fa";
// import { clearUserData } from "../../../utils/localStorageUtils";
// import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { getUserData } from "../../../utils/localStorageUtils";

const Headers: FC = () => {
  const user = getUserData();
  // const navigate = useNavigate();
  // const [isOpen, setIsOpen] = useState(false);

  // const handleDropdown = () => {
  //   setIsOpen(!isOpen);
  // };

  // const handleLogOut = () => {
  //   clearUserData();
  //   navigate("/");
  // };

  return (
    <div className="flex items-center flex-row w-full h-full place-content-between">
      <div className="flex flex-row gap-1 text-sm ">
        <span className="relative inset-y-0 items-center flex">
          <FaHome className="text-light-blue text-sm" />
        </span>
        <Text className="font-semibold text-gray-800 flex justify-center items-center">
          The Estate
        </Text>
      </div>
      <div>
        <div className="text-gray-80 relative w-full text-sm">
          <span className="absolute inset-y-0 flex items-center">
            <FaUser className="bg-light-blue text-white-smoke rounded-full text-lg p-1" />
          </span>
          <div className="flex flex-col w-full pl-3">
            <Text className="flex font-semibold text-gray-800 font-sans h-full rounded-lg p-2 w-full cursor-pointer">
              {user?.login.user.lastname}
            </Text>
          </div>
        </div>
      </div>
      {/* <div
        className={`flex ${isOpen ? "block flex-row" : ""}`}
        onClick={handleDropdown}
      >
        
        <div
          className={`relative ${isOpen ? "block" : "hidden"}`}
          onClick={handleLogOut}
        >
          <span className="absolute inset-y-0 flex items-center pl-2">
            <FiLogOut className="text-light-blue" />
          </span>
          <Text className="pl-8 w-full text-red-800 cursor-pointer">
            Log out
          </Text>
        </div>
      </div> */}
    </div>
  );
};

export default Headers;
