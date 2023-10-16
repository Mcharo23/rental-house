import { FC } from "react";
import { Image } from "@mantine/core";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  EffectFade,
  EffectCube,
  Autoplay,
  Pagination,
  Virtual,
} from "swiper/modules";

import "swiper/scss";
import "swiper/css/effect-fade";
import "swiper/css/effect-cube";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import { IMAGE_BASE } from "../../lib/api-base";

type swiperProps = {
  images: string[];
};

const ImageSwiper: FC<swiperProps> = ({ images }) => {
  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={2}
      modules={[EffectFade, EffectCube, Autoplay, Pagination, Virtual]}
      autoplay={true}
      pagination={{ clickable: false }}
      effect="fade"
    >
      {images.map((image, index) => {
        return (
          <SwiperSlide key={image} virtualIndex={index}>
            <Image src={`${IMAGE_BASE.BASE}${image}`} height={220} />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default ImageSwiper;
