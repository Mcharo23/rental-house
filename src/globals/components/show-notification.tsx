import { notifications } from "@mantine/notifications";

import { CustomizedNotificationProps } from "../../global/interfaces/type";

const ShowNotification = ({ title, message }: CustomizedNotificationProps) => {
  notifications.show({
    title: title,
    message: message,
  });
};

export default ShowNotification;
