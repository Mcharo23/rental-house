import { GraphQLClient } from "graphql-request";
// import { RequestInit } from "graphql-request/dist/types.dom";
import {
  useMutation,
  useQuery,
  UseMutationOptions,
  UseQueryOptions,
} from "@tanstack/react-query";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
//@ts-ignore
function fetcher<TData, TVariables extends { [key: string]: any }>(
  client: GraphQLClient,
  query: string,
  variables?: TVariables,
  requestHeaders?: RequestInit["headers"]
) {
  return async (): Promise<TData> =>
    client.request({
      document: query,
      variables,
      requestHeaders,
    });
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  DateTime: { input: any; output: any };
};

export type ContractType = {
  __typename?: "ContractType";
  Date_of_contract?: Maybe<Scalars["DateTime"]["output"]>;
  Date_of_signing?: Maybe<Scalars["DateTime"]["output"]>;
  Duration: Scalars["Int"]["output"];
  End_of_contract?: Maybe<Scalars["DateTime"]["output"]>;
  House: HouseType;
  Tenant: UserType;
  Total_rent: Scalars["String"]["output"];
  _id: Scalars["ID"]["output"];
  createdAt: Scalars["DateTime"]["output"];
  isCurrent: Scalars["Boolean"]["output"];
};

export type CreateContractInput = {
  Duration: Scalars["Float"]["input"];
  House: Scalars["ID"]["input"];
  Total_rent: Scalars["String"]["input"];
};

export type CreateHouseInput = {
  Description: Scalars["String"]["input"];
  District: Scalars["String"]["input"];
  Region: Scalars["String"]["input"];
  Ward: Scalars["String"]["input"];
  imgUrl: Array<Scalars["String"]["input"]>;
  name: Scalars["String"]["input"];
  price: Scalars["Float"]["input"];
};

export type CreateUserInput = {
  accountType: Scalars["String"]["input"];
  firstName: Scalars["String"]["input"];
  gender: Scalars["String"]["input"];
  lastname: Scalars["String"]["input"];
  middleName: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
  phoneNumber: Scalars["String"]["input"];
  username: Scalars["String"]["input"];
};

export type HouseType = {
  __typename?: "HouseType";
  Description: Scalars["String"]["output"];
  District: Scalars["String"]["output"];
  Region: Scalars["String"]["output"];
  Ward: Scalars["String"]["output"];
  _id: Scalars["ID"]["output"];
  imgUrl: Array<Scalars["String"]["output"]>;
  name: Scalars["String"]["output"];
  price: Scalars["Float"]["output"];
  status: Scalars["String"]["output"];
  user: UserType;
};

export type LoginResponse = {
  __typename?: "LoginResponse";
  accessToken: Scalars["String"]["output"];
  user: UserType;
};

export type LoginUserInput = {
  password: Scalars["String"]["input"];
  username: Scalars["String"]["input"];
};

export type Mutation = {
  __typename?: "Mutation";
  createContract: ContractType;
  createHouse: HouseType;
  createUser: UserType;
  login: LoginResponse;
  rejectContract: Scalars["String"]["output"];
  removeHouse: HouseType;
  removeUser: UserType;
  signContract: ContractType;
  tenantIn: Scalars["String"]["output"];
  tenantOut: Scalars["String"]["output"];
  updateHouse: Scalars["String"]["output"];
  updatePassword: Scalars["String"]["output"];
  updateUser: Scalars["String"]["output"];
};

export type MutationCreateContractArgs = {
  createContractInput: CreateContractInput;
};

export type MutationCreateHouseArgs = {
  createHouseInput: CreateHouseInput;
};

export type MutationCreateUserArgs = {
  createUserInput: CreateUserInput;
};

export type MutationLoginArgs = {
  loginUserInput: LoginUserInput;
};

export type MutationRejectContractArgs = {
  removeContractInput: UpdateContractInput;
};

export type MutationRemoveHouseArgs = {
  id: Scalars["Int"]["input"];
};

