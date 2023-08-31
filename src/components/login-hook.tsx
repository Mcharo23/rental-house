import { useState, useEffect } from "react";
import { Custominputprops } from "../lib/design-interface/custom-input-props";

const UseLoginHook = () => {
  const [data, setData] = useState<Array<Custominputprops>>();
  useEffect(() => {
    setData([
      {
        labeled: "Email",
        inputType: "email",
        placeholder: "Write your email",
      },

      {
        labeled: "Password",
        inputType: "password",
        placeholder: "Write your password",
      },
    ]);
  }, []);
  return [data];
};

export default UseLoginHook;
