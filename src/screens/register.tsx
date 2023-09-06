import { FC, useState } from "react";
import CustomButton from "../components/custom-button";
import colors from "../lib/color/colors";
import { BackgroundImage } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { AccountType, Gender } from "../lib/enums/gender";
import { useQueryClient } from "@tanstack/react-query";
import {
  CreateUserInputMutation,
  useCreateUserInputMutation,
} from "../generated/graphql";
import graphqlRequestClient from "../lib/clients/graphqlRequestClient";
import { GraphQLError } from "graphql";
import SelectsComponent from "../global/components/select";
import showMessage from "../global/components/notification";
import LoadingNotification from "../global/components/load-notification";
import { notifications } from "@mantine/notifications";
import UpdateNotification from "../global/components/update-notification";
import CustomInputField from "../global/components/input-text";
import CustomPasswordInput from "../global/components/custom-password-input";
import CustomizedNotification from "../global/components/customized-notification";

const RegisterPage: FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleNAme] = useState("");
  const [lastname, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [accountType, setAccountType] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [notificationId, setNotificationId] = useState<string>("register");

  const { mutate } = useCreateUserInputMutation(graphqlRequestClient, {
    onSuccess: (data: CreateUserInputMutation) => {
      queryClient.invalidateQueries(["createUserInput"]);
      UpdateNotification(
        {
          id: notificationId,
          message: "Data was saved successfully.",
          title: "Successfully",
        },
        3000
      );
      setTimeout(() => {
        navigate("/auth");
      }, 5000);

      return;
    },
    onError: (error: GraphQLError) => {
      const errorMessage =
        error.response.errors[0].extensions.originalError.message;
      const title = error.response.errors[0].message;

      notifications.hide(notificationId);
      Array.isArray(errorMessage)
        ? showMessage(title, errorMessage)
        : showMessage("Conflict", [`${errorMessage} 😡😡😡`]);
    },
  });

  const handleRegister = async () => {
    if (
      firstName.length === 0 ||
      middleName.length === 0 ||
      lastname.length === 0 ||
      gender.length === 0 ||
      phoneNumber.length === 0 ||
      email.length === 0 ||
      password.length === 0
    ) {
      CustomizedNotification({
        title: "Empty Fields",
        message: "All fields are required 😟🫣🥵🥵🥵🥵🥵",
      });
    } else if (password !== confirmPassword) {
      CustomizedNotification({
        title: "Invalid",
        message: "Password do not match 🤣🤣🤣🤪🤪",
      });
    } else {
      LoadingNotification({
        id: notificationId,
        message: "Please wait while saving your data",
        title: "Registration",
      });
      mutate({
        input: {
          username: email,
          firstName: firstName,
          middleName: middleName,
          lastname: lastname,
          gender: gender,
          phoneNumber: phoneNumber,
          accountType: accountType,
          password: password,
        },
      });
    }
  };

  const handleLogin = () => {
    navigate("/auth");
  };

  return (
    <div className="bg-slate-200 w-full overflow-auto  h-screen items-center justify-center flex">
      <div className="flex flex-col w-full h-full justify-center items-center bg-white mx-10 rounded-lg sm:flex-row sm:flex sm:w-full sm:h-4/6 sm:bg-white md:w-4/6 lg:w-4/6 xl:w-6/12 2xl:w-5/12">
        <div className="rounded-t-lg w-full py-3 hidden flex-col justify-center items-center gap-2 sm:w-1/2 sm:h-full sm:flex sm:flex-col sm:gap-2 sm:justify-center sm:items-center sm:rounded-lg  2xl:h-full">
          <p className="text-stone-700 font-semibold text-lg">Welcome</p>
          <img
            src="https://cdn-icons-png.flaticon.com/512/1441/1441333.png"
            alt="logo"
            className="w-16 h-16"
          />
          <div>
            <p className="text-stone-900 flex text-center font-normal text-xs">
              Get accessed by over 1 Lakh buyers
            </p>
          </div>
        </div>
        <BackgroundImage
          src={`${"https://us.123rf.com/450wm/altitudevisual/altitudevisual2303/altitudevisual230302636/200859262-house-with-exterior-lighting-and-security-system-providing-safety-and-comfort-created-with.jpg?ver=6"}`}
          radius="md"
          className="w-full h-auto py-5 gap-5 rounded-b-lg flex flex-col justify-center items-center sm:w-1/2 sm:h-full sm:Right-to-left sm:flex sm:justify-center sm:items-center 2xl:h-full"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/128/3005/3005358.png"
            alt="logo"
            style={{ width: "50px", height: "50px" }}
          />
          <div className="w-5/6 flex flex-col gap-7 sm:w-5/6 md:5/6 lg:w-5/6 xl:w-5/6 2xl:w-5/6">
            <CustomInputField
              onChange={setFirstName}
              name={"First Name"}
              id={"firstName"}
            />
            <CustomInputField
              onChange={setMiddleNAme}
              name={"Middle Name"}
              id={"middleName"}
            />
            <CustomInputField
              onChange={setLastName}
              name={"last Name"}
              id={"lastName"}
            />
            <CustomInputField
              onChange={setEmail}
              name={"Email eg@example.com"}
              id={"email"}
            />
            <CustomInputField
              onChange={setPhoneNumber}
              name={"Contact eg. +255746561545"}
              id={"contact"}
            />
            <SelectsComponent
              label={"Gender"}
              onChange={setGender}
              inputId={"gender"}
              options={[
                { name: Gender.MALE, value: Gender.MALE },
                { name: Gender.FEMALE, value: Gender.FEMALE },
              ]}
            />
            <SelectsComponent
              label={"Account type"}
              onChange={setAccountType}
              inputId={"account-type"}
              options={[
                { name: AccountType.OWNER, value: AccountType.OWNER },
                { name: AccountType.TENANT, value: AccountType.TENANT },
              ]}
            />

            <CustomPasswordInput
              name={"Create password"}
              feedback={true}
              inputId={"password"}
              onChange={setPassword}
            />

            <CustomPasswordInput
              name={"Retype password"}
              feedback={false}
              inputId={"retype-password"}
              onChange={setConfirmPassword}
            />
            <div className="flex place-content-between w-full">
              <CustomButton
                backgroundColor={colors.transparent}
                borderRadius={30}
                name={"Register"}
                color={colors.white}
                fontSize={14}
                border={`1px solid ${colors.white}`}
                paddingLeft={20}
                paddingRight={20}
                paddingTop={3}
                paddingBottom={3}
                onClick={handleRegister}
              />
              <CustomButton
                backgroundColor={colors.transparent}
                borderRadius={0}
                name={"have account? login"}
                color={colors.white}
                fontSize={14}
                border={"none"}
                paddingLeft={0}
                paddingRight={0}
                paddingTop={0}
                paddingBottom={0}
                onClick={handleLogin}
              />
            </div>
          </div>
        </BackgroundImage>
      </div>
    </div>
  );
};

export default RegisterPage;
