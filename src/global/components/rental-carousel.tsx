import { FC, useEffect, useState } from "react";
import {
  CarouselProvider,
  Dot,
  Slide,
  Slider,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { IMAGE_BASE } from "../../lib/api-base";

type RentalCarouselProps = {
  imgUrl: string[];
  scrollStep: number;
};

const CarouselScroll: FC<RentalCarouselProps> = ({ imgUrl, scrollStep }) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const naturalSlideWidth =
    window.innerWidth >= 640
      ? 70
      : window.innerWidth >= 768
      ? 60
      : window.innerWidth >= 2024
      ? 50
      : window.innerWidth >= 1280
      ? 80
      : window.innerWidth >= 1536
      ? 80
      : 50;

  const naturalSlideHeight =
    window.innerWidth >= 640
      ? 40
      : window.innerWidth >= 768
      ? 30
      : window.innerWidth >= 2024
      ? 20
      : window.innerWidth >= 1280
      ? 40
      : window.innerWidth >= 1536
      ? 40
      : 20;

  const namberOfViible =
    window.innerWidth >= 640
      ? 2
      : window.innerWidth >= 768
      ? 1
      : window.innerWidth >= 2024
      ? 1
      : window.innerWidth >= 1280
      ? 1
      : window.innerWidth >= 1536
      ? 2
      : 1;

  useEffect(() => {
    const interval = setInterval(() => {
      // Calculate the next slide index
      const nextSlide = (currentSlide + 1) % imgUrl.length;

      // Update the current slide
      setCurrentSlide(nextSlide);
    }, 2000); // Adjust the autoplay delay as needed

    // Clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, [currentSlide, imgUrl.length]);

  return (
    <CarouselProvider
      naturalSlideWidth={naturalSlideWidth}
      naturalSlideHeight={naturalSlideHeight}
      totalSlides={imgUrl.length}
      isPlaying={true}
      visibleSlides={namberOfViible}
      lockOnWindowScroll={false} // Disable aspect ratio lock
      step={scrollStep}
      className="flex items-center relative"
    >
      <Slider className={`w-full h-full ${namberOfViible > 1 ? "gap-2" : ""}`}>
        {imgUrl.map((img, index) => (
          <Slide index={index} key={index}>
            <div
              className={`w-full h-full ${namberOfViible > 1 ? "px-1" : ""}`}
            >
              <img
                src={`${IMAGE_BASE.BASE}${img}`}
                alt="image"
                className="w-full h-full rounded-lg"
              />
            </div>
          </Slide>
        ))}
      </Slider>
      <Dot slide={currentSlide} />
      <ButtonBack className="absolute bg-slate-200 rounded-lg left-1">
        <FiChevronLeft size={30} />
      </ButtonBack>
      <ButtonNext className="absolute bg-slate-200 rounded-lg right-1">
        <FiChevronRight size={30} />
      </ButtonNext>
    </CarouselProvider>
  );
};

export default CarouselScroll;
