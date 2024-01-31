// import IcDelete from "@assets/icons/manage/IcDelete";
// import IcWarning from "@assets/icons/manage/IcWarning";
import { useTranslation } from "react-i18next";
import ButtonElement from "../pages/admin/components/ButtonElement";
import React, { memo, useContext } from "react";
import IcDelete from "../assets/icons/IcDelete";
import { Button } from "../components/Button";
import { ModalContext } from ".";

interface PropsMd {
  message: string;
  subMessage?: string;
  onSubmit: () => void;
  onCancel: () => void;
}
interface typeMessage {
  message: string;
  subMessage?: string;
  typeMessage: "success" | "warning" | "error";
}

const sub =
  "Đây là hành động vĩnh viễn, bạn sẽ không thể hủy hoặc lấy lại dữ liệu một khi đã bị xóa";
export const ConfirmDeleteMd = memo(
  ({ message, subMessage = sub, onCancel, onSubmit }: PropsMd) => {
    const { t } = useTranslation();
    return (
      <div className="lg:w-[40vw] w-[80vw] max-h-[90vh h-auto gap-[18px] shadow-box bg-white py-12 lg:px-20 px-5 flex flex-col justify-center items-center rounded-[20px]">
        {/* <IcDelete width={50} height={65} /> */}
        <p className="md:text-2xl text-lg font-semibold text-main text-center ">
          {t(message) ?? message ?? ""}
        </p>
        {subMessage && (
          <p className="text-sm max-w-[60%] font-normal text-main text-center">
            {t(subMessage) ?? subMessage ?? ""}
          </p>
        )}
        <div className="mt-[10px] flex items-center justify-center gap-2">
          <ButtonElement
            onClick={onCancel}
            text="button.cancel"
            typeBtn="cancel"
            className="h-37"
          />
          <ButtonElement
            onClick={onSubmit}
            text="button.delete"
            typeBtn="del"
            className="h-37"
          />
        </div>
      </div>
    );
  }
);

export const ModalMessage = memo(
  ({ message, subMessage, typeMessage }: typeMessage) => {
    const { t } = useTranslation();
    return (
      <div className="lg:w-[40vw] w-[80vw] max-h-[90vh h-auto gap-[18px] shadow-box bg-white py-[92px] flex flex-col justify-center items-center rounded-[20px]">
        {typeMessage === "warning" /* && <IcWarning /> */}
        <p className="lg:text-2xl text-lg font-semibold text-main text-center">
          {t(message) ?? message ?? ""}
        </p>
        {subMessage && (
          <p className="text-sm max-w-[50%] font-normal text-main text-center">
            {t(subMessage) ?? subMessage ?? ""}
          </p>
        )}
      </div>
    );
  }
);

interface Props {
  message?: string;
  note?: string
  onDelete: () => void;
  onCancel?: () => void
  icon?: any
  cancelColor?: "primary" | "empty" | "cancel" | "danger" | "normal"
  submitColor?: "primary" | "empty" | "cancel" | "danger" | "normal"
}
export const ConfirmModal = memo(
  ({
    message = "Bạn có chắc chắn xóa thông tin này khỏi hệ thống?",
    note,
    onDelete,
    onCancel = () => { },
    icon = <IcDelete width={120} height={120} />,
    cancelColor = 'cancel',
    submitColor = 'danger'
  }: Props) => {
    const { closeModal } = useContext(ModalContext);
    const { t } = useTranslation();

    const handleCancel = () => {
      closeModal()
      onCancel()
    }

    const handleConfirm = () => {
      onDelete();
      closeModal();
    };

    return (
      <div className="w-[50vw]  rounded-10 bg-white py-10 px-6 flex flex-col items-center gap-3 ">
        <div className="mb-6">
          {icon}
        </div>
        <div className="flex flex-col items-center mb-10">
          <p className="text-xl font-bold ">{t(message ?? "")}</p>
          <p className="text-neutral-800 text-xs font-normal leading-[18px]">{t(note ?? '')}</p>
        </div>

        <div className="flex items-center justify-center gap-6">
          <Button
            color={cancelColor}
            text="cancel_btn"
            className="px-6 py-3 !w-fit"
            onClick={handleCancel}
          />
          <Button
            color={submitColor}
            text="confirm"
            className="px-6 py-3 !w-fit"
            onClick={handleConfirm}
          />
        </div>
      </div>
    );
  }
);
