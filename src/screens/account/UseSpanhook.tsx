import { useEffect, useState } from "react";
import { getUserData } from "../../utils/localStorageUtils";
import { LoginUserInputMutation } from "../../generated/graphql";
import { Custominputprops } from "../../lib/design-interface/custom-input-props";

const SpanHook = () => {
  const [data, setData] = useState<Custominputprops[]>([]);
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
        placeholder: user?.login.user.firstName ?? "",
      },
      {
        labeled: "Middle Name",
        inputType: "text",
        placeholder: user?.login.user.middleName ?? "",
      },
      {
        labeled: "Last Name",
        inputType: "text",
        placeholder: user?.login.user.lastname ?? "",
      },
      {
        labeled: "Email",
        inputType: "email",
        placeholder: user?.login.user.username ?? "",
      },
      {
        labeled: "Phone",
        inputType: "number",
        placeholder: user?.login.user.phoneNumber ?? "",
      },
    ]);
  }, [
    user?.login.user.firstName,
    user?.login.user.middleName,
    user?.login.user.lastname,
    user?.login.user.username,
    user?.login.user.phoneNumber,
  ]);
  return [data];
};

export default SpanHook;
