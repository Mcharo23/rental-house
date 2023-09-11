import React from "react";
import { Carousel } from "primereact/carousel";
import { GetMyHouseQuery } from "../../generated/graphql";
import { Image } from "primereact/image";

const HouseCarousel: React.FC<GetMyHouseQuery["myHouse"][0]> = ({
  imgUrl,
  _id,
}) => {
  const productTemplate = (item: string) => {
    return (
      <div className="border-1 w-full surface-border px-3 py-3 border-round m-2 text-center h-full">
        <div className="mb-3  h-full w-full rounded-lg">
          <Image
            src={item}
            alt={_id}
            className="rounded-lg h-full"
            preview
            loading="lazy"
            imageStyle={{
              width: "100%",
              height: "100%",
              borderRadius: "6px",
            }}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="card w-full bg-white rounded-lg h-full">
      <Carousel
        value={imgUrl}
        numVisible={3}
        numScroll={1}
        className="custom-carousel"
        circular
        autoplayInterval={5000}
        itemTemplate={productTemplate}
      />
    </div>
  );
};

export default HouseCarousel;