export type MutationRemoveUserArgs = {
  id: Scalars["Int"]["input"];
};

export type MutationSignContractArgs = {
  updateContractInput: UpdateContractInput;
};

export type MutationTenantInArgs = {
  updateContractInput: UpdateContractInput;
};

export type MutationTenantOutArgs = {
  updateContractInput: UpdateContractInput;
};

export type MutationUpdateHouseArgs = {
  updateHouseInput: UpdateHouseInput;
};

export type MutationUpdatePasswordArgs = {
  updatePasswordInput: UpdatePasswordInput;
};

export type MutationUpdateUserArgs = {
  updateUserInput: UpdateUserInput;
};

export type MyHouseType = {
  __typename?: "MyHouseType";
  Description: Scalars["String"]["output"];
  District: Scalars["String"]["output"];
  Region: Scalars["String"]["output"];
  Ward: Scalars["String"]["output"];
  _id: Scalars["ID"]["output"];
  contract: Array<ContractType>;
  imgUrl: Array<Scalars["String"]["output"]>;
  name: Scalars["String"]["output"];
  price: Scalars["Float"]["output"];
  status: Scalars["String"]["output"];
};

export type Query = {
  __typename?: "Query";
  contracts: Array<ContractType>;
  demo: Array<HouseType>;
  house: HouseType;
  houses: Array<HouseType>;
  myContract: Array<ContractType>;
  myHouse: Array<MyHouseType>;
  user: UserType;
  users: Array<UserType>;
  watchTenantContract: Array<ContractType>;
};

export type QueryHouseArgs = {
  HoiseID: Scalars["String"]["input"];
};

export type QueryUserArgs = {
  username: Scalars["String"]["input"];
};

export type UpdateContractInput = {
  ContractID: Scalars["ID"]["input"];
};

export type UpdateHouseInput = {
  Description: Scalars["String"]["input"];
  _id: Scalars["ID"]["input"];
  name: Scalars["String"]["input"];
  price: Scalars["Float"]["input"];
};

export type UpdatePasswordInput = {
  currentpassword: Scalars["String"]["input"];
  newPassword: Scalars["String"]["input"];
};

export type UpdateUserInput = {
  phoneNumber: Scalars["String"]["input"];
  username: Scalars["String"]["input"];
};

export type UserType = {
  __typename?: "UserType";
  accountType: Scalars["String"]["output"];
  firstName: Scalars["String"]["output"];
  gender: Scalars["String"]["output"];
  lastname: Scalars["String"]["output"];
  middleName: Scalars["String"]["output"];
  phoneNumber: Scalars["String"]["output"];
  username: Scalars["String"]["output"];
};

export type CreateContractInputMutationVariables = Exact<{
  input: CreateContractInput;
}>;

export type CreateContractInputMutation = {
  __typename?: "Mutation";
  createContract: {
    __typename?: "ContractType";
    _id: string;
    Total_rent: string;
    Duration: number;
    House: {
      __typename?: "HouseType";
      _id: string;
      name: string;
      Region: string;
      District: string;
      Ward: string;
      price: number;
    };
    Tenant: {
      __typename?: "UserType";
      firstName: string;
      middleName: string;
      lastname: string;
      gender: string;
      phoneNumber: string;
      username: string;
    };
  };
};

export type CreateHouseInputMutationVariables = Exact<{
  input: CreateHouseInput;
}>;

export type CreateHouseInputMutation = {
  __typename?: "Mutation";
  createHouse: {
    __typename?: "HouseType";
    name: string;
    Region: string;
    District: string;
    Ward: string;
    Description: string;
    price: number;
    status: string;
    user: {
      __typename?: "UserType";
      firstName: string;
      middleName: string;
      lastname: string;
      phoneNumber: string;
    };
  };
};

export type CreateUserInputMutationVariables = Exact<{
  input: CreateUserInput;
}>;

