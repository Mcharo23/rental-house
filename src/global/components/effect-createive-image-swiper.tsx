import { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-creative";
import "swiper/css/pagination";
import { EffectCreative, Autoplay, Pagination } from "swiper/modules";

const swiperContainerStyle = {
  width: "100%",
  height: "100%",
};

const swiperSlideStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "22px",
  fontWeight: "bold",
  color: "#fff",
  width: "100%", // Set the width of the SwiperSlide to 100%
};

type EffectCreativeSwiperProps = {
  images: string[];
};

const EffectCreativeSwiper: FC<EffectCreativeSwiperProps> = ({ images }) => {
  return (
    <Swiper
      grabCursor={true}
      effect="creative"
      centeredSlides={true}
      slidesPerView={"auto"}
      creativeEffect={{
        prev: {
          shadow: true,
          translate: [0, 0, -400],
        },
        next: {
          translate: ["100%", 0, 0],
        },
      }}
      pagination={true}
      autoplay={{ delay: 6000 }}
      speed={1000}
      modules={[EffectCreative, Pagination, Autoplay]}
      style={{ ...swiperContainerStyle }}
    >
      {images.map((image, index) => {
        return (
          <SwiperSlide key={index} style={{ ...swiperSlideStyle }}>
            <img
              src={`${image}`}
              style={{
                width: "100%",
                height: "100%",
                borderTopLeftRadius: 6,
                borderTopRightRadius: 6,
                borderBottomLeftRadius: 6,
                borderBottomRightRadius: 6,
              }}
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default EffectCreativeSwiper;
