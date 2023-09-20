import {  useEffect, useState } from "react";
import { getUserData } from "../../utils/localStorageUtils";
import { LoginUserInputMutation } from "../../generated/graphql";
import CustomSpandiv from "./CustomSpandiv";

const spanHook = () => {
  const [data, setData] = useState<Array<CustomSpandiv>>();
  const [user, setUser] = useState<LoginUserInputMutation | null>(
    getUserData() ?? null
  );

  useEffect(() => {
    const userData = getUserData();
    if (userData !== null) {
      setUser(userData);
    }
  }, []);

  useEffect(() => {
    setData([
      {
        labeled: "First Name",
        inputType: "text",
        placeholder: user?.login.user.firstName,
      },
      {
        labeled: "Middle Name",
        inputType: "text",
        placeholder: user?.login.user.middleName,
      },
      {
        labeled: "Last Name",
        inputType: "text",
        placeholder: user?.login.user.lastname,
      },
      {
        labeled: "Email",
        inputType: "email",
        placeholder: user?.login.user.username,
      },
      {
        labeled: (
          <span>
            {/* <i className="pi pi-phone" /> */}
            Phone
          </span>
        ),
        inputType: "number",
        placeholder: user?.login.user.phoneNumber,
      },
    ]);
  });
  return [data];
};

export default spanHook;
