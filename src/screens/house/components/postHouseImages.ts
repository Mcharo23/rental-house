import axios from "axios";
import { UPLOAD_IMAGE_BASE } from "../../../lib/api-base";

const uploadImages = async (files: File[], accessToken: string | null) => {
  if (!accessToken) {
    return;
  }

  const formData = new FormData();
  files.forEach((file) => {
    formData.append("file", file);
  });

  const headers = {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "multipart/form-data",
  };

  try {
    const response = await axios.post(`${UPLOAD_IMAGE_BASE}`, formData, {
      headers,
    });

    if (response.status === 201) {
      return response.data;
    } else {
      throw new Error(`HTTP Error: ${response.status}`);
    }
  } catch (error) {
    console.error("Error uploading files:", error);
    throw error;
  }
};

export default uploadImages;
// This is the test 1 conducted after migrating the project from using 4 providers for UI design which are tailwind, chakra, prime react and mantine so currently on this test aims testing uploading house using Modal from mantine