export type CreateUserInputMutation = {
  __typename?: "Mutation";
  createUser: {
    __typename?: "UserType";
    firstName: string;
    middleName: string;
    lastname: string;
    accountType: string;
    phoneNumber: string;
    username: string;
  };
};

export type LoginUserInputMutationVariables = Exact<{
  input: LoginUserInput;
}>;

export type LoginUserInputMutation = {
  __typename?: "Mutation";
  login: {
    __typename?: "LoginResponse";
    accessToken: string;
    user: {
      __typename?: "UserType";
      accountType: string;
      firstName: string;
      gender: string;
      lastname: string;
      middleName: string;
      phoneNumber: string;
      username: string;
    };
  };
};

export type UpdateHouseInputMutationVariables = Exact<{
  input: UpdateHouseInput;
}>;

export type UpdateHouseInputMutation = {
  __typename?: "Mutation";
  updateHouse: string;
};

export type BookedHouseQueryVariables = Exact<{ [key: string]: never }>;

export type BookedHouseQuery = {
  __typename?: "Query";
  myHouse: Array<{
    __typename?: "MyHouseType";
    _id: string;
    name: string;
    Region: string;
    District: string;
    Ward: string;
    price: number;
    Description: string;
    status: string;
    imgUrl: Array<string>;
    contract: Array<{
      __typename?: "ContractType";
      _id: string;
      isCurrent: boolean;
      Duration: number;
      Total_rent: string;
      createdAt: any;
      Date_of_signing?: any | null;
      Date_of_contract?: any | null;
      End_of_contract?: any | null;
      Tenant: {
        __typename?: "UserType";
        firstName: string;
        gender: string;
        lastname: string;
        middleName: string;
        phoneNumber: string;
        username: string;
      };
    }>;
  }>;
};

export type GetDemoHousesQueryVariables = Exact<{ [key: string]: never }>;

export type GetDemoHousesQuery = {
  __typename?: "Query";
  demo: Array<{
    __typename?: "HouseType";
    _id: string;
    name: string;
    Region: string;
    District: string;
    Ward: string;
    price: number;
    Description: string;
    status: string;
    imgUrl: Array<string>;
    user: {
      __typename?: "UserType";
      firstName: string;
      middleName: string;
      lastname: string;
      phoneNumber: string;
      username: string;
      gender: string;
    };
  }>;
};

export type GetHousesQueryVariables = Exact<{ [key: string]: never }>;

export type GetHousesQuery = {
  __typename?: "Query";
  houses: Array<{
    __typename?: "HouseType";
    _id: string;
    name: string;
    Region: string;
    District: string;
    Ward: string;
    price: number;
    Description: string;
    status: string;
    imgUrl: Array<string>;
    user: {
      __typename?: "UserType";
      firstName: string;
      middleName: string;
      lastname: string;
      phoneNumber: string;
      username: string;
      gender: string;
    };
  }>;
};

export type MyContractQueryVariables = Exact<{ [key: string]: never }>;

export type MyContractQuery = {
  __typename?: "Query";
  myContract: Array<{
    __typename?: "ContractType";
    Date_of_signing?: any | null;
    Date_of_contract?: any | null;
    End_of_contract?: any | null;
    Duration: number;
    Total_rent: string;
    _id: string;
    isCurrent: boolean;
    createdAt: any;
    House: {
      __typename?: "HouseType";
      _id: string;
      name: string;
      Region: string;
      District: string;
      Ward: string;
      price: number;
      imgUrl: Array<string>;
      user: {
        __typename?: "UserType";
        firstName: string;
        middleName: string;
        lastname: string;
        gender: string;
        phoneNumber: string;
        username: string;
      };
    };
  }>;
};

export type GetMyHouseQueryVariables = Exact<{ [key: string]: never }>;

