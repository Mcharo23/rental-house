import React from "react";
import { Carousel } from "primereact/carousel";
import { GetMyHouseQuery } from "../../generated/graphql";
import { Image } from "primereact/image";

const HouseCarousel: React.FC<GetMyHouseQuery["myHouse"][0]> = ({
  imgUrl,
  _id,
}) => {
  const responsiveOptions = [
    {
      breakpoint: "1199px",
      numVisible: 3,
      numScroll: 1,
    },
    {
      breakpoint: "991px",
      numVisible: 1,
      numScroll: 1,
    },
    {
      breakpoint: "767px",
      numVisible: 1,
      numScroll: 1,
    },
  ];

  const productTemplate = (item: string) => {
    return (
      <div className="border-1 surface-border border-round py-5 px-3  h-full flex ">
        <div className="mb-3 h-full w-full rounded-lg">
          {/* <img src={item} alt={_id} className="w-full h-full flex rounded-lg" /> */}
          <Image
            src={item}
            alt={_id}
            className="w-full h-full flex rounded-lg"
            preview
            imageStyle={{ width: "100%", height: "100%", borderRadius: "6px" }}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="card w-full h-full border ">
      <Carousel
        value={imgUrl} // Make sure imgUrl is an array of image URLs
        numVisible={3}
        numScroll={1}
        responsiveOptions={responsiveOptions}
        className="custom-carousel"
        circular
        autoplayInterval={3000}
        itemTemplate={productTemplate}
      />
    </div>
  );
};

export default HouseCarousel;
