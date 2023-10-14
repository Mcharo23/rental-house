import {
  Avatar,
  Button,
  FileInput,
  Grid,
  NativeSelect,
  Paper,
  Space,
  TextInput,
  Textarea,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconPhoto, IconPlus } from "@tabler/icons-react";
import { FC, useEffect, useState } from "react";
import { locations, period } from "../../../globals/selections/constant";
import SelectComponent from "../../../globals/components/native-select";
import { notifications } from "@mantine/notifications";
import { GraphQLError } from "graphql";
import { useCreateHouseInputMutation } from "../../../generated/graphql";
import ShowNotification from "../../../globals/components/show-notification";
import graphqlRequestClient from "../../../lib/clients/graphqlRequestClient";
import { useQueryClient } from "@tanstack/react-query";
import uploadImages from "./postHouseImages";
import { getUserAccessToken } from "../../../utils/localStorageUtils";

type NewHouseFormProps = {
  onClick: () => void;
};

type CustomSize = "1MB";

const validateFileSize = (file: File, maxSize?: CustomSize): boolean => {
  const maxSizeInBytes = {
    "1MB": 1024 * 1024,
  }[maxSize ?? "1MB"];

  return file.size <= maxSizeInBytes;
};

const NewHouseForm: FC<NewHouseFormProps> = ({ onClick }) => {
  const queryClient = useQueryClient();

  // STRING STATES
  const [accessToken, setAccessToken] = useState<string | null>(null);

  // FILE STATES
  const [selectedFiles, setSelectedFiles] = useState<File[] | null>(null);

  //USE EFFECTS
  useEffect(() => {
    const token = getUserAccessToken();

    if (token) {
      setAccessToken(token);
    }
  }, []);

  // FORMS
  const newHouseForm = useForm({
    initialValues: {
      name: "",
      region: "",
      district: "",
      ward: "",
      price: "",
      description: "",
      option: "",
      images: [],
    },
    validate: {
      region: (val) => (val === "" ? "please pick house region" : null),
      name: (val) => (val.length < 5 ? "House name is too short" : null),
      ward: (val) => (val.length < 3 ? "Ward nmame is too short" : null),
      description: (val) => (val.length <= 100 ? "To short description" : null),
      option: (val) => (val === "" ? "Please select price options" : null),
    },
  });

  // MUTATIONS
  const { mutate: createHouseMutate } = useCreateHouseInputMutation(
    graphqlRequestClient.setHeaders({ Authorization: `Bearer ${accessToken}` }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([
          "getMyHouse",
          "getDemoHouses",
          "getHouses",
        ]);
        ShowNotification({
          title: "House Added Successfully 🏡",
          message:
            "The house has been added to the database successfully. Congratulations! 🎉",
        });
        newHouseForm.reset();
        onClick();
        return;
      },
      onError: (error: GraphQLError) => {
        //@ts-ignore
        Array.isArray(error.response.errors[0].extensions.originalError.message)
          ? Array(
              //@ts-ignore
              error.response.errors[0].extensions.originalError.message.length
            )
              .fill(0)
              .forEach((_, index) => {
                setTimeout(() => {
                  notifications.show({
                    title: `Notification ${index + 1}`,
                    message: "message",
                  });
                }, 200 * index);
              })
          : alert("message");
      },
    }
  );

  //METHODS
  const handleOnSubmit = async () => {
    if (selectedFiles !== null) {
      if (selectedFiles.length < 5) {
        newHouseForm.setErrors({
          images: "maximum size of 1M and five 5 required",
        });
      } else {
        try {
          const response = await uploadImages(selectedFiles, accessToken);
          await createHouseMutate({
            input: {
              name: newHouseForm.values.name,
              Region: newHouseForm.values.region,
              District: newHouseForm.values.district,
              Ward: newHouseForm.values.ward,
              Description: newHouseForm.values.description,
              price: Number(newHouseForm.values.price),
              imgUrl: response,
            },
          });
        } catch (error) {
          console.error("Error uploading files:", error);
        }
      }
    }
  };

  const handleFileChange = (files: File[]) => {
    const filteredFiles: File[] = files?.filter((file) =>
      validateFileSize(file)
    );

    setSelectedFiles(filteredFiles);
  };

  //SELECTIONS
  const select = (
    <SelectComponent
      data={period}
      value={newHouseForm.values.option}
      width={110}
      onChange={(value) => newHouseForm.setFieldValue("option", value)}
    />
  );

  return (
    <>
      <Paper withBorder shadow="md" p={30} radius="md">
        <form onSubmit={newHouseForm.onSubmit(handleOnSubmit)}>
          <TextInput
            type="text"
            label="House name"
            value={newHouseForm.values.name}
            placeholder="your house name"
            onChange={(event) =>
              newHouseForm.setFieldValue("name", event.currentTarget.value)
            }
            error={newHouseForm.errors.name && "House name is too short"}
            required
          />

          <Space h={"md"} />

          <NativeSelect
            label="Region"
            placeholder="Pick house region"
            value={newHouseForm.values.region}
            data={locations}
            error={newHouseForm.errors.region && "Please pick house region"}
            onChange={(event) =>
              newHouseForm.setFieldValue("region", event.currentTarget.value)
            }
            required
            withAsterisk
          />

          <Space h={"md"} />

          {newHouseForm.values.region !== "" && (
            <NativeSelect
              label="District"
              placeholder="Pick house district"
              value={newHouseForm.values.district}
              data={
                locations.find(
                  (region) => region.value === newHouseForm.values.region
                )?.district || []
              }
              error={
                newHouseForm.errors.district && "Please pick house district"
              }
              onChange={(event) =>
                newHouseForm.setFieldValue(
                  "district",
                  event.currentTarget.value
                )
              }
              required
              withAsterisk
            />
          )}

          {newHouseForm.values.district !== "" && (
            <>
              <Space h={"md"} />

              <TextInput
                type="text"
                label="Ward"
                value={newHouseForm.values.ward}
                placeholder="your house ward"
                onChange={(event) =>
                  newHouseForm.setFieldValue("ward", event.currentTarget.value)
                }
                error={newHouseForm.errors.ward && "Ward name is too short"}
                required
              />

              <Space h={"md"} />

              <TextInput
                label="Price"
                type="number"
                value={newHouseForm.values.price}
                placeholder="1000"
                rightSection={select}
                rightSectionWidth={110}
                onChange={(event) =>
                  newHouseForm.setFieldValue("price", event.currentTarget.value)
                }
                error={newHouseForm.errors.price && "invalid price input"}
                required
              />

              <Space h={"md"} />

              <Textarea
                label="Description"
                description="must be greater than 100 words"
                value={newHouseForm.values.description}
                placeholder="your description"
                onChange={(event) =>
                  newHouseForm.setFieldValue(
                    "description",
                    event.currentTarget.value
                  )
                }
                error={
                  newHouseForm.errors.description &&
                  "description must be more than 100 words"
                }
                required
                autosize
                maxRows={10}
              />

              <Space h={"md"} />

              <FileInput
                accept="image/png,image/jpeg"
                label="Upload images"
                placeholder="House images"
                withAsterisk
                multiple
                description="Select 5 or more images at once"
                leftSection={<IconPhoto />}
                clearable
                onChange={handleFileChange}
                error={
                  newHouseForm.errors.images &&
                  "maximum size of 1M and 5 images required"
                }
                required
              />

              {selectedFiles !== null && (
                <>
                  <Space h={"sm"} />
                  <Grid gutter="sm" justify="flex-start" align="flex-start">
                    {selectedFiles.map((file, index) => (
                      <Grid.Col key={index} span={2}>
                        <Avatar src={URL.createObjectURL(file)} />
                      </Grid.Col>
                    ))}
                  </Grid>
                </>
              )}
            </>
          )}

          <Space h={"md"} />

          <Button leftSection={<IconPlus />} type="submit" fullWidth>
            Add
          </Button>
        </form>
      </Paper>
    </>
  );
};

export default NewHouseForm;
