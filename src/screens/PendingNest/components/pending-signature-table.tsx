import { FC, useEffect, useState } from "react";
import {
  BookedHouseQuery,
  RejectContractMutation,
  useRejectContractMutation,
  useSignContractMutation,
} from "../../../generated/graphql";
import {
  Table,
  Group,
  Avatar,
  Anchor,
  ActionIcon,
  Flex,
  Popover,
  Modal,
  Text,
  Space,
  Button,
} from "@mantine/core";
import { IconX, IconWritingSign } from "@tabler/icons-react";
import { IMAGE_BASE } from "../../../lib/api-base";
import { useQueryClient } from "@tanstack/react-query";
import { useDisclosure } from "@mantine/hooks";
import { CalculateDuration } from "../../../globals/functions/calculate-duration";
import { notifications } from "@mantine/notifications";
import { GraphQLError } from "graphql";
import showMessage from "../../../globals/components/notification";
import UpdateNotification from "../../../globals/components/update-notification";
import graphqlRequestClient from "../../../lib/clients/graphqlRequestClient";
import LoadingNotification from "../../../globals/components/load-notification";
import FormatDate from "../../../globals/functions/date-format";
import { IconEye } from "@tabler/icons-react";

type PendingSignatureTableProps = {
  props: BookedHouseQuery["myHouse"][0];
};

