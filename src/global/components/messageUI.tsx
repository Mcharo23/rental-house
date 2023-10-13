import { FC } from "react";
import { Text } from "@mantine/core";
import { BookedHouseQuery } from "../../generated/graphql";
import { IMAGE_BASE } from "../../lib/api-base";

type MessagesProps = {
  props: BookedHouseQuery["myHouse"][0];
};

const MessagesUI: FC<MessagesProps> = ({ props }) => {
  const getCurrentTenant = (item: BookedHouseQuery["myHouse"][0]): string => {
    const currentContract = item.contract.find(
      (contract) => contract.isCurrent === true
    );
    return `${currentContract?.Tenant.firstName}${""}${
      currentContract?.Tenant.middleName
    }${""}${currentContract?.Tenant.lastname}${""}`;
  };

  return (
    <div className="flex flex-col w-full hover:bg-slate-200 rounded-lg">
      <div className="flex-row gap-3 pb-2 flex">
        <div className="object-cover rounded-full h-16 w-20 items-center flex relative">
          <img
            src={`${IMAGE_BASE.BASE}${props.imgUrl[0]}`}
            alt={props.imgUrl[0]}
            className="w-full h-full rounded-full"
          />
        </div>
        <div className="flex flex-col w-full">
          <Text className="flex text-light-blue font-sans">{props.name}</Text>
          <Text className="font-serif overflow-hidden overflow-ellipsis line-clamp-3">
            {getCurrentTenant(props)}
          </Text>
        </div>
      </div>
    </div>
  );
};

export default MessagesUI;