export type GetMyHouseQuery = {
  __typename?: "Query";
  myHouse: Array<{
    __typename?: "MyHouseType";
    _id: string;
    name: string;
    Region: string;
    District: string;
    Ward: string;
    price: number;
    Description: string;
    status: string;
    imgUrl: Array<string>;
    contract: Array<{
      __typename?: "ContractType";
      _id: string;
      Duration: number;
      Total_rent: string;
      Tenant: {
        __typename?: "UserType";
        firstName: string;
        gender: string;
        lastname: string;
        middleName: string;
        phoneNumber: string;
        username: string;
      };
    }>;
  }>;
};

export type RejectContractMutationVariables = Exact<{
  input: UpdateContractInput;
}>;

export type RejectContractMutation = {
  __typename?: "Mutation";
  rejectContract: string;
};

export type SignContractMutationVariables = Exact<{
  input: UpdateContractInput;
}>;

export type SignContractMutation = {
  __typename?: "Mutation";
  signContract: {
    __typename?: "ContractType";
    Date_of_signing?: any | null;
    Duration: number;
    Total_rent: string;
    House: {
      __typename?: "HouseType";
      name: string;
      Region: string;
      District: string;
      Ward: string;
      price: number;
    };
    Tenant: {
      __typename?: "UserType";
      firstName: string;
      middleName: string;
      lastname: string;
      phoneNumber: string;
      gender: string;
      username: string;
    };
  };
};

export type TenantInMutationVariables = Exact<{
  input: UpdateContractInput;
}>;

export type TenantInMutation = { __typename?: "Mutation"; tenantIn: string };

export type TenantOutMutationVariables = Exact<{
  input: UpdateContractInput;
}>;

export type TenantOutMutation = { __typename?: "Mutation"; tenantOut: string };

export type UpdatePasswordInputMutationVariables = Exact<{
  input: UpdatePasswordInput;
}>;

export type UpdatePasswordInputMutation = {
  __typename?: "Mutation";
  updatePassword: string;
};

export type UpdateUserInputMutationVariables = Exact<{
  input: UpdateUserInput;
}>;

export type UpdateUserInputMutation = {
  __typename?: "Mutation";
  updateUser: string;
};

export const CreateContractInputDocument = `
    mutation CreateContractInput($input: CreateContractInput!) {
  createContract(createContractInput: $input) {
    _id
    Total_rent
    Duration
    House {
      _id
      name
      Region
      District
      Ward
      price
    }
    Tenant {
      firstName
      middleName
      lastname
      gender
      phoneNumber
      username
    }
  }
}
    `;
export const useCreateContractInputMutation = <
  TError = unknown,
  TContext = unknown
>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    CreateContractInputMutation,
    TError,
    CreateContractInputMutationVariables,
    TContext
  >,
  headers?: RequestInit["headers"]
) =>
  useMutation<
    CreateContractInputMutation,
    TError,
    CreateContractInputMutationVariables,
    TContext
  >(
    ["CreateContractInput"],
    (variables?: CreateContractInputMutationVariables) =>
      fetcher<
        CreateContractInputMutation,
        CreateContractInputMutationVariables
      >(client, CreateContractInputDocument, variables, headers)(),
    options
  );
export const CreateHouseInputDocument = `
    mutation CreateHouseInput($input: CreateHouseInput!) {
  createHouse(createHouseInput: $input) {
    name
    Region
    District
    Ward
    Description
    price
    status
    user {
      firstName
      middleName
      lastname
      phoneNumber
    }
  }
}
    `;
export const useCreateHouseInputMutation = <
  TError = unknown,
  TContext = unknown
>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    CreateHouseInputMutation,
    TError,
    CreateHouseInputMutationVariables,
    TContext
  >,
  headers?: RequestInit["headers"]
) =>
  useMutation<
    CreateHouseInputMutation,
    TError,
    CreateHouseInputMutationVariables,
    TContext
  >(
    ["CreateHouseInput"],
    (variables?: CreateHouseInputMutationVariables) =>
      fetcher<CreateHouseInputMutation, CreateHouseInputMutationVariables>(
        client,
        CreateHouseInputDocument,
        variables,
        headers
      )(),
    options
  );
