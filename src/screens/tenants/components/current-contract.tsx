import { FC, useEffect, useState } from "react";
import { MyContractQuery } from "../../../generated/graphql";
import { Indicator, Divider, Modal } from "@mantine/core";
import { FiMapPin, FiCalendar } from "react-icons/fi";
import FormatDate from "../../../global/components/date-format";
import CarouselScroll from "../../../global/components/rental-carousel";
import { Text } from "@mantine/core";
import { FaPhoneAlt, FaEnvelope, FaUser } from "react-icons/fa";
import CustomPaper from "../../../global/components/paper";
import { useDisclosure } from "@mantine/hooks";

type ContractProps = {
  props: MyContractQuery["myContract"][0];
};

const CurrentContractUI: FC<ContractProps> = ({ props }) => {
  const [dayDifference, setDaysDifference] = useState<number>(0);
  const [opened, { open, close }] = useDisclosure(false);

  useEffect(() => {
    const Date_of_signing = new Date(props.Date_of_signing);
    const Date_of_contract = new Date(props.Date_of_contract);
    const End_of_contract = new Date(props.End_of_contract);
    const Current_date = new Date();
    const Created_At = new Date(props.createdAt);

    if (props.Date_of_signing === null) {
      const timeDifference = Current_date.getTime() - Created_At.getTime();
      const daysDifference = timeDifference / (1000 * 3600 * 24);

      setDaysDifference(Math.floor(daysDifference));
    } else if (
      props.Date_of_contract === null &&
      props.Date_of_signing !== null
    ) {
      const timeDifference = Current_date.getTime() - Date_of_signing.getTime();
      const daysDifference = timeDifference / (1000 * 3600 * 24);

      setDaysDifference(Math.floor(daysDifference));
    } else {
      const timeDifference =
        End_of_contract.getTime() - Date_of_contract.getTime();
      const daysDifference = timeDifference / (1000 * 3600 * 24);

      setDaysDifference(Math.floor(daysDifference));
    }
  }, [
    props.Date_of_contract,
    props.Date_of_signing,
    props.End_of_contract,
    props.createdAt,
  ]);

  return (
    <div className="flex full h-full flex-col w-full bg-white rounded-lg p-1 relative">
      <div>
        <CarouselScroll
          imgUrl={props.House.imgUrl}
          visibleSlides={1}
          scrollStep={1}
        />
      </div>
      <Indicator
        className={`absolute w-7 p-1 top-2 rounded-full left-3 bg-red-700 items-center justify-center flex animate-pulse ${
          dayDifference > 0 || props.Date_of_contract !== null ? "" : "hidden"
        }`}
        processing
        color="cyan"
        withBorder
        size={18}
      >
        <Text className="text-white">{dayDifference}</Text>
      </Indicator>

      <Indicator
        className={`absolute w-7 p-1 top-2 rounded-full left-5 bg-red-700 items-center justify-center flex animate-bounce ${
          props.Date_of_signing === null && props.Date_of_contract === null
            ? ""
            : "hidden"
        }`}
        processing
        color="indigo"
        withBorder
        size={18}
      >
        <Text className="text-white">pending</Text>
      </Indicator>

      <div className="flex w-full h-auto flex-col mt-2 p-2 gap-2">
        <Text className="text-slate-800 text-lg">{props.House.name}</Text>
        {/* <CustomPanel title={"Descripion"} content={props.Description} /> */}
        <div className="relative w-full hover:bg-stone-200">
          <span className="absolute inset-y-0 flex items-center pl-2">
            <FiMapPin className="text-light-blue" />
          </span>
          <div className="h-full flex flex-row gap-2 rounded-lg p-2 pl-8 w-full cursor-pointer">
            <Text>{props.House.Region},</Text>
            <Text>{props.House.District},</Text>
            <Text>{props.House.Ward}</Text>
          </div>
        </div>

        <Divider my="xs" label="Owner" labelPosition="center" />

        <div className="relative w-full hover:bg-stone-200 rounded-lg border border-slate-200">
          <span className="absolute inset-y-0 flex items-center pl-2 text-text-light-blue">
            <FaUser className="text-light-blue" />
          </span>
          <div className="h-full flex flex-row gap-2 rounded-lg p-2 pl-8 w-full cursor-pointer ">
            <Divider orientation="vertical" />
            <Text>{`${props.House.user.firstName} ${props.House.user.middleName} ${props.House.user.lastname}`}</Text>
          </div>
        </div>

        <div>
          <Modal opened={opened} onClose={close} title="Owner details" centered>
            <div className="flex gap-2 flex-col">
              <CustomPaper
                title={"First Name"}
                content={props.House.user.firstName}
              />
              <CustomPaper
                title={"Middle Name"}
                content={props.House.user.middleName}
              />
              <CustomPaper
                title={"Last Name"}
                content={props.House.user.lastname}
              />

              <div className="border border-slate-200 hover:bg-stone-200 flex flex-row rounded-lg px-2 py-1">
                <div className="text-stone-800 w-32 flex gap-2  items-center">
                  <FaPhoneAlt className="text-light-blue" />
                  <Text>Contact</Text>
                </div>
                <Divider orientation="vertical" />

                <a
                  href={`tel:${props.House.user.phoneNumber}`}
                  className="w-full flex items-center pl-3"
                  onClick={() =>
                    (window.location.href = `tel:${props.House.user.phoneNumber}`)
                  }
                >
                  <Text className="text-light-blue">
                    {props.House.user.phoneNumber}
                  </Text>
                </a>
              </div>
              <div className="border border-slate-200 hover:bg-stone-200 flex flex-row rounded-lg px-2 py-1">
                <div className="text-stone-800 w-32 gap-2 flex items-center">
                  <FaEnvelope className="text-light-blue" />
                  <Text>Email</Text>
                </div>
                <Divider orientation="vertical" />
                <a
                  href={`mailto:${props.House.user.username}`}
                  className="w-full flex items-center pl-3"
                >
                  <Text className="text-light-blue">
                    {props.House.user.username}
                  </Text>
                </a>
              </div>
            </div>
          </Modal>

          <div className="flex justify-end text-light-blue ">
            <Text className="cursor-pointer" onClick={open}>
              See more...
            </Text>
          </div>
        </div>

        <div
          className={`relative w-full hover:bg-stone-200 rounded-lg border border-slate-200 ${
            props.Date_of_signing === null || props.Date_of_contract === null
              ? "hidden"
              : ""
          }`}
        >
          <span className="absolute inset-y-0 flex items-center pl-2 text-text-light-blue">
            <FiCalendar className="text-light-blue" />
          </span>
          <div className="h-full flex flex-row gap-2 rounded-lg p-2 pl-8 w-full cursor-pointer ">
            <Divider orientation="vertical" />
            <div className="flex flex-col">
              <Text>
                Statrs: {FormatDate(new Date(props.Date_of_contract))}
              </Text>
              <Text>Ends: {FormatDate(new Date(props.End_of_contract))}</Text>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentContractUI;
