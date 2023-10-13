import {
  useGetDemoHousesQuery,
  GetDemoHousesQuery,
} from "../../../generated/graphql";
import graphqlRequestClient from "../../../lib/clients/graphqlRequestClient";

const useFetchDemoHouse = () => {
  const { isLoading, error, data } = useGetDemoHousesQuery<
    GetDemoHousesQuery,
    Error
  >(graphqlRequestClient, {});

  return { isLoading, data, error };
};

export default useFetchDemoHouse;