export const CreateUserInputDocument = `
    mutation CreateUserInput($input: CreateUserInput!) {
  createUser(createUserInput: $input) {
    firstName
    middleName
    lastname
    accountType
    phoneNumber
    username
  }
}
    `;
export const useCreateUserInputMutation = <
  TError = unknown,
  TContext = unknown
>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    CreateUserInputMutation,
    TError,
    CreateUserInputMutationVariables,
    TContext
  >,
  headers?: RequestInit["headers"]
) =>
  useMutation<
    CreateUserInputMutation,
    TError,
    CreateUserInputMutationVariables,
    TContext
  >(
    ["CreateUserInput"],
    (variables?: CreateUserInputMutationVariables) =>
      fetcher<CreateUserInputMutation, CreateUserInputMutationVariables>(
        client,
        CreateUserInputDocument,
        variables,
        headers
      )(),
    options
  );
export const LoginUserInputDocument = `
    mutation LoginUserInput($input: LoginUserInput!) {
  login(loginUserInput: $input) {
    accessToken
    user {
      accountType
      firstName
      gender
      lastname
      middleName
      phoneNumber
      username
    }
  }
}
    `;
export const useLoginUserInputMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    LoginUserInputMutation,
    TError,
    LoginUserInputMutationVariables,
    TContext
  >,
  headers?: RequestInit["headers"]
) =>
  useMutation<
    LoginUserInputMutation,
    TError,
    LoginUserInputMutationVariables,
    TContext
  >(
    ["LoginUserInput"],
    (variables?: LoginUserInputMutationVariables) =>
      fetcher<LoginUserInputMutation, LoginUserInputMutationVariables>(
        client,
        LoginUserInputDocument,
        variables,
        headers
      )(),
    options
  );
export const UpdateHouseInputDocument = `
    mutation UpdateHouseInput($input: UpdateHouseInput!) {
  updateHouse(updateHouseInput: $input)
}
    `;
export const useUpdateHouseInputMutation = <
  TError = unknown,
  TContext = unknown
>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    UpdateHouseInputMutation,
    TError,
    UpdateHouseInputMutationVariables,
    TContext
  >,
  headers?: RequestInit["headers"]
) =>
  useMutation<
    UpdateHouseInputMutation,
    TError,
    UpdateHouseInputMutationVariables,
    TContext
  >(
    ["UpdateHouseInput"],
    (variables?: UpdateHouseInputMutationVariables) =>
      fetcher<UpdateHouseInputMutation, UpdateHouseInputMutationVariables>(
        client,
        UpdateHouseInputDocument,
        variables,
        headers
      )(),
    options
  );
export const BookedHouseDocument = `
    query bookedHouse {
  myHouse {
    _id
    name
    Region
    District
    Ward
    price
    Description
    status
    imgUrl
    contract {
      _id
      isCurrent
      Duration
      Total_rent
      createdAt
      Date_of_signing
      Date_of_contract
      End_of_contract
      Tenant {
        firstName
        gender
        lastname
        middleName
        phoneNumber
        username
      }
    }
  }
}
    `;
export const useBookedHouseQuery = <TData = BookedHouseQuery, TError = unknown>(
  client: GraphQLClient,
  variables?: BookedHouseQueryVariables,
  options?: UseQueryOptions<BookedHouseQuery, TError, TData>,
  headers?: RequestInit["headers"]
) =>
  useQuery<BookedHouseQuery, TError, TData>(
    variables === undefined ? ["bookedHouse"] : ["bookedHouse", variables],
    fetcher<BookedHouseQuery, BookedHouseQueryVariables>(
      client,
      BookedHouseDocument,
      variables,
      headers
    ),
    options
  );
export const GetDemoHousesDocument = `
    query getDemoHouses {
  demo {
    _id
    name
    Region
    District
    Ward
    price
    Description
    status
    imgUrl
    user {
      firstName
      middleName
      lastname
      phoneNumber
      username
      gender
    }
  }
}
    `;
export const useGetDemoHousesQuery = <
  TData = GetDemoHousesQuery,
  TError = unknown
