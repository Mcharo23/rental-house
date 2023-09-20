import { ConfirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import { FC, useEffect, useRef, useState } from "react";
import CarouselScroll from "../../../global/components/rental-carousel";
import { Divider, Indicator, Modal } from "@mantine/core";
import { FiCalendar, FiMapPin } from "react-icons/fi";
import { FaEnvelope, FaPhoneAlt, FaUser } from "react-icons/fa";
import { Text } from "@mantine/core";
import {
  BookedHouseQuery,
  TenantOutMutation,
  useTenantOutMutation,
} from "../../../generated/graphql";
import CustomPaper from "../../../global/components/paper";
import CustomButtons from "../../../global/components/custom-button";
import colors from "../../../lib/color/colors";
import { useQueryClient } from "@tanstack/react-query";
import { useDisclosure } from "@mantine/hooks";
import LoadingNotification from "../../../global/components/load-notification";
import UpdateNotification from "../../../global/components/update-notification";
import { GraphQLError } from "graphql";
import { notifications } from "@mantine/notifications";
import showMessage from "../../../global/components/notification";
import graphqlRequestClient from "../../../lib/clients/graphqlRequestClient";
import FormatDate from "../../../global/components/date-format";

type BookedProps = {
  props: BookedHouseQuery["myHouse"][0];
};

const CurrentHouseUI: FC<BookedProps> = ({ props }) => {
  const queryClient = useQueryClient();

  const [currentTenant, setCurrentTenant] =
    useState<BookedHouseQuery["myHouse"][0]["contract"][0]>();
  const [dayDifference, setDaysDifference] = useState<number>(0);
  const [opened, { open, close }] = useDisclosure(false);
  const [message, setMessage] = useState<string>("");
  const [header, setHeader] = useState<string>("");

  const [visible, setVisible] = useState<boolean>(false);
  const toast = useRef<Toast>(null);
  const icon = "pi pi-exclamation-triangle";

  const { mutate } = useTenantOutMutation(graphqlRequestClient, {
    onSuccess: (data: TenantOutMutation) => {
      queryClient.invalidateQueries(["bookedHouse"]);
      UpdateNotification(
        {
          id: "tenantIn",
          message: data.tenantOut,
          title: "Successfully",
        },
        3000
      );

      return;
    },
    onError: (error: GraphQLError) => {
      const errorMessage =
        error.response.errors[0].extensions.originalError.message;
      const title = error.response.errors[0].message;

      notifications.hide("tenantOut");
      Array.isArray(errorMessage)
        ? showMessage(title, errorMessage)
        : showMessage("Conflict", [`${errorMessage} 😡😡😡`]);
    },
  });

  useEffect(() => {
    const currentContract = props.contract.find(
      (contract) => contract.isCurrent === true
    );

    const Date_of_contract = new Date(currentContract?.Date_of_contract);
    const End_of_contract = new Date(currentContract?.End_of_contract);

    const timeDifference =
      End_of_contract.getTime() - Date_of_contract.getTime();
    const daysDifference = timeDifference / (1000 * 3600 * 24);

    setCurrentTenant(currentContract);
    setDaysDifference(Math.floor(daysDifference));
  }, [currentTenant, props.contract]);

  const refetchTenant = () => {
    filterCurrentTenant();
    open();
  };

  const filterCurrentTenant = () => {
    const currentContract = props.contract.find(
      (contract) => contract.isCurrent === true
    );

    const Date_of_contract = new Date(currentContract?.Date_of_contract);
    const End_of_contract = new Date(currentContract?.End_of_contract);

    const timeDifference =
      End_of_contract.getTime() - Date_of_contract.getTime();
    const daysDifference = timeDifference / (1000 * 3600 * 24);

    setCurrentTenant(currentContract);
    setDaysDifference(Math.floor(daysDifference));
  };

  const tenantOut = () => {
    setMessage("This will invalidate the contract");
    setHeader("Tenant out");
    setVisible(true);
  };

  const reject = () => {
    toast.current?.show({
      severity: "warn",
      summary: "Rejected",
      detail: "You have rejected",
      life: 3000,
    });
  };

  const handleTenantOut = async () => {
    filterCurrentTenant();

    LoadingNotification({
      id: "tenantOut",
      message: "Please wait while saving your data",
      title: "Tenant In",
    });

    await mutate({
      input: {
        ContractID: currentTenant?._id ?? "",
      },
    });
  };

  return (
    <div className="flex full h-full flex-col w-full bg-white rounded-lg p-1 relative">
      <Toast ref={toast} />
      <ConfirmDialog
        visible={visible}
        onHide={() => setVisible(false)}
        message={message}
        header={header}
        icon={icon}
        accept={handleTenantOut}
        reject={reject}
      />
      <div>
        <CarouselScroll
          imgUrl={props.imgUrl}
          visibleSlides={1}
          scrollStep={1}
        />
      </div>
      <Indicator
        className={`absolute w-7 p-1 top-2 rounded-full left-3 bg-red-700 items-center justify-center flex animate-pulse ${
          dayDifference > -1 ? "" : "hidden"
        }`}
        processing
        color="cyan"
        withBorder
        size={18}
      >
        <Text className="text-white">{dayDifference}</Text>
      </Indicator>

      <Indicator
        className={`absolute w-7 p-1 top-2 rounded-full left-3 bg-red-700 items-center justify-center flex animate-ping ${
          dayDifference < 0 ? "" : "hidden"
        }`}
        processing
        color="indigo"
        withBorder
        size={18}
      >
        <Text className="text-white">{dayDifference}</Text>
      </Indicator>

      <div className="flex w-full h-auto flex-col mt-2 p-2 gap-2">
        <Text className="text-slate-800 text-lg">{props.name}</Text>
        {/* <CustomPanel title={"Descripion"} content={props.Description} /> */}
        <div className="relative w-full hover:bg-stone-200">
          <span className="absolute inset-y-0 flex items-center pl-2">
            <FiMapPin className="text-light-blue" />
          </span>
          <div className="h-full flex p-2 pl-8 w-full cursor-pointer">
            <Text>
              {props.Region}, {props.District}, {props.Ward}
            </Text>
          </div>
        </div>

        <Divider my="xs" label="Current Tenant" labelPosition="center" />

        <div>
          <Modal
            opened={opened}
            onClose={close}
            title="Tenant details"
            centered
          >
            <div className="flex gap-2 flex-col">
              <CustomPaper
                title={"First Name"}
                content={currentTenant?.Tenant.firstName ?? ""}
              />
              <CustomPaper
                title={"Middle Name"}
                content={currentTenant?.Tenant.middleName ?? ""}
              />
              <CustomPaper
                title={"Last Name"}
                content={currentTenant?.Tenant.lastname ?? ""}
              />

              <div className="border border-slate-200 hover:bg-stone-200 flex flex-row rounded-lg px-2 py-1">
                <div className="text-stone-800 w-32 flex gap-2  items-center">
                  <FaPhoneAlt className="text-light-blue" />
                  <Text>Contact</Text>
                </div>
                <Divider orientation="vertical" />

                <a
                  href={`tel:${currentTenant?.Tenant.phoneNumber}`}
                  className="w-full flex items-center pl-3"
                  onClick={() =>
                    (window.location.href = `tel:${currentTenant?.Tenant.username}`)
                  }
                >
                  <Text className="text-light-blue">
                    {currentTenant?.Tenant.phoneNumber}
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
                  href={`mailto:${currentTenant?.Tenant.username}`}
                  className="w-full flex items-center pl-3"
                >
                  <Text className="text-light-blue">
                    {currentTenant?.Tenant.username}
                  </Text>
                </a>
              </div>
            </div>
          </Modal>

          <div className="flex justify-end text-light-blue ">
            <Text className="cursor-pointer" onClick={() => refetchTenant()}>
              See more...
            </Text>
          </div>
        </div>

        <div className="relative w-full hover:bg-stone-200 rounded-lg border border-slate-200">
          <span className="absolute inset-y-0 flex items-center pl-2 text-text-light-blue">
            <FaUser className="text-light-blue" />
          </span>
          <div className="h-full flex flex-row gap-2 rounded-lg p-2 pl-8 w-full cursor-pointer ">
            <Divider orientation="vertical" />
            <Text>{`${currentTenant?.Tenant.firstName} ${currentTenant?.Tenant.middleName} ${currentTenant?.Tenant.lastname}`}</Text>
          </div>
        </div>

        <div className="relative w-full hover:bg-stone-200 rounded-lg border border-slate-200">
          <span className="absolute inset-y-0 flex items-center pl-2 text-text-light-blue">
            <FiCalendar className="text-light-blue" />
          </span>
          <div className="h-full flex flex-row gap-2 rounded-lg p-2 pl-8 w-full cursor-pointer ">
            <Divider orientation="vertical" />
            <div className="flex flex-col">
              <Text>
                Statrs:{" "}
                {currentTenant?.Date_of_contract
                  ? FormatDate(new Date(currentTenant.Date_of_contract))
                  : "N/A"}
              </Text>
              <Text>
                Statrs:{" "}
                {currentTenant?.End_of_contract
                  ? FormatDate(new Date(currentTenant.End_of_contract))
                  : "N/A"}
              </Text>
            </div>
          </div>
        </div>

        <div>
          <Modal
            opened={opened}
            onClose={close}
            title="Tenant details"
            centered
          >
            <div className="flex gap-2 flex-col">
              <CustomPaper
                title={"First Name"}
                content={currentTenant?.Tenant.firstName ?? ""}
              />
              <CustomPaper
                title={"Middle Name"}
                content={currentTenant?.Tenant.middleName ?? ""}
              />
              <CustomPaper
                title={"Last Name"}
                content={currentTenant?.Tenant.lastname ?? ""}
              />

              <div className="border border-slate-200 hover:bg-stone-200 flex flex-row rounded-lg px-2 py-1">
                <div className="text-stone-800 w-32 flex gap-2  items-center">
                  <FaPhoneAlt className="text-light-blue" />
                  <Text>Contact</Text>
                </div>
                <Divider orientation="vertical" />

                <a
                  href={`tel:${currentTenant?.Tenant.phoneNumber}`}
                  className="w-full flex items-center pl-3"
                  onClick={() =>
                    (window.location.href = `tel:${currentTenant?.Tenant.username}`)
                  }
                >
                  <Text className="text-light-blue">
                    {currentTenant?.Tenant.phoneNumber}
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
                  href={`mailto:${currentTenant?.Tenant.username}`}
                  className="w-full flex items-center pl-3"
                >
                  <Text className="text-light-blue">
                    {currentTenant?.Tenant.username}
                  </Text>
                </a>
              </div>
            </div>
          </Modal>

          <div className="flex justify-end text-light-blue ">
            <Text className="cursor-pointer" onClick={() => refetchTenant()}>
              See more...
            </Text>
          </div>
        </div>

        <div className="justify-center items-center rounded-lg flex flex-row gap-5">
          <div className="w-full sm:w-72 md:w-full lg:w-full xl:w-full 2xl:w-full">
            <CustomButtons
              backgroundColor={colors.lightBlue}
              borderRadius={8}
              name={"Tenant out"}
              color={"white"}
              fontSize={14}
              border={"none"}
              paddingLeft={30}
              paddingRight={30}
              paddingTop={10}
              paddingBottom={10}
              onClick={tenantOut}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentHouseUI;
