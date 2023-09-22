import { GetHousesQuery, useGetHousesQuery } from "../../../generated/graphql";
import graphqlRequestClient from "../../../lib/clients/graphqlRequestClient";

const useFetchHouses = (accessToken: string) => {
  const { isLoading, error, data } = useGetHousesQuery<GetHousesQuery, Error>(
    graphqlRequestClient.setHeaders({ Authorization: `Bearer ${accessToken}` }),
    {}
  );

  return { isLoading, data, error };
};

export default useFetchHouses;
