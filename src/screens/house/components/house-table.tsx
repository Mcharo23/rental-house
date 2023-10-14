import { FC } from "react";
import { GetMyHouseQuery } from "../../../generated/graphql";
import { Anchor, Avatar, Group, Table } from "@mantine/core";
import { IMAGE_BASE } from "../../../lib/api-base";
import { IconEdit, IconEye } from "@tabler/icons-react";
import colors from "../../../lib/color/colors";

type HouseTableProps = {
  props: GetMyHouseQuery["myHouse"][0];
  onClick: (button: string, house: GetMyHouseQuery["myHouse"][0]) => void;
};

const HouseTable: FC<HouseTableProps> = ({ onClick, props }) => {
  return (
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
        <Anchor component="button" fz="sm" c={"green"}>
          {props.price}
        </Anchor>
      </Table.Td>
      <Table.Td>
        <Anchor component="button" fz="sm">
          {props.status}
        </Anchor>
      </Table.Td>
      <Table.Td>{props.contract.length}</Table.Td>
      <Table.Td>
        <Group gap={"sm"}>
          <IconEdit size={20} color="green" style={{ cursor: "pointer" }} />
          <IconEye
            size={20}
            color={`${colors.lightBlue}`}
            onClick={() => onClick("info", props)}
            style={{ cursor: "pointer" }}
          />
        </Group>
      </Table.Td>
    </Table.Tr>
  );
};

export default HouseTable;
