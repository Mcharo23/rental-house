import {
  Table,
  Group,
  Avatar,
  Anchor,
  ActionIcon,
  Text,
  Flex,
  Popover,
  Space,
} from "@mantine/core";
import { IconEye, IconUserX, IconX } from "@tabler/icons-react";
import { FC, useEffect, useState } from "react";
import { IMAGE_BASE } from "../../../lib/api-base";
import {
  BookedHouseQuery,
  TenantOutMutation,
  useTenantOutMutation,
} from "../../../generated/graphql";
import FormatDate from "../../../globals/functions/date-format";
import { CalculateDaysDifference } from "../../../globals/functions/calculate-days-difference";
import LoadingNotification from "../../../globals/components/load-notification";
import { notifications } from "@mantine/notifications";
import { GraphQLError } from "graphql";
import showMessage from "../../../globals/components/notification";
import UpdateNotification from "../../../globals/components/update-notification";
import graphqlRequestClient from "../../../lib/clients/graphqlRequestClient";
import { useQueryClient } from "@tanstack/react-query";

type LuxeLivingTableProps = {
  house: BookedHouseQuery["myHouse"][0];
};

const LuxeLivingTable: FC<LuxeLivingTableProps> = ({ house }) => {
  const queryClient = useQueryClient();

  const [currentContract, setCurrentContract] =
    useState<BookedHouseQuery["myHouse"][0]["contract"][0]>();

  useEffect(() => {
    const currentContract = house.contract.find(
      (contract) => contract.isCurrent === true
    );

    setCurrentContract(currentContract);
  }, [currentContract, house.contract]);

  const filterCurrentTenant = () => {
    const currentContract = house.contract.find(
      (contract) => contract.isCurrent === true
    );

    setCurrentContract(currentContract);
  };

  const { mutate } = useTenantOutMutation(graphqlRequestClient, {
    onSuccess: (data: TenantOutMutation) => {
      queryClient.invalidateQueries(["bookedHouse"]);
      UpdateNotification(
        {
          id: "tenantOut",
          message: data.tenantOut,
          title: "Successfully",
        },
        3000
      );

      return;
    },
    onError: (error: GraphQLError) => {
      const errorMessage =
        //@ts-ignore
        error.response.errors[0].extensions.originalError.message;
      //@ts-ignore
      const title = error.response.errors[0].message;

      notifications.hide("tenantOut");
      Array.isArray(errorMessage)
        ? showMessage(title, errorMessage)
        : showMessage("Conflict", [`${errorMessage} 😡😡😡`]);
    },
  });

  // METHODS
  const handleTenantOut = async () => {
    filterCurrentTenant();

    LoadingNotification({
      id: "tenantOut",
      message: "Please wait while saving your data",
      title: "Tenant In",
    });

    await mutate({
      input: {
        ContractID: currentContract?._id ?? "",
      },
    });
  };

  return (
    <>
      <Table.Tr>
        <Table.Td>
          <Group gap={"sm"}>
            <Avatar
              size={26}
              src={`${IMAGE_BASE.BASE}${house.imgUrl[0]}`}
              radius={26}
            />
            <Anchor component="button" fz="sm">
              {house.name}
            </Anchor>
          </Group>
        </Table.Td>
        <Table.Td>
          <Anchor component="button" fz="sm">
            {house.Region}
          </Anchor>
        </Table.Td>
        <Table.Td>
          <Anchor component="button" fz="sm">
            {house.District}
          </Anchor>
        </Table.Td>
        <Table.Td>
          <Anchor component="button" fz="sm">
            {house.Ward}
          </Anchor>
        </Table.Td>
        <Table.Td>
          <Group gap={"sm"}>
            <Avatar radius="xl" />
            <Flex direction={"column"}>
              <Anchor fz="sm">
                {currentContract?.Tenant.firstName}{" "}
                {currentContract?.Tenant.middleName}{" "}
                {currentContract?.Tenant.lastname}
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
                    href={`tel:${currentContract?.Tenant.phoneNumber}`}
                  >
                    {currentContract?.Tenant.phoneNumber}
                  </Anchor>

                  <Space h="sm" />

                  <Text>Duration: {currentContract?.Duration} months</Text>
                </Popover.Dropdown>
              </Popover>
            </ActionIcon>
          </Group>
        </Table.Td>
        <Table.Td>
          {currentContract?.createdAt
            ? FormatDate(new Date(currentContract.Date_of_contract))
            : "N/A"}
        </Table.Td>
        <Table.Td>
          {currentContract?.createdAt
            ? FormatDate(new Date(currentContract.End_of_contract))
            : "N/A"}
        </Table.Td>
        <Table.Td>
          {
            CalculateDaysDifference({
              start_date: new Date().toString(),
              end_date: currentContract?.End_of_contract,
            })?.days
          }{" "}
          days
        </Table.Td>
        <Table.Td>
          <Group gap={"sm"}>
            <ActionIcon size={42} variant="default" onClick={handleTenantOut}>
              <IconUserX color="green" />
            </ActionIcon>

            <ActionIcon size={42} variant="default">
              <IconX color="red" />
            </ActionIcon>
          </Group>
        </Table.Td>
        
      </Table.Tr>
    </>
  );
};

export default LuxeLivingTable;
