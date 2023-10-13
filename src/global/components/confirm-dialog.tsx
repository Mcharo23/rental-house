import { ConfirmDialog } from "primereact/confirmdialog";
import { useState } from "react";

type ConfirmDialogProps = {
  message: string;
  header: string;
  icon: string;
  accept?: () => void;
  reject?: () => void;
};

const CustomConfirmDialog = ({
  message,
  header,
  icon,
  accept,
  reject,
}: ConfirmDialogProps) => {
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <>
      <ConfirmDialog
        visible={visible}
        onHide={() => setVisible(false)}
        message={message}
        header={header}
        icon={icon}
        accept={accept}
        reject={reject}
      />
    </>
  );
};

export default CustomConfirmDialog;
