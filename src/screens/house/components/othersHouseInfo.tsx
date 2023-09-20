import { FC, useEffect, useState } from "react";
import { Text } from "@mantine/core";
import { Divider } from "primereact/divider";
import colors from "../../../lib/color/colors";
import HouseCarousel from "../../../global/components/house-carousel";
import CustomPanel from "../../../global/components/panel";
import CustomPaper from "../../../global/components/paper";
import { OthersHouseInfoProps } from "../../../global/interfaces/type";
import { FaArrowCircleLeft, FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import CustomButton from "../../../components/custom-button";
import CustomButtons from "../../../global/components/custom-button";
import CustomInputNumber from "../../../global/components/input-number";
import showMessage from "../../../global/components/notification";
import { getUserData } from "../../../utils/localStorageUtils";

import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import CustomInputField from "../../../global/components/input-text";
import { AccountType } from "../../../lib/enums/gender";

const OthersHouseInfo: FC<OthersHouseInfoProps> = ({
  onClickBack,
  house,
  onChange,
}) => {
  const user = getUserData();
  const [name, setName] = useState<string>("");
  const [region, setRegion] = useState<string>("");
  const [district, setDistrict] = useState<string>("");
  const [ward, setWard] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const [show, setShow] = useState<boolean>(false);
  const [showContract, setShowContract] = useState<boolean>(false);
  const [duration, setDuration] = useState<number | null | undefined>(null);
  const [totalRent, setTotalRent] = useState<number>(0);

  const footerContent = (
    <div>
      <Button
        label="Cancel"
        icon="pi pi-times"
        onClick={() => {
          setShowContract(false);
          setShow(false);
        }}
        className="p-button-text"
      />
      <Button
        label="Accept and submit"
        icon="pi pi-check"
        onClick={() => {
          setShowContract(false);
          setShow(false);
          handleSubmit();
        }}
        autoFocus
      />
    </div>
  );

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

  const handleSubmit = () => {
    onChange(
      {
        _id: house._id,
        name: name,
        region: region,
        district: district,
        ward: ward,
        price: price,
        status: status,
        description: description,
      },
      {
        totTotal_rent: totalRent,
        Duration: duration ?? 0,
      }
    );
  };

  const handleOnSubmit = () => {
    if (duration === undefined || duration === null) {
      showMessage("Oops!😡", ["Renting duration is required"]);
    } else if (duration <= 0 || duration > 12) {
      showMessage("Oops!😡", [
        "duration must be greater that 0 and less than 13",
      ]);
    } else {
      setShowContract(true);
      setTotalRent(duration * house.price);
    }
  };

  const handleBookHouse = () => {
    if (house.user.username === user?.login.user.username) {
      showMessage("Oops!😡", ["You can not book your own house"]);
    } else {
      setShow(true);
    }
  };

  const renderSelectedHouse = () => {
    return (
      <div className="flex w-full h-full">
        <HouseCarousel {...house} />
      </div>
    );
  };

  if (showContract) {
    return (
      <div className="card flex justify-content-center">
        <Dialog
          header="Contract"
          visible={showContract}
          className="w-5/6 sm:w-5/6 md:w-5/6 lg:w-5/6 xl:w-3/5 2xl:w-1/2 "
          onHide={() => setShowContract(false)}
          footer={footerContent}
        >
          <div className="mb-5 pt-2 sm:grid sm:grid-cols-2 sm:gap-3 md:grid-cols-2 xl:gap-3 lg:grid-cols-2 lg:gap-3 xl:grid-cols-2 md:gap-3 2xl:grid-cols-2 2xl:gap-3">
            <div>
              <div className="gap-6 pt-4 flex flex-col">
                <Divider align="center">
                  <div className="text-light-blue font-sans text-sm text-center">
                    LANDLORD INFORMATION
                  </div>
                </Divider>
                <CustomInputField
                  onChange={() => {}}
                  name={"First Name"}
                  id={"fname"}
                  disabled={true}
                  value={house.user.firstName}
                />
                <CustomInputField
                  onChange={() => {}}
                  name={"Middle Name"}
                  id={"mname"}
                  disabled={true}
                  value={house.user.middleName}
                />
                <CustomInputField
                  onChange={() => {}}
                  name={"Last Name"}
                  id={"lname"}
                  disabled={true}
                  value={house.user.lastname}
                />
                <CustomInputField
                  onChange={() => {}}
                  name={"Gender"}
                  id={"gender"}
                  disabled={true}
                  value={house.user.gender}
                />
                <CustomInputField
                  onChange={() => {}}
                  name={"Phone number"}
                  id={"phone"}
                  disabled={true}
                  value={house.user.phoneNumber}
                />
                <CustomInputField
                  onChange={() => {}}
                  name={"Email"}
                  id={"email"}
                  disabled={true}
                  value={house.user.username}
                />
              </div>
              <div className="gap-6 pt-4 flex flex-col">
                <Divider align="center">
                  <div className="text-light-blue font-sans text-sm text-center">
                    TENANT INFORMATION
                  </div>
                </Divider>
                <CustomInputField
                  onChange={() => {}}
                  name={"First Name"}
                  id={"fname"}
                  disabled={true}
                  value={user?.login.user.firstName ?? ""}
                />
                <CustomInputField
                  onChange={() => {}}
                  name={"Middle Name"}
                  id={"mname"}
                  disabled={true}
                  value={user?.login.user.middleName ?? ""}
                />
                <CustomInputField
                  onChange={() => {}}
                  name={"Last Name"}
                  id={"lname"}
                  disabled={true}
                  value={user?.login.user.lastname ?? ""}
                />
                <CustomInputField
                  onChange={() => {}}
                  name={"Gender"}
                  id={"gender"}
                  disabled={true}
                  value={user?.login.user.gender ?? ""}
                />
                <CustomInputField
                  onChange={() => {}}
                  name={"Phone number"}
                  id={"phone"}
                  disabled={true}
                  value={user?.login.user.phoneNumber ?? ""}
                />
                <CustomInputField
                  onChange={() => {}}
                  name={"Email"}
                  id={"email"}
                  disabled={true}
                  value={user?.login.user.username ?? ""}
                />
              </div>
            </div>
            <div className="gap-6 pt-4 flex flex-col">
              <Divider align="center">
                <div className="text-light-blue font-sans text-sm text-center">
                  RENTAL INFORMATION
                </div>
              </Divider>
              <CustomInputField
                onChange={() => {}}
                name={"House Name"}
                id={"name"}
                disabled={true}
                value={house.name}
              />
              <CustomInputField
                onChange={() => {}}
                name={"Region"}
                id={"region"}
                disabled={true}
                value={house.Region}
              />
              <CustomInputField
                onChange={() => {}}
                name={"District"}
                id={"district"}
                disabled={true}
                value={house.District}
              />
              <CustomInputField
                onChange={() => {}}
                name={"Ward"}
                id={"ward"}
                disabled={true}
                value={house.Ward}
              />
              <CustomInputField
                onChange={() => {}}
                name={"Price"}
                id={"price"}
                disabled={true}
                value={String(house.price)}
              />
              <div className="bg-red-100 p-1 rounded-lg">
                <CustomInputField
                  onChange={() => {}}
                  name={"Total Rent"}
                  id={"total"}
                  disabled={true}
                  value={String(totalRent)}
                />
              </div>
            </div>
          </div>
        </Dialog>
      </div>
    );
  }

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

      <div
        className={`bg-white w-full h-full flex-col flex rounded-lg p-3 overflow-auto ${
          show === true ? "hidden" : ""
        }`}
      >
        <div
          className={`flex flex-col sm:grid sm:grid-cols-2 sm:gap-10 md:grid-cols-1 md:gap-6 lg:grid-cols-2 lg:gap-6 xl:grid-cols-2 xl:gap-6 2xl:grid-cols-2 2xl:gap-6`}
        >
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

        <div
          className={`justify-center items-center rounded-lg flex mt-5 ${
            house.user.username === user?.login.user.username ||
            user?.login.user.accountType !== AccountType.TENANT
              ? "hidden"
              : ""
          }`}
        >
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

      {/*BOOKING PAGE*/}
      <div
        className={`${
          show === true ? "" : "hidden"
        } bg-white w-full h-full flex-col flex rounded-lg p-3 overflow-auto`}
      >
        <div className="w-full">
          <FaArrowCircleLeft
            className="text-light-blue text-xl"
            onClick={() => setShow(false)}
          />
        </div>
        <div className="justify-center items-center rounded-lg flex mt-5 flex-col">
          <div className="w-full sm:w-72 md:w-60 lg:w-72 xl:w-96 2xl:w-96">
            <CustomInputNumber
              onChange={setDuration}
              name={"Duration"}
              id={"duration"}
              disabled={false}
            />
          </div>
        </div>

        <div className="justify-center items-center rounded-lg flex mt-5 flex-col">
          <div className="w-full sm:w-72 md:w-60 lg:w-72 xl:w-96 2xl:w-96">
            <CustomButtons
              backgroundColor={colors.lightBlue}
              borderRadius={8}
              name={"View Contract"}
              color={"white"}
              fontSize={14}
              border={"none"}
              paddingLeft={30}
              paddingRight={30}
              paddingTop={10}
              paddingBottom={10}
              onClick={handleOnSubmit}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default OthersHouseInfo;
