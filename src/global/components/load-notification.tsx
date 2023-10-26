import { notifications } from "@mantine/notifications";

type LoadAndHideNotificationProps = {
  id: string;
  title: string;
  message: string;
};

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
