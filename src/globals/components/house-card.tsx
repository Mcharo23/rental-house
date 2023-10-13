import { Flex, Text, Paper, Space, Anchor, Title } from "@mantine/core";
import { FC } from "react";
import { IconBath, IconBed, IconToolsKitchen } from "@tabler/icons-react";
import { color } from "../../lib/color/mantine-color";
import { IMAGE_BASE } from "../../lib/api-base";
import { GetHousesQuery } from "../../generated/graphql";

type HouseCardUiProps = {
  props: GetHousesQuery["houses"][0];
};
const HouseCardUi: FC<HouseCardUiProps> = ({ props }) => {
  return (
    <Paper bg={`${color.gray_light_color}`}>
      <div
        style={{
          display: "flex",
          height: 450,
          flexDirection: "column",
          borderTopLeftRadius: "10px",
          borderTopRightRadius: "10px",
          borderBottomLeftRadius: "10px",
          borderBottomRightRadius: "10px",
        }}
      >
        <img
          src={`${IMAGE_BASE.BASE}${props.imgUrl[0]}`}
          alt={`image for ${props.name} house`}
          style={{
            width: "100%",
            height: "60%",
            borderTopLeftRadius: "10px",
            borderTopRightRadius: "10px",
          }}
        />
        <Flex p={"sm"} display={"flex"} direction={"column"}>
          <Title order={4}>{props.name}</Title>

          <Space h={"sm"} />

          <Flex justify={"space-between"}>
            <Flex>
              <IconBed />
              <Text>3 bedrooms</Text>
            </Flex>

            <Flex>
              <IconBath />
              <Text>2 bathrooms</Text>
            </Flex>

            <Flex>
              <IconToolsKitchen />
              <Text>3 kitchen</Text>
            </Flex>
          </Flex>

          <Space h={"sm"} />

          <Flex
            direction={"row"}
            justify={"space-between"}
            align={"center"}
            display={"flex"}
          >
            <Flex direction={"column"}>
              <Anchor>{props.price}Tshs</Anchor>
              <Text>
                {props.District}, {props.Region}
              </Text>
            </Flex>

            <Paper
              withBorder
              p={"sm"}
              radius={"md"}
              bg={`${color.gray_light_color}`}
            >
              <Anchor underline="never" href={`tel:${props.user.phoneNumber}`}>
                Book Now
              </Anchor>
            </Paper>
          </Flex>
        </Flex>
      </div>
    </Paper>
  );
};

export default HouseCardUi;
