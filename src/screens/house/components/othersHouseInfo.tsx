import { FC, useEffect, useState } from "react";
import { Text } from "@mantine/core";
import { Divider } from "primereact/divider";
import colors from "../../../lib/color/colors";
import HouseCarousel from "../../../global/components/house-carousel";
import CustomPanel from "../../../global/components/panel";
import CustomPaper from "../../../global/components/paper";
import { OthersHouseInfoProps } from "../../../global/interfaces/type";
import { FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import CustomButton from "../../../components/custom-button";
import CustomButtons from "../../../global/components/custom-button";

const OthersHouseInfo: FC<OthersHouseInfoProps> = ({
  onClickBack,
  house,
  onChange,
}) => {
  const [name, setName] = useState<string>("");
  const [region, setRegion] = useState<string>("");
  const [district, setDistrict] = useState<string>("");
  const [ward, setWard] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  useEffect(() => {
    setName(house.name);
    setRegion(house.Region);
    setDistrict(house.District);
    setWard(house.Ward);
    setPrice(String(house.price));
    setStatus(house.status);
    setDescription(house.Description);
  }, [
    house.name,
    house.Region,
    house.District,
    house.Ward,
    house.price,
    house.status,
    house.Description,
  ]);

  const handleBookHouse = () => {
    onChange({
      _id: house._id,
      name: name,
      region: region,
      district: district,
      ward: ward,
      price: price,
      status: status,
      description: description,
    });
  };

  const renderSelectedHouse = () => {
    return (
      <div className="flex w-full h-full">
        <HouseCarousel {...house} />
      </div>
    );
  };

  return (
    <>
      <div className="flex flex-row place-content-between gap-2">
        <CustomButton
          backgroundColor={colors.lightBlue}
          borderRadius={6}
          name={"Go back"}
          color={colors.white}
          fontSize={14}
          border={"none"}
          paddingLeft={10}
          paddingRight={10}
          paddingTop={5}
          paddingBottom={5}
          onClick={() => onClickBack(false)}
        />
      </div>

      <div className="w-full border">{renderSelectedHouse()}</div>

      <div className="flex flex-row place-content-between gap-2">
        <Text className="font-semibold font-serif ">{house.name} Info</Text>
      </div>

      <div className="bg-white w-full h-full flex-col flex rounded-lg p-3 overflow-auto ">
        <div className="flex flex-col sm:grid sm:grid-cols-2 sm:gap-10 md:grid-cols-1 md:gap-6 lg:grid-cols-2 lg:gap-6 xl:grid-cols-2 xl:gap-6 2xl:grid-cols-2 2xl:gap-6">
          <div className="gap-6 pt-4 flex flex-col  ">
            <Divider align="center">
              <div className="text-light-blue font-sans text-xl text-center">
                House Details
              </div>
            </Divider>
            <CustomPaper title={"House Name"} content={house.name} />
            <CustomPaper title={"Region"} content={house.Region} />
            <CustomPaper title={"District"} content={house.District} />
            <CustomPaper title={"Ward"} content={house.Ward} />
            <CustomPaper title={"Price"} content={String(house.price)} />
            <CustomPaper title={"Status"} content={house.status} />
            <CustomPanel title={"Descripion"} content={house.Description} />
          </div>
          <div className="gap-6 pt-4 flex flex-col  ">
            <Divider align="center">
              <div className="text-light-blue font-sans text-xl text-center">
                Owner Details
              </div>
            </Divider>
            <CustomPaper title={"First Name"} content={house.user.firstName} />
            <CustomPaper
              title={"Middle Name"}
              content={house.user.middleName}
            />
            <CustomPaper title={"Last Name"} content={house.user.lastname} />

            <div className="border border-slate-200 hover:bg-stone-200 flex flex-row rounded-lg px-2 py-1">
              <div className="text-stone-800 w-32 flex gap-2  items-center">
                <FaPhoneAlt className="text-light-blue" />
                <Text>Contact</Text>
              </div>
              <Divider layout="vertical" />

              <a
                href={`tel:${house.user.phoneNumber}`}
                className="w-full flex items-center pl-3"
                onClick={() =>
                  (window.location.href = `tel:${house.user.phoneNumber}`)
                }
              >
                <Text className="text-light-blue">
                  {house.user.phoneNumber}
                </Text>
              </a>
            </div>
            <div className="border border-slate-200 hover:bg-stone-200 flex flex-row rounded-lg px-2 py-1">
              <div className="text-stone-800 w-32 gap-2 flex items-center">
                <FaEnvelope className="text-light-blue" />
                <Text>Email</Text>
              </div>
              <Divider layout="vertical" />
              <a
                href={`mailto:${house.user.username}`}
                className="w-full flex items-center pl-3"
              >
                <Text className="text-light-blue">{house.user.username}</Text>
              </a>
            </div>
          </div>
        </div>

        <div className="justify-center items-center rounded-lg flex mt-5 flex-col">
          <div className="w-full sm:w-72 md:w-60 lg:w-72 xl:w-96 2xl:w-96">
            <CustomButtons
              backgroundColor={colors.lightBlue}
              borderRadius={8}
              name={"Book Now"}
              color={"white"}
              fontSize={14}
              border={"none"}
              paddingLeft={30}
              paddingRight={30}
              paddingTop={10}
              paddingBottom={10}
              onClick={handleBookHouse}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default OthersHouseInfo;
