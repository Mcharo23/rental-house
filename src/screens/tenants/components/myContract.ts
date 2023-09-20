import {
  MyContractQuery,
  useMyContractQuery,
} from "../../../generated/graphql";
import graphqlRequestClient from "../../../lib/clients/graphqlRequestClient";

const useFetchMyContracts = (accessToken: string) => {
  const { isLoading, error, data } = useMyContractQuery<MyContractQuery, Error>(
    graphqlRequestClient.setHeaders({ Authorization: `Bearer ${accessToken}` }),
    {}
  );

  return { isLoading, data, error };
};

export default useFetchMyContracts;
