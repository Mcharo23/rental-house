import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Text,
  Container,
  Button,
  Flex,
  Select,
  Avatar,
  Notification,
  Space,
} from "@mantine/core";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "@mantine/form";
import {
  LoginUserInputMutation,
  useCreateUserInputMutation,
  useLoginUserInputMutation,
} from "../../generated/graphql";
import graphqlRequestClient from "../../lib/clients/graphqlRequestClient";
import { clearUserData, saveUserData } from "../../utils/localStorageUtils";
import { GraphQLError } from "graphql";
import showMessage from "../../global/components/notification";
import { useToggle } from "@mantine/hooks";
import SelectComponent from "../../globals/components/native-select";
import { eastAfricanCountries } from "../../globals/selections/constant";
import {
  AccountType,
  Gender,
  accounttypedata,
  genderData,
} from "../../lib/enums/enum";
import { logo } from "../../lib/images/url";
import { color } from "../../lib/color/mantine-color";
import UpdateNotification from "../../globals/components/update-notification";
import { notifications } from "@mantine/notifications";
import { IconX } from "@tabler/icons-react";
import LoadingNotification from "../../globals/components/load-notification";

const AuthenticationForm: FC = () => {
  const navigate = useNavigate();

  //TOGGLD STATES
  const [type, toggle] = useToggle(["login", "register"]);

  //STRING STATES
  const [error, setError] = useState<string | null>(null);

  //BOOLEAN STATES

  //FORMS
  const form = useForm({
    initialValues: {
      firstName: "",
      middleName: "",
      lastname: "",
      gender: null as Gender | null,
      phoneNumber: "",
      email: "",
      accountType: null as AccountType | null,
      password: "",
      confirmPassword: "",
      coutry_code: eastAfricanCountries[0].value,
      check: false,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) =>
        val.length <= 6
          ? "Password should include at least 6 characters"
          : null,
      confirmPassword: (val, values) =>
        val === values.password || type === "login"
          ? null
          : "Password do not match",
      phoneNumber: (val, values) =>
        /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(
          values.coutry_code.concat(val)
        ) || type === "login"
          ? null
          : "Invalid phone number",
      gender: (val) =>
        (val !== null && Object.values(Gender).includes(val)) ||
        type === "login"
          ? null
          : "please select gende",
      accountType: (val) =>
        (val !== null && Object.values(AccountType).includes(val)) ||
        type === "login"
          ? null
          : "please select account type",
      firstName: (val) =>
        val.length < 3 && type === "register"
          ? "First name is too short"
          : null,
      middleName: (val) =>
        val.length < 3 && type === "register"
          ? "Middle name is too short"
          : null,
      lastname: (val) =>
        val.length < 3 && type === "register" ? "Last name is too short" : null,
    },
  });

  // MUTATIONS
  const { mutate } = useLoginUserInputMutation(graphqlRequestClient, {
    onSuccess: (data: LoginUserInputMutation) => {
      saveUserData(data);
      navigate("/home", { replace: true });
      form.reset();
      return;
    },
    onError: (error: GraphQLError) => {
      //@ts-ignore
      const errorMessage = error.response.errors[0].message;
      Array.isArray(errorMessage)
        ? showMessage("Invalid", errorMessage)
        : setError(errorMessage);
    },
  });

  const { mutate: createUserInput } = useCreateUserInputMutation(
    graphqlRequestClient,
    {
      onSuccess: () => {
        UpdateNotification(
          {
            id: "register",
            message: "Data was saved successfully.",
            title: "Successfully",
          },
          3000
        );
        setTimeout(() => {
          toggle();
        }, 5000);

        return;
      },
      onError: (error: GraphQLError) => {
        const errorMessage =
          //@ts-ignore
          error.response.errors[0].extensions.originalError.message;
        //@ts-ignore
        const title = error.response.errors[0].message;

        notifications.hide("register");
        Array.isArray(errorMessage)
          ? showMessage(title, errorMessage)
          : setError(errorMessage);
      },
    }
  );

  //SELECTIONS
  const select_country_code = (
    <SelectComponent
      data={eastAfricanCountries}
      value={form.values.coutry_code}
      width={125}
      marginRight={8}
      onChange={(value: string) => {
        const selectedCountry = eastAfricanCountries.find(
          (country) => country.value === value
        );
        if (selectedCountry) {
          form.setFieldValue("coutry_code", value);
        }
      }}
    />
  );

  //METHODS
  const handleOnSubmit = async () => {
    if (type === "register") {
      form.reset();
      LoadingNotification({
        id: "register",
        message: "Please wait while saving your data",
        title: "Registration",
      });
      createUserInput({
        input: {
          username: form.values.email,
          firstName: form.values.firstName,
          middleName: form.values.middleName,
          lastname: form.values.lastname,
          gender: form.values.gender ?? "",
          phoneNumber: form.values.coutry_code.concat(form.values.phoneNumber),
          accountType: form.values.accountType ?? "",
          password: form.values.password,
        },
      });
    } else {
      mutate({
        input: {
          username: form.values.email,
          password: form.values.password,
        },
      });
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleOnSubmit)}>
      <Container size={420} my={40}>
        <Paper bg={`${color.gray_light_color}`} p={"sm"} radius={"md"}>
          <Flex align={"center"} direction={"column"} justify={"center"}>
            <Avatar src={`${logo}`} alt="logo" radius={"xl"} size={"lg"} />
            <Text size="xl">
              The Estate <Anchor>Soko</Anchor>
            </Text>
          </Flex>
        </Paper>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          {type === "register" && (
            <TextInput
              type="text"
              label="First name"
              value={form.values.firstName}
              placeholder="yuor first name"
              onChange={(event) =>
                form.setFieldValue("firstName", event.currentTarget.value)
              }
              error={form.errors.firstName && "First name is too short"}
              required
            />
          )}
          {type === "register" && (
            <TextInput
              type="text"
              label="Middle name"
              value={form.values.middleName}
              placeholder="yuor middle name"
              onChange={(event) =>
                form.setFieldValue("middleName", event.currentTarget.value)
              }
              error={form.errors.middleName && "Middle name is too short"}
              required
              mt={"md"}
            />
          )}
          {type === "register" && (
            <TextInput
              type="text"
              label="Last name"
              value={form.values.lastname}
              placeholder="yuor last name"
              onChange={(event) =>
                form.setFieldValue("lastname", event.currentTarget.value)
              }
              error={form.errors.lastname && "Last name is too short"}
              required
              mt={"md"}
            />
          )}
          <TextInput
            type="email"
            label="Email"
            value={form.values.email}
            placeholder="you@gmail.com"
            onChange={(event) =>
              form.setFieldValue("email", event.currentTarget.value)
            }
            error={
              type === "login"
                ? error || (form.errors.password && "Invalid email")
                : form.errors.password && "Invalid email"
            }
            required
            mt={"md"}
          />
          {type === "register" && (
            <TextInput
              label="Phone number"
              type="tel"
              value={form.values.phoneNumber}
              placeholder="7#########"
              leftSection={select_country_code}
              leftSectionWidth={128}
              onChange={(event) =>
                form.setFieldValue("phoneNumber", event.currentTarget.value)
              }
              error={form.errors.phoneNumber && "invalid phone number"}
              required
              mt="md"
            />
          )}
          {type === "register" && (
            <Select
              value={form.values.gender}
              checkIconPosition="right"
              label="Gender"
              placeholder="pick your gender"
              data={genderData}
              clearable
              error={form.errors.gender && "please select your gender"}
              onChange={(value) =>
                form.setFieldValue("gender", (value as Gender) ?? null)
              }
              required
              mt={"md"}
            />
          )}
          {type === "register" && (
            <Select
              value={form.values.accountType}
              checkIconPosition="right"
              label="Account type"
              placeholder="pick your gender"
              data={accounttypedata}
              clearable
              error={form.errors.accountType && "please select account type"}
              onChange={(value) =>
                form.setFieldValue(
                  "accountType",
                  (value as AccountType) ?? null
                )
              }
              mt={"md"}
            />
          )}
          <PasswordInput
            label="Password"
            placeholder="Your password"
            value={form.values.password}
            onChange={(event) =>
              form.setFieldValue("password", event.currentTarget.value)
            }
            error={
              type === "login"
                ? error ||
                  (form.errors.password &&
                    "Password should include at least 6 characters")
                : form.errors.password &&
                  "Password should include at least 6 characters"
            }
            required
            mt="md"
          />
          {type === "register" && (
            <PasswordInput
              label="Re-type password"
              placeholder="confirm password"
              value={form.values.confirmPassword}
              onChange={(event) =>
                form.setFieldValue("confirmPassword", event.currentTarget.value)
              }
              error={form.errors.confirmPassword && "password do not match"}
              required
              mt="md"
            />
          )}
          <Flex
            align={"center"}
            justify={"space-between"}
            direction={"row"}
            mt={"md"}
          >
            <Checkbox
              label={`${type === "login" ? "Remember me" : "Accept terms"}`}
            />
            {type === "login" && (
              <Anchor component="button" size="sm">
                Forgot password?
              </Anchor>
            )}
          </Flex>
          {error && <Space h={"md"} />}
          {type === "register" && error && (
            <Notification icon={<IconX />} color="red" title="Oops!">
              {error}
            </Notification>
          )}
          <Button type="submit" fullWidth mt="xl">
            {type === "login" ? "Sign in" : "Submit"}
          </Button>

          <Text ta={"center"} mt="md">
            {type === "register" ? (
              <>
                Already have an account?{" "}
                <Anchor<"a">
                  href="#"
                  fw={700}
                  onClick={(e) => {
                    e.preventDefault();
                    toggle();
                  }}
                >
                  Login
                </Anchor>
              </>
            ) : (
              <>
                Don&apos;t have an account?{" "}
                <Anchor<"a">
                  href="#"
                  fw={700}
                  onClick={(e) => {
                    e.preventDefault();
                    setError(null);
                    form.reset();
                    toggle();
                  }}
                >
                  Register
                </Anchor>
              </>
            )}
          </Text>
        </Paper>

        <Space h={"xl"} />
      </Container>
    </form>
  );
};

export default AuthenticationForm;
