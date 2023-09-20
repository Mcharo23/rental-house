import { useEffect, useState } from "react";
import { LoginUserInputMutation } from "../../generated/graphql";
import { getUserData } from "../../utils/localStorageUtils";
import spanHook from "./UseSpanhook";
import Avatar from "./images/Avatared.jpeg";
import Avatarwoman from "./images/Avatarwoman.png";
import CustomSpandiv from "./CustomSpandiv";
import ChangeEmail from "./ChangeEmailPhoneNumber";
import ChangePassword from "./ChangePassword";
import DropdownMenu from "./drop-down-menu";
import DeleteAccount from "./DeleteAccount";

const Account = () => {
  const [data] = spanHook();

  const [user, setUser] = useState<LoginUserInputMutation | null>(
    getUserData() ?? null
  );
  const [picture, setPicture] = useState(Avatar);

  useEffect(() => {
    if (user?.login.user.gender === "Female") {
      setPicture(Avatarwoman);
    }
    const userData = getUserData();
    if (userData !== null) {
      setUser(userData);
    }
  }, [user?.login.user.gender]);

  return (
    <div className="flex flex-col justify-center bg-stone-200 h-screen overflow-auto w-full items-center">
      <div className="flex-col flex   w-5/6 bg-white overflow-auto ">
        <span className="font-bold pl-4 ">Personal Settings</span>
        <div className="flex flex-col rounded-lg   w-full h-3/4 sm:h-auto md:h-auto md:overflow-auto  2xl:h-1/2 lg:h-1/2 p-5 sm:flex-col sm:flex sm:w-full   md:flex sm:p-5 md:flex-col lg:flex-col 2xl:flex-col">
          <div className="flex flex-col rounded-lg  w-full h-full  p-5 sm:flex-col sm:flex sm:w-full sm:h-full md:h-auto  md:w-full sm:p-5 md:flex-col lg:flex-row">
            <div className="flex flex-col rounded-lg justify-between items-center w-full h-full  p-5 sm:flex-row sm:flex sm:w-full sm:h-full sm:p-5 md:flex-col lg:w-1/2 lg:flex-col">
              <div className="flex h-2/3">
                <img
                  className="flex rounded-md"
                  src={picture}
                  alt="profile picture"
                />
              </div>
              <div className="flex h-1/5">
                <button className="rounded-xl w-24 border border-black">
                  Change
                </button>
              </div>
            </div>
            <div className="flex flex-col justify-evenly h-full w-full">
              {data?.map((item, index) => {
                return (
                  <CustomSpandiv
                    labeled={item.labeled}
                    inputType={item.inputType}
                    placeholder={item.placeholder}
                    key={index}
                  />
                );
              })}
              <div className="flex justify-between">
                {" "}
                <ChangeEmail />
                <ChangePassword />
              </div>
            </div>
          </div>
          {/* <div className="flex justify-evenly ">
            <a href="#" className="text-blue-500">
              Change name
            </a>
            <a href="#" className="text-blue-500">
              Change email
            </a>
            <a href="#" className="text-blue-500">
              Change password
            </a>
            <a href="#" className="text-blue-500">
              Change number
            </a>
          </div> */}
        </div>
        <div className="flex flex-col h-1/3   pl-4">
          <span className="mt-10 font-bold ">Account Settings</span>
          <div className="flex h-1/6 rounded-lg flex-col">
            <DropdownMenu />
            <span className="mt-2 font-bold">Terminate Account</span>

            <div className="flex    rounded-lg">
              <span>
                <DeleteAccount />
                {/* add here the toast */}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
