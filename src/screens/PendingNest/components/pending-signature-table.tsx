import { FC } from "react";
import { BookedHouseQuery } from "../../../generated/graphql";
import { Table, Group, Avatar, Anchor, ActionIcon, rem } from "@mantine/core";
import { IconX, IconWritingSign } from "@tabler/icons-react";
import { IMAGE_BASE } from "../../../lib/api-base";

type PendingSignatureTableProps = {
  props: BookedHouseQuery["myHouse"][0];
};

const PendingSignatureTable: FC<PendingSignatureTableProps> = ({ props }) => {
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
          <ActionIcon size={42} variant="default">
            <IconWritingSign />
          </ActionIcon>

          <ActionIcon size={42} variant="default">
            <IconX />
          </ActionIcon>
        </Group>
      </Table.Td>
    </Table.Tr>
  );
};

export default PendingSignatureTable;
