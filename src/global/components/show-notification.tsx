import { notifications } from "@mantine/notifications";

import { CustomizedNotificationProps } from "../interfaces/type";

const ShowNotification = ({ title, message }: CustomizedNotificationProps) => {
  notifications.show({
    title: title,
    message: message,
  });
};

export default ShowNotification;
