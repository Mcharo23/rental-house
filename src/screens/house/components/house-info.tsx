import { FC } from "react";
import { GetMyHouseQuery } from "../../../generated/graphql";
import { Container, Paper, Image, Space, Title, rem } from "@mantine/core";
import { IMAGE_BASE } from "../../../lib/api-base";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

// import required modules
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
import { color } from "../../../lib/color/mantine-color";
import { IconArrowBackUp } from "@tabler/icons-react";

type HouseInfoProps = {
  props: GetMyHouseQuery["myHouse"][0];
  onClick: () => void;
};

const HouseInfo: FC<HouseInfoProps> = ({ props, onClick }) => {
  const swiperContainerStyle = {
    width: "100%",
    paddingTop: "50px",
    paddingBottom: "50px",
  };

  const swiperSlideStyle = {
    backgroundPosition: "center",
    backgroundSize: "cover",
    width: "300px",
    height: "300px",
  };

  const swiperSlideImgStyle = {
    display: "block",
    width: "100%",
  };

  return (
    <Container fluid>
      <Space h={"md"} />

      <IconArrowBackUp
        style={{ width: rem(40), height: rem(40), cursor: "pointer" }}
        stroke={1.5}
        color={`${color.blue_light_filled}`}
        onClick={onClick}
      />

      <Space h={"md"} />

      <Paper radius={"md"} bg={`${color.gray_light_color}`}>
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={true}
          autoplay={true}
          modules={[EffectCoverflow, Pagination, Autoplay]}
          style={swiperContainerStyle}
        >
          {props.imgUrl.map((image, index) => {
            return (
              <SwiperSlide
                key={image}
                virtualIndex={index}
                style={swiperSlideStyle}
              >
                <Image
                  src={`${IMAGE_BASE.BASE}${image}`}
                  height={220}
                  style={swiperSlideImgStyle}
                />
                {/* <Image src={`${image}`} height={220} /> */}
              </SwiperSlide>
            );
          })}
        </Swiper>
      </Paper>

      <Space h={"md"} />

      <Title order={2}>{props.name} information</Title>

      <Space h={"md"} />
    </Container>
  );
};

export default HouseInfo;
