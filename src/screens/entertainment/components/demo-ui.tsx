import { Text, Card, Button, Group, rem } from "@mantine/core";
import { FC } from "react";
import { GetDemoHousesQuery } from "../../../generated/graphql";
import { IconStar } from "@tabler/icons-react";

import classes from "../../../global/css/CarouselCard.module.css";
import ImageSwiper from "../../../global/components/fade-image-swiper";
import { useNavigate } from "react-router-dom";
import { color } from "../../../lib/color/mantine-color";

type DemoUiProps = {
  props: GetDemoHousesQuery["demo"][0];
};

const DemoUi: FC<DemoUiProps> = ({ props }) => {
  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate("/auth");
  };

  return (
    <Card radius="md" withBorder padding="xl" bg={`${color.gray_light_color}`}>
      <Card.Section>
        <ImageSwiper images={props.imgUrl} />
      </Card.Section>

      <Group justify="space-between" mt="lg">
        <Text fw={500} fz="lg">
          {props.District} {props.Region}
        </Text>

        <Group gap={5}>
          <IconStar style={{ width: rem(16), height: rem(16) }} />
          <Text fz="xs" fw={500}>
            4.78
          </Text>
        </Group>
      </Group>

      <Text fz="sm" c="dimmed" mt="sm" lineClamp={4}>
        {/* Relax, rejuvenate and unplug in this unique contemporary Birdbox. Feel
        close to nature in ultimate comfort. Enjoy the view of the epic mountain
        range of Blegja and the Førdefjord. */}
        {props.Description}
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

        <Button radius="md" onClick={handleOnClick}>
          Book now
        </Button>
      </Group>
    </Card>
  );
};

export default DemoUi;
