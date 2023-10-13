import { notifications } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons-react";
import { LoadAndHideNotificationProps } from "../../global/interfaces/type";

const UpdateNotification = (
  { id, title, message }: LoadAndHideNotificationProps,
  delay: number
) => {
  setTimeout(() => {
    notifications.update({
      id: id,
      color: "teal",
      title: title,
      message: message,
      icon: <IconCheck size="1rem" />,
      autoClose: 2000,
    });
  }, delay);
};

export default UpdateNotification;
