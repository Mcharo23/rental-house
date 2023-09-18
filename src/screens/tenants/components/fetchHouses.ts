import {
  useBookedHouseQuery,
  BookedHouseQuery,
} from "../../../generated/graphql";
import graphqlRequestClient from "../../../lib/clients/graphqlRequestClient";

const useFetchHouses = (accessToken: string) => {
  const { isLoading, error, data } = useBookedHouseQuery<
    BookedHouseQuery,
    Error
  >(
    graphqlRequestClient.setHeaders({ Authorization: `Bearer ${accessToken}` }),
    {}
  );

  return { isLoading, data, error };
};

export default useFetchHouses;
