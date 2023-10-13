export type CreateUserInput = {
  accountType: string;
  firstName: string;
  gender: string;
  lastname: string;
  middleName: string;
  password: string;
  phoneNumber: string;
  username: string;
};

export type LoginResponse = {
  accessToken: string;
  user: UserType;
};

export type LoginUserInput = {
  password: string;
  username: string;
};

export type Mutation = {
  createUser(createUserInput: CreateUserInput): UserType;
  login(loginUserInput: LoginUserInput): LoginResponse;
  removeUser(id: number): UserType;
  updateUser(updateUserInput: UpdateUserInput): UserType;
};

export type Query = {
  user(username: string): UserType;
  users: [UserType];
};

export type UpdateUserInput = {
  accountType: string;
  firstName: string;
  gender: string;
  id: number;
  lastname: string;
  middleName: string;
  password: string;
  phoneNumber: string;
  username: string;
};

export type UserType = {
  accountType: string;
  firstName: string;
  gender: string;
  lastname: string;
  middleName: string;
  phoneNumber: string;
  username: string;
};