const PendingSignatureTable: FC<PendingSignatureTableProps> = ({ props }) => {
  const queryClient = useQueryClient();

  const [currentTenant, setCurrentTenant] =
    useState<BookedHouseQuery["myHouse"][0]["contract"][0]>();
  const [opened, { open, close }] = useDisclosure(false);
  const [buttonType, setButtonType] = useState<string>("");
  const [visible, setVisible] = useState<boolean>(false);

  //MUTATIONS
  const { mutate: RejectContract } = useRejectContractMutation(
    graphqlRequestClient,
    {
      onSuccess: (data: RejectContractMutation) => {
        queryClient.invalidateQueries(["bookedHouse"]);
        UpdateNotification(
          {
            id: "reject",
            message: data.rejectContract,
            title: "Successfully",
          },
          3000
        );
        close();
        setVisible(false);
        return;
      },
      onError: (error: GraphQLError) => {
        close();
        setVisible(false);
        const errorMessage =
          //@ts-ignore
          error.response.errors[0].extensions.originalError.message;
        //@ts-ignore
        const title = error.response.errors[0].message;

        notifications.hide("tenantIn");
        Array.isArray(errorMessage)
          ? showMessage(title, errorMessage)
          : showMessage("Conflict", [`${errorMessage} 😡😡😡`]);
      },
    }
  );

  const { mutate: SignContract } = useSignContractMutation(
    graphqlRequestClient,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["bookedHouse"]);
        UpdateNotification(
          {
            id: "sign-contract",
            message: "Data was saved successfully.",
            title: "Successfully",
          },
          3000
        );
        close();
        setVisible(false);
        return;
      },
      onError: (error: GraphQLError) => {
        close();
        setVisible(false);
        const errorMessage =
          //@ts-ignore
          error.response.errors[0].extensions.originalError.message;
        //@ts-ignore
        const title = error.response.errors[0].message;

        notifications.hide("tenantIn");
        Array.isArray(errorMessage)
          ? showMessage(title, errorMessage)
          : showMessage("Conflict", [`${errorMessage} 😡😡😡`]);
      },
    }
  );

  useEffect(() => {
    const currentContract = props.contract.find(
      (contract) => contract.isCurrent === true
    );

    setCurrentTenant(currentContract);
  }, [currentTenant, props.contract]);

  const filterCurrentTenant = () => {
    const currentContract = props.contract.find(
      (contract) => contract.isCurrent === true
    );

    setCurrentTenant(currentContract);
  };

  const handleSignContract = async () => {
    filterCurrentTenant();
    LoadingNotification({
      id: "sign-contract",
      message: "Please wait while saving your data",
      title: "Sign Contract",
    });

    await SignContract({
      input: {
        ContractID: currentTenant?._id ?? "",
      },
    });
  };

  const handleRejectContract = async () => {
    filterCurrentTenant();
    LoadingNotification({
      id: "reject",
      message: "Please wait while saving your data",
      title: "Reject contract",
    });

    await RejectContract({
      input: {
        ContractID: currentTenant?._id ?? "",
      },
    });
  };

  return (
    <>
      {visible && (
        <Modal
          opened={opened}
          onClose={() => {
            close();
            setVisible(false);
          }}
          title={`${
            buttonType === "sign"
              ? "Confirm contract"
              : buttonType === "reject"
              ? "Reject contract"
              : ""
          }`}
          transitionProps={{
            transition: "fade",
            duration: 600,
            timingFunction: "linear",
          }}
        >
          {buttonType === "sign" ? (
            <>
              <Text>
                Are you sure you declare that the contract has signed between
                you and{" "}
                <Anchor>
                  {currentTenant?.Tenant.firstName}{" "}
                  {currentTenant?.Tenant.middleName}{" "}
                  {currentTenant?.Tenant.lastname}
                </Anchor>{" "}
                ?
              </Text>
              <Space h={"md"} />
              <Flex
                direction={"row"}
                align={"center"}
                justify={"end"}
                gap={"md"}
              >
                <Button
                  variant="default"
                  onClick={() => {
                    close();
                    setVisible(false);
                  }}
                >
                  Cancel
                </Button>

                <Button
                  variant="filled"
                  color="green"
                  onClick={handleSignContract}
                >
                  Confirm
                </Button>
              </Flex>
            </>
          ) : buttonType === "reject" ? (
            <>
              <Text>
                Are you sure you want to cancel{" "}
                <Anchor>
                  {currentTenant?.Tenant.firstName}{" "}
                  {currentTenant?.Tenant.middleName}{" "}
                  {currentTenant?.Tenant.lastname}
                </Anchor>{" "}
                contract?
              </Text>
              <Space h={"md"} />
              <Flex
                direction={"row"}
                align={"center"}
                justify={"end"}
                gap={"md"}
              >
                <Button
                  variant="default"
                  onClick={() => {
                    close();
                    setVisible(false);
                  }}
                >
                  Cancel
                </Button>

                <Button
                  variant="filled"
                  color="green"
                  onClick={handleRejectContract}
                >
                  Reject
                </Button>
              </Flex>
            </>
          ) : (
            ""
          )}
        </Modal>
      )}
      <Table.Tr>
        <Table.Td>
          <Group gap={"sm"}>
            <Avatar
              size={26}
              src={`${IMAGE_BASE.BASE}${props.imgUrl[0]}`}
              radius={26}
            />
            <Anchor component="button" fz="sm">
              {props.name}
            </Anchor>
          </Group>
        </Table.Td>
        <Table.Td>
          <Anchor component="button" fz="sm">
            {props.Region}
          </Anchor>
        </Table.Td>
        <Table.Td>
          <Anchor component="button" fz="sm">
            {props.District}
          </Anchor>
        </Table.Td>
        <Table.Td>
          <Anchor component="button" fz="sm">
            {props.Ward}
          </Anchor>
        </Table.Td>
        <Table.Td>
          <Group gap={"sm"}>
            <Avatar radius="xl" />
            <Flex direction={"column"}>
              <Anchor fz="sm">
                {currentTenant?.Tenant.firstName}{" "}
                {currentTenant?.Tenant.middleName}{" "}
                {currentTenant?.Tenant.lastname}
              </Anchor>
            </Flex>
            <ActionIcon size={30} variant="default">
              <Popover trapFocus position="bottom" withArrow shadow="md">
                <Popover.Target>
                  <IconEye />
                </Popover.Target>

                <Popover.Dropdown>
                  <Anchor
                    fz="sm"
                    href={`tel:${currentTenant?.Tenant.phoneNumber}`}
                  >
                    {currentTenant?.Tenant.phoneNumber}
                  </Anchor>

                  <Space h="sm" />

                  <Text>Duration: {currentTenant?.Duration} months</Text>
                </Popover.Dropdown>
              </Popover>
            </ActionIcon>
          </Group>
        </Table.Td>
        <Table.Td>
          {currentTenant?.createdAt
            ? FormatDate(new Date(currentTenant.createdAt))
            : "N/A"}
        </Table.Td>
        <Table.Td>
          {CalculateDuration(currentTenant?.createdAt)?.days} days
        </Table.Td>
        <Table.Td>
          <Group gap={"sm"}>
            <ActionIcon size={42} variant="default">
              <IconWritingSign
                onClick={() => {
                  open();
                  setVisible(true);
                  setButtonType("sign");
                }}
                color="green"
              />
            </ActionIcon>

            <ActionIcon size={42} variant="default">
              <IconX
                onClick={() => {
                  open();
                  setVisible(true);
                  setButtonType("reject");
                }}
                color="red"
              />
            </ActionIcon>
          </Group>
        </Table.Td>
      </Table.Tr>
    </>
  );
};

export default PendingSignatureTable;