>(
  client: GraphQLClient,
  variables?: GetDemoHousesQueryVariables,
  options?: UseQueryOptions<GetDemoHousesQuery, TError, TData>,
  headers?: RequestInit["headers"]
) =>
  useQuery<GetDemoHousesQuery, TError, TData>(
    variables === undefined ? ["getDemoHouses"] : ["getDemoHouses", variables],
    fetcher<GetDemoHousesQuery, GetDemoHousesQueryVariables>(
      client,
      GetDemoHousesDocument,
      variables,
      headers
    ),
    options
  );
export const GetHousesDocument = `
    query getHouses {
  houses {
    _id
    name
    Region
    District
    Ward
    price
    Description
    status
    imgUrl
    user {
      firstName
      middleName
      lastname
      phoneNumber
      username
      gender
    }
  }
}
    `;
export const useGetHousesQuery = <TData = GetHousesQuery, TError = unknown>(
  client: GraphQLClient,
  variables?: GetHousesQueryVariables,
  options?: UseQueryOptions<GetHousesQuery, TError, TData>,
  headers?: RequestInit["headers"]
) =>
  useQuery<GetHousesQuery, TError, TData>(
    variables === undefined ? ["getHouses"] : ["getHouses", variables],
    fetcher<GetHousesQuery, GetHousesQueryVariables>(
      client,
      GetHousesDocument,
      variables,
      headers
    ),
    options
  );
export const MyContractDocument = `
    query myContract {
  myContract {
    Date_of_signing
    Date_of_contract
    End_of_contract
    Duration
    Total_rent
    _id
    isCurrent
    createdAt
    House {
      _id
      name
      Region
      District
      Ward
      price
      imgUrl
      user {
        firstName
        middleName
        lastname
        gender
        phoneNumber
        username
      }
    }
  }
}
    `;
export const useMyContractQuery = <TData = MyContractQuery, TError = unknown>(
  client: GraphQLClient,
  variables?: MyContractQueryVariables,
  options?: UseQueryOptions<MyContractQuery, TError, TData>,
  headers?: RequestInit["headers"]
) =>
  useQuery<MyContractQuery, TError, TData>(
    variables === undefined ? ["myContract"] : ["myContract", variables],
    fetcher<MyContractQuery, MyContractQueryVariables>(
      client,
      MyContractDocument,
      variables,
      headers
    ),
    options
  );
export const GetMyHouseDocument = `
    query getMyHouse {
  myHouse {
    _id
    name
    Region
    District
    Ward
    price
    Description
    status
    imgUrl
    contract {
      _id
      Duration
      Total_rent
      Tenant {
        firstName
        gender
        lastname
        middleName
        phoneNumber
        username
      }
    }
  }
}
    `;
export const useGetMyHouseQuery = <TData = GetMyHouseQuery, TError = unknown>(
  client: GraphQLClient,
  variables?: GetMyHouseQueryVariables,
  options?: UseQueryOptions<GetMyHouseQuery, TError, TData>,
  headers?: RequestInit["headers"]
) =>
  useQuery<GetMyHouseQuery, TError, TData>(
    variables === undefined ? ["getMyHouse"] : ["getMyHouse", variables],
    fetcher<GetMyHouseQuery, GetMyHouseQueryVariables>(
      client,
      GetMyHouseDocument,
      variables,
      headers
    ),
    options
  );
export const RejectContractDocument = `
    mutation rejectContract($input: UpdateContractInput!) {
  rejectContract(removeContractInput: $input)
}
    `;
export const useRejectContractMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    RejectContractMutation,
    TError,
    RejectContractMutationVariables,
    TContext
  >,
  headers?: RequestInit["headers"]
) =>
  useMutation<
    RejectContractMutation,
    TError,
    RejectContractMutationVariables,
    TContext
  >(
    ["rejectContract"],
    (variables?: RejectContractMutationVariables) =>
      fetcher<RejectContractMutation, RejectContractMutationVariables>(
        client,
        RejectContractDocument,
        variables,
        headers
      )(),
    options
  );
