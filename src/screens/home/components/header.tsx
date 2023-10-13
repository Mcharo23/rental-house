import { FC } from "react";
import ColorScheme from "../../../globals/components/dark-light-modal";
import { FiBell } from "react-icons/fi";
import { Flex } from "@mantine/core";

const Headers: FC = () => {
  return (
    <Flex align={"center"} direction={"row"} gap={"md"}>
      <FiBell style={{ height: "100%", fontSize: 30 }} />
      <ColorScheme />
    </Flex>
  );
};

export default Headers;
