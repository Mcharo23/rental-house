import { LoginUserInputMutation } from "../generated/graphql";

const USER_DATA_KEY = "user_data";

export const saveUserData = (userData: LoginUserInputMutation): void => {
  localStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
};

export const getUserData = (): LoginUserInputMutation | null => {
  const loginResponseString = localStorage.getItem(USER_DATA_KEY);
  if (loginResponseString) {
    const loginResponse = JSON.parse(
      loginResponseString
    ) as LoginUserInputMutation;
    return loginResponse;
  }
  return null;
};

export const getUserAccessToken = (): string | null => {
  const loginResponseString = localStorage.getItem(USER_DATA_KEY);
  if (loginResponseString) {
    const loginResponse = JSON.parse(
      loginResponseString
    ) as LoginUserInputMutation;
    return loginResponse.login.accessToken;
  }
  return null;
};

export const clearUserData = () => {
  localStorage.removeItem(USER_DATA_KEY);
};