export const SignContractDocument = `
    mutation signContract($input: UpdateContractInput!) {
  signContract(updateContractInput: $input) {
    Date_of_signing
    Duration
    Total_rent
    House {
      name
      Region
      District
      Ward
      price
    }
    Tenant {
      firstName
      middleName
      lastname
      phoneNumber
      gender
      username
    }
  }
}
    `;
export const useSignContractMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    SignContractMutation,
    TError,
    SignContractMutationVariables,
    TContext
  >,
  headers?: RequestInit["headers"]
) =>
  useMutation<
    SignContractMutation,
    TError,
    SignContractMutationVariables,
    TContext
  >(
    ["signContract"],
    (variables?: SignContractMutationVariables) =>
      fetcher<SignContractMutation, SignContractMutationVariables>(
        client,
        SignContractDocument,
        variables,
        headers
      )(),
    options
  );
export const TenantInDocument = `
    mutation tenantIn($input: UpdateContractInput!) {
  tenantIn(updateContractInput: $input)
}
    `;
export const useTenantInMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    TenantInMutation,
    TError,
    TenantInMutationVariables,
    TContext
  >,
  headers?: RequestInit["headers"]
) =>
  useMutation<TenantInMutation, TError, TenantInMutationVariables, TContext>(
    ["tenantIn"],
    (variables?: TenantInMutationVariables) =>
      fetcher<TenantInMutation, TenantInMutationVariables>(
        client,
        TenantInDocument,
        variables,
        headers
      )(),
    options
  );
export const TenantOutDocument = `
    mutation tenantOut($input: UpdateContractInput!) {
  tenantOut(updateContractInput: $input)
}
    `;
export const useTenantOutMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    TenantOutMutation,
    TError,
    TenantOutMutationVariables,
    TContext
  >,
  headers?: RequestInit["headers"]
) =>
  useMutation<TenantOutMutation, TError, TenantOutMutationVariables, TContext>(
    ["tenantOut"],
    (variables?: TenantOutMutationVariables) =>
      fetcher<TenantOutMutation, TenantOutMutationVariables>(
        client,
        TenantOutDocument,
        variables,
        headers
      )(),
    options
  );
export const UpdatePasswordInputDocument = `
    mutation UpdatePasswordInput($input: UpdatePasswordInput!) {
  updatePassword(updatePasswordInput: $input)
}
    `;
export const useUpdatePasswordInputMutation = <
  TError = unknown,
  TContext = unknown
>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    UpdatePasswordInputMutation,
    TError,
    UpdatePasswordInputMutationVariables,
    TContext
  >,
  headers?: RequestInit["headers"]
) =>
  useMutation<
    UpdatePasswordInputMutation,
    TError,
    UpdatePasswordInputMutationVariables,
    TContext
  >(
    ["UpdatePasswordInput"],
    (variables?: UpdatePasswordInputMutationVariables) =>
      fetcher<
        UpdatePasswordInputMutation,
        UpdatePasswordInputMutationVariables
      >(client, UpdatePasswordInputDocument, variables, headers)(),
    options
  );
export const UpdateUserInputDocument = `
    mutation UpdateUserInput($input: UpdateUserInput!) {
  updateUser(updateUserInput: $input)
}
    `;
export const useUpdateUserInputMutation = <
  TError = unknown,
  TContext = unknown
>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    UpdateUserInputMutation,
    TError,
    UpdateUserInputMutationVariables,
    TContext
  >,
  headers?: RequestInit["headers"]
) =>
  useMutation<
    UpdateUserInputMutation,
    TError,
    UpdateUserInputMutationVariables,
    TContext
  >(
    ["UpdateUserInput"],
    (variables?: UpdateUserInputMutationVariables) =>
      fetcher<UpdateUserInputMutation, UpdateUserInputMutationVariables>(
        client,
        UpdateUserInputDocument,
        variables,
        headers
      )(),
    options
  );
