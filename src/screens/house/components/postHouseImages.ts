import axios from "axios";

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
    const response = await axios.post(
      "http://localhost:3000/house/upload-house-images/",
      formData,
      { headers }
    );

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
