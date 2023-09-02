import { GraphQLClient } from 'graphql-request';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };

function fetcher<TData, TVariables extends { [key: string]: any }>(client: GraphQLClient, query: string, variables?: TVariables, requestHeaders?: RequestInit['headers']) {
  return async (): Promise<TData> => client.request({
    document: query,
    variables,
    requestHeaders
  });
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type CreateUserInput = {
  accountType: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  gender: Scalars['String']['input'];
  lastname: Scalars['String']['input'];
  middleName: Scalars['String']['input'];
  password: Scalars['String']['input'];
  phoneNumber: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  accessToken: Scalars['String']['output'];
  user: UserType;
};

export type LoginUserInput = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser: UserType;
  login: LoginResponse;
  removeUser: UserType;
  updateUser: UserType;
};


export type MutationCreateUserArgs = {
  createUserInput: CreateUserInput;
};


export type MutationLoginArgs = {
  loginUserInput: LoginUserInput;
};


export type MutationRemoveUserArgs = {
  id: Scalars['Int']['input'];
};


export type MutationUpdateUserArgs = {
  updateUserInput: UpdateUserInput;
};

export type Query = {
  __typename?: 'Query';
  user: UserType;
  users: Array<UserType>;
};


export type QueryUserArgs = {
  username: Scalars['String']['input'];
};

export type UpdateUserInput = {
  accountType?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  gender?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  lastname?: InputMaybe<Scalars['String']['input']>;
  middleName?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type UserType = {
  __typename?: 'UserType';
  accountType: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  gender: Scalars['String']['output'];
  lastname: Scalars['String']['output'];
  middleName: Scalars['String']['output'];
  phoneNumber: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type CreateUserInputMutationVariables = Exact<{
  input: CreateUserInput;
}>;


export type CreateUserInputMutation = { __typename?: 'Mutation', createUser: { __typename?: 'UserType', firstName: string, middleName: string, lastname: string, accountType: string, phoneNumber: string, username: string } };

export type LoginUserInputMutationVariables = Exact<{
  input: LoginUserInput;
}>;


export type LoginUserInputMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginResponse', accessToken: string, user: { __typename?: 'UserType', accountType: string, firstName: string, gender: string, lastname: string, middleName: string, phoneNumber: string, username: string } } };


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
      options?: UseMutationOptions<CreateUserInputMutation, TError, CreateUserInputMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<CreateUserInputMutation, TError, CreateUserInputMutationVariables, TContext>(
      ['CreateUserInput'],
      (variables?: CreateUserInputMutationVariables) => fetcher<CreateUserInputMutation, CreateUserInputMutationVariables>(client, CreateUserInputDocument, variables, headers)(),
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
export const useLoginUserInputMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<LoginUserInputMutation, TError, LoginUserInputMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<LoginUserInputMutation, TError, LoginUserInputMutationVariables, TContext>(
      ['LoginUserInput'],
      (variables?: LoginUserInputMutationVariables) => fetcher<LoginUserInputMutation, LoginUserInputMutationVariables>(client, LoginUserInputDocument, variables, headers)(),
      options
    );