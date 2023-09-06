import { notifications } from "@mantine/notifications";
import { LoadAndHideNotificationProps } from "../interfaces/type";

const LoadingNotification = ({
  id,
  title,
  message,
}: LoadAndHideNotificationProps) => {
  notifications.show({
    id: id,
    loading: true,
    title: title,
    message: message,
    autoClose: false,
    withCloseButton: false,
  });
};

export default LoadingNotification;
