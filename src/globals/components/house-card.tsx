import { Text, Card, Button, Group, rem } from "@mantine/core";
import { FC } from "react";
import { IconStar } from "@tabler/icons-react";
import classes from "../css/CarouselCard.module.css";
import { GetHousesQuery } from "../../generated/graphql";
import ImageSwiper from "./fade-image-swiper";
import { color } from "../../lib/color/mantine-color";

type HouseCardUiProps = {
  props: GetHousesQuery["houses"][0];
  onClick: (id: string, name: string, price: number) => void;
};

const HouseCardUi: FC<HouseCardUiProps> = ({ props, onClick }) => {
  return (
    <Card radius="md" withBorder padding="xl" bg={`${color.gray_light_color}`}>
      <Card.Section>
        <ImageSwiper images={props.imgUrl} />
      </Card.Section>

      <Group justify="space-between" mt="lg">
        <Text fw={500} fz="lg">
          Forde, Norway
        </Text>

        <Group gap={5}>
          <IconStar style={{ width: rem(16), height: rem(16) }} />
          <Text fz="xs" fw={500}>
            4.78
          </Text>
        </Group>
      </Group>

      <Text fz="sm" c="dimmed" mt="sm" lineClamp={4}>
        Relax, rejuvenate and unplug in this unique contemporary Birdbox. Feel
        close to nature in ultimate comfort. Enjoy the view of the epic mountain
        range of Blegja and the Førdefjord.
      </Text>

      <Group justify="space-between" mt="md">
        <div>
          <Text fz="xl" span fw={500} className={classes.price}>
            {props.price}Tsh
          </Text>
          <Text span fz="sm" c="dimmed">
            {" "}
            / month
          </Text>
        </div>

        <Button
          radius="md"
          onClick={() => onClick(props._id, props.name, props.price)}
        >
          {props.status === "Booked" || props.status === "Pending"
            ? props.status
            : "Book now"}
        </Button>
      </Group>
    </Card>
  );
};

export default HouseCardUi;
