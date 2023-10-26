import { notifications } from "@mantine/notifications";

type CustomizedNotificationProps = {
  title: string;
  message: string;
};

const ShowNotification = ({ title, message }: CustomizedNotificationProps) => {
  notifications.show({
    title: title,
    message: message,
  });
};

export default ShowNotification;
