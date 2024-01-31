import { ConfirmDeleteMd, ModalMessage } from "../context/ConfirmModal";
import { ModalContext } from "../context/ModalContext";
import { useContext } from "react";

interface TypeModal {
  onSubmit: () => void;
  message: string;
  subMessage?: string;
  onCancel?: () => void;
}
interface typeMessage {
  message: string;
  subMessage?: string;
  typeMessage: "success" | "warning" | "error";
}

export const useConfirmModal = () => {
  const { closeModal, setModal } = useContext(ModalContext);

  const showConfirm = ({
    message,
    subMessage,
    onSubmit,
    onCancel,
  }: TypeModal) => {
    return setModal(
      <ConfirmDeleteMd
        onSubmit={onSubmit}
        onCancel={() => {
          onCancel ? onCancel() : closeModal();
        }}
        message={message}
        subMessage={subMessage}
      />
    );
  };

  const showMessage = ({ message, subMessage, typeMessage }: typeMessage) => {
    return setModal(
      <ModalMessage
        message={message}
        subMessage={subMessage}
        typeMessage={typeMessage}
      />
    );
  };
  return {
    showConfirm,
    showMessage,
  };
};
