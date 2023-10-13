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

type swiperProps = {
  images: string[];
};

const Images = [
  "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80",
  "https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto.format&fit=crop&w=720&q=80",
  "https://images.unsplash.com/photo-1605774337664-7a846e9cdf17?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80",
  "https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80",
  "https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80",
];

const ImageSwiper: FC<swiperProps> = ({}) => {
  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={2}
      modules={[EffectFade, EffectCube, Autoplay, Pagination, Virtual]}
      autoplay={true}
      pagination={{ clickable: false }}
      effect="fade"
    >
      {Images.map((image, index) => {
        return (
          <SwiperSlide key={image} virtualIndex={index}>
            {/* <Image src={`${IMAGE_BASE.BASE}${image}`} height={220} /> */}
            <Image src={`${image}`} height={220} />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default ImageSwiper;
