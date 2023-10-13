import { FC, useEffect, useState } from "react";
import { Text } from "@mantine/core";
import CustomButton from "../../../components/custom-button";
import colors from "../../../lib/color/colors";
import HouseCarousel from "../../../global/components/house-carousel";
import CustomInputField from "../../../global/components/input-text";
import TextArea from "../../../global/components/text-area";
import { MyHouseInfoProps } from "../../../global/interfaces/type";

const MyHouseInfo: FC<MyHouseInfoProps> = ({
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
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    setIsDisabled(true);
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

  const handleAddhouse = () => {
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
        <div className="gap-6 pt-4 flex flex-col sm:grid sm:grid-cols-2 sm:gap-10 md:grid-cols-1 md:gap-6 lg:grid-cols-2 lg:gap-6 xl:grid-cols-2 xl:gap-6 2xl:grid-cols-3 2xl:gap-6 ">
          <CustomInputField
            onChange={setName}
            name={"House Name"}
            id={"name"}
            disabled={isDisabled}
            value={name}
          />
          <CustomInputField
            onChange={setRegion}
            name={"Region"}
            id={"region"}
            disabled={true}
            value={region}
          />
          <CustomInputField
            onChange={setDistrict}
            name={"District"}
            id={"district"}
            disabled={true}
            value={district}
          />
          <CustomInputField
            onChange={setWard}
            name={"Ward"}
            id={"ward"}
            disabled={true}
            value={ward}
          />
          <CustomInputField
            onChange={setPrice}
            name={"Price"}
            id={"price"}
            disabled={isDisabled}
            value={price}
          />
          <CustomInputField
            onChange={setStatus}
            name={"Status"}
            id={"status"}
            disabled={isDisabled}
            value={status}
          />
          <TextArea
            onChange={setDescription}
            name={"Desription"}
            id={"description"}
            disabled={isDisabled}
            value={description}
          />
        </div>
        <div className="justify-center items-center flex mt-5">
          <CustomButton
            backgroundColor={colors.lightBlue}
            borderRadius={8}
            name={isDisabled === true ? "Edit" : "Save"}
            color={"white"}
            fontSize={14}
            border={"none"}
            paddingLeft={30}
            paddingRight={30}
            paddingTop={10}
            paddingBottom={10}
            onClick={() =>
              isDisabled === true ? setIsDisabled(false) : handleAddhouse()
            }
          />
        </div>
      </div>
    </>
  );
};

export default MyHouseInfo;
