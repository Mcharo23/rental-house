import { notifications } from "@mantine/notifications";

const showMessage = (title: string, message: string[]) => {
    Array(message.length)
      .fill(0)
      .forEach((_, index) => {
        setTimeout(() => {
          notifications.show({
            title: title,
            message: message[index],
          });
        }, 200 * index);
      });
  };

  export default showMessage;