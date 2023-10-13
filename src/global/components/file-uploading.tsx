import { FC, useState } from "react";
import { FileInput, FileInputProps, Text } from "@mantine/core";

type FileUploadingProps = {
  onChange: (files: File[] | null) => void;
};

const ValueComponent: FileInputProps["valueComponent"] = ({ value }) => {
  if (value === null) {
    return null;
  }

  if (Array.isArray(value)) {
    return (
      <div className="grid grid-cols-3 gap-2">
        {value.map((file, index) => (
          <Text key={index} className="bg-slate-200 rounded-lg text-xs">
            {file.name}
          </Text>
        ))}
      </div>
    );
  }

  return <Text>{value.name}</Text>;
};

const ImagePreview: FC<{
  files: File[] | null;
  onDelete: (index: number) => void;
}> = ({ files, onDelete }) => {
  if (files === null) {
    return null;
  }

  return (
    <div className="grid grid-cols-4 sm:grid-cols-5 xl:grid-cols-5 md:grid-cols-4 lg:grid-cols-4 2xl:grid-cols-5 bg-slate-200 rounded-lg mt-5 p-2 gap-1 ">
      {files.map((file, index) => (
        <div
          key={index}
          className="object-cover rounded-full h-20 w-20 items-center flex relative"
        >
          <img
            src={URL.createObjectURL(file)}
            alt={file.name}
            className="w-full h-full rounded-full"
          />
          <button
            className="pi pi-times absolute right-1 top-1 bg-white rounded-md"
            onClick={() => {
              onDelete(index);
            }}
          />
        </div>
      ))}
    </div>
  );
};

type CustomSize = "1MB";

const validateFileSize = (file: File, maxSize?: CustomSize): boolean => {
  const maxSizeInBytes = {
    "1MB": 1024 * 1024,
  }[maxSize ?? "1MB"];

  return file.size <= maxSizeInBytes;
};

const FileUploading: FC<FileUploadingProps> = ({ onChange }) => {
  const [selectedFiles, setSelectedFiles] = useState<File[] | null>(null);

  const handleFileChange = (files: File[]) => {
    const filteredFiles = files?.filter((file) => validateFileSize(file));

    setSelectedFiles(filteredFiles);
    onChange(filteredFiles);
  };

  const handleDelete = (index: number) => {
    if (selectedFiles) {
      const updatedFiles = [...selectedFiles];
      updatedFiles.splice(index, 1);
      setSelectedFiles(updatedFiles);
      onChange(updatedFiles);
    }
  };

  return (
    <>
      <FileInput
        label="select images atleast 5"
        accept="image/png,image/jpeg"
        placeholder="Upload images"
        multiple
        valueComponent={ValueComponent}
        clearable
        onChange={handleFileChange}
      />
      <div className={`${selectedFiles?.length !== 0 ? "" : "hidden"}`}>
        {selectedFiles !== null ? (
          <ImagePreview files={selectedFiles} onDelete={handleDelete} />
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default FileUploading;
