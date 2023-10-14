import { FC, useState } from "react";
import { Container } from "@mantine/core";
import {
  CreateContractInputMutation,
  UpdateHouseInputMutation,
  useCreateContractInputMutation,
  useUpdateHouseInputMutation,
} from "../../generated/graphql";
import graphqlRequestClient from "../../lib/clients/graphqlRequestClient";
import { useQueryClient } from "@tanstack/react-query";
import { GraphQLError } from "graphql";
import { notifications } from "@mantine/notifications";
import {
  MyHouseInfoUpdatedProps,
  OthersHouseInfoContractProps,
} from "../../global/interfaces/type";
import showMessage from "../../global/components/notification";
import UpdateNotification from "../../globals/components/update-notification";
import LoadingNotification from "../../globals/components/load-notification";
import MyHouse from "./components/all-house";

const House: FC = () => {
  const queryClient = useQueryClient();

  // STRING STATES
  const [currentView, setCurrentView] = useState<string>("my-house");
  const [accessToken] = useState<string | null>(null);

  const { mutate: updateHouseMutate } = useUpdateHouseInputMutation(
    graphqlRequestClient.setHeaders({ Authorization: `Bearer ${accessToken}` }),
    {
      onSuccess: (data: UpdateHouseInputMutation) => {
        queryClient.invalidateQueries(["getMyHouse"]);
        UpdateNotification(
          {
            id: "update-house",
            message: data.updateHouse,
            title: "Successfully",
          },
          3000
        );
      },
      onError: (error: GraphQLError) => {
        const errorMessage =
          //@ts-ignore
          error.response.errors[0].extensions.originalError.message;
        //@ts-ignore
        const title = error.response.errors[0].message;

        notifications.hide("update-house");
        Array.isArray(errorMessage)
          ? showMessage(title, errorMessage)
          : showMessage("Conflict", [`${errorMessage} 😡😡😡`]);
      },
    }
  );

  const { mutate: createContractMutate } = useCreateContractInputMutation(
    graphqlRequestClient.setHeaders({ Authorization: `Bearer ${accessToken}` }),
    {
      onSuccess: (data: CreateContractInputMutation) => {
        queryClient.invalidateQueries(["houses, demo, myContract"]);

        UpdateNotification(
          {
            id: "contract",
            message: data.createContract._id,
            title: "Successfully",
          },
          3000
        );
      },
      onError: (error: GraphQLError) => {
        const errorMessage =
          //@ts-ignore
          error.response.errors[0].extensions.originalError.message;
        //@ts-ignore
        const title = error.response.errors[0].message;

        notifications.hide("contract");
        Array.isArray(errorMessage)
          ? showMessage(title, errorMessage)
          : showMessage("Conflict", [`${errorMessage} 😡😡😡`]);
      },
    }
  );

  const handleOnSubmitContract = async (
    value: MyHouseInfoUpdatedProps,
    contract: OthersHouseInfoContractProps
  ) => {
    LoadingNotification({
      id: "contract",
      message: "Please wait...",
      title: "Updating",
    });
    await createContractMutate({
      input: {
        Duration: contract.Duration,
        House: value._id,
        Total_rent: String(contract.totTotal_rent),
      },
    });
  };

  return (
    <Container fluid>
      {currentView === "my-house" && (
        <MyHouse
          onClick={(button: string) => {
            setCurrentView(button);
          }}
        />
      )}
    </Container>
  );
};

export default House;
