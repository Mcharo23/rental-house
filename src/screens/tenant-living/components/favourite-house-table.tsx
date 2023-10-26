import { FC } from "react";
import { MyContractQuery } from "../../../generated/graphql";
import { Table, Group, Avatar, Anchor } from "@mantine/core";
import { CalculateDaysDifference } from "../../../globals/functions/calculate-days-difference";
import FormatDate from "../../../globals/functions/date-format";
import { IMAGE_BASE } from "../../../lib/api-base";

type FavouriteHouseTableProps = {
  props: MyContractQuery["myContract"][0];
};

const FavouriteHouseTable: FC<FavouriteHouseTableProps> = ({ props }) => {
  let daysDifference = CalculateDaysDifference({
    start_date: new Date().toString(),
    end_date: props.End_of_contract,
  }).days;

  if (daysDifference < 0) {
    daysDifference = 0;
  }
  return (
    <>
      <Table.Tr>
        <Table.Td>
          <Group gap={"sm"}>
            <Avatar
              size={26}
              src={`${IMAGE_BASE.BASE}${props.House.imgUrl[0]}`}
              radius={26}
            />
            <Anchor component="button" fz="sm">
              {props.House.name}
            </Anchor>
          </Group>
        </Table.Td>
        <Table.Td>
          <Anchor component="button" fz="sm">
            {props.House.Region}
          </Anchor>
        </Table.Td>
        <Table.Td>
          <Anchor component="button" fz="sm">
            {props.House.District}
          </Anchor>
        </Table.Td>
        <Table.Td>
          <Anchor component="button" fz="sm">
            {props.House.Ward}
          </Anchor>
        </Table.Td>
        {props.Date_of_contract === null ? (
          <Table.Td>null</Table.Td>
        ) : (
          <Table.Td>
            {props.createdAt
              ? FormatDate(new Date(props.Date_of_contract))
              : "N/A"}
          </Table.Td>
        )}
        {props.Date_of_contract === null ? (
          <Table.Td>null</Table.Td>
        ) : (
          <Table.Td>
            {props.createdAt
              ? FormatDate(new Date(props.Date_of_contract))
              : "N/A"}
          </Table.Td>
        )}

        {(props.Date_of_contract === null || props.Date_of_signing === null) &&
        daysDifference > 0 ? (
          <Table.Td>null</Table.Td>
        ) : (
          <Table.Td>{daysDifference} days</Table.Td>
        )}
      </Table.Tr>
    </>
  );
};

export default FavouriteHouseTable;
