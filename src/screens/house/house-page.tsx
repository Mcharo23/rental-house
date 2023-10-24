import { FC, useState } from "react";
import { Container } from "@mantine/core";
import MyHouse from "./components/all-house";
import { GetMyHouseQuery } from "../../generated/graphql";
import HouseInfo from "./components/house-info";

const House: FC = () => {
  //CURRENT SCREEN
  const [currentView, setCurrentView] = useState<string>("house");
  // GRAPHQL STATES
  const [selectedHouse, setSelectedHouse] = useState<
    GetMyHouseQuery["myHouse"][0] | null
  >(null);

  // const { mutate: updateHouseMutate } = useUpdateHouseInputMutation(
  //   graphqlRequestClient.setHeaders({ Authorization: `Bearer ${accessToken}` }),
  //   {
  //     onSuccess: (data: UpdateHouseInputMutation) => {
  //       queryClient.invalidateQueries(["getMyHouse"]);
  //       UpdateNotification(
  //         {
  //           id: "update-house",
  //           message: data.updateHouse,
  //           title: "Successfully",
  //         },
  //         3000
  //       );
  //     },
  //     onError: (error: GraphQLError) => {
  //       const errorMessage =
  //         //@ts-ignore
  //         error.response.errors[0].extensions.originalError.message;
  //       //@ts-ignore
  //       const title = error.response.errors[0].message;

  //       notifications.hide("update-house");
  //       Array.isArray(errorMessage)
  //         ? showMessage(title, errorMessage)
  //         : showMessage("Conflict", [`${errorMessage} 😡😡😡`]);
  //     },
  //   }
  // );

  // const { mutate: createContractMutate } = useCreateContractInputMutation(
  //   graphqlRequestClient.setHeaders({ Authorization: `Bearer ${accessToken}` }),
  //   {
  //     onSuccess: (data: CreateContractInputMutation) => {
  //       queryClient.invalidateQueries(["houses, demo, myContract"]);

  //       UpdateNotification(
  //         {
  //           id: "contract",
  //           message: data.createContract._id,
  //           title: "Successfully",
  //         },
  //         3000
  //       );
  //     },
  //     onError: (error: GraphQLError) => {
  //       const errorMessage =
  //         //@ts-ignore
  //         error.response.errors[0].extensions.originalError.message;
  //       //@ts-ignore
  //       const title = error.response.errors[0].message;

  //       notifications.hide("contract");
  //       Array.isArray(errorMessage)
  //         ? showMessage(title, errorMessage)
  //         : showMessage("Conflict", [`${errorMessage} 😡😡😡`]);
  //     },
  //   }
  // );

  // const handleOnSubmitContract = async (
  //   value: MyHouseInfoUpdatedProps,
  //   contract: OthersHouseInfoContractProps
  // ) => {
  //   LoadingNotification({
  //     id: "contract",
  //     message: "Please wait...",
  //     title: "Updating",
  //   });
  //   await createContractMutate({
  //     input: {
  //       Duration: contract.Duration,
  //       House: value._id,
  //       Total_rent: String(contract.totTotal_rent),
  //     },
  //   });
  // };

  return (
    <Container size={"xl"}>
      {currentView === "house" && (
        <MyHouse
          onClick={(button: string, house: GetMyHouseQuery["myHouse"][0]) => {
            setSelectedHouse(house);
            setCurrentView(button);
          }}
        />
      )}

      {currentView === "info" && (
        <HouseInfo
          props={{
            __typename: selectedHouse?.__typename,
            _id: selectedHouse?._id ?? "",
            name: selectedHouse?.name ?? "",
            Region: selectedHouse?.Region ?? "",
            District: selectedHouse?.District ?? "",
            Ward: selectedHouse?.Ward ?? "",
            price: selectedHouse?.price ?? 0,
            Description: selectedHouse?.Description ?? "",
            status: selectedHouse?.status ?? "",
            imgUrl: selectedHouse?.imgUrl ?? [],
            contract: selectedHouse?.contract ?? [],
          }}
          onClick={() => {
            setCurrentView("house");
          }}
        />
      )}
    </Container>
  );
};

export default House;
