import React, { ChangeEvent, InputHTMLAttributes } from "react";
import { useTranslation } from "react-i18next";
import IcLabelUploadImg from "../assets/icons/IcLabelUploadImg";

type Props = {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onPaseLink?: (link: string) => void;
  isVideos?: boolean;
  multiple?: boolean;
  htmlFor?: string;
  subText?: string;
  disabled?: boolean;
  className?: string;
  imgSize?: string
} & InputHTMLAttributes<HTMLInputElement>;

const InputUploadFile = React.forwardRef(
  (
    {
      onChange,
      onPaseLink,
      isVideos,
      multiple = false,
      subText,
      className,
      disabled = false,
      imgSize,
      ...props
    }: Props,
    ref: React.LegacyRef<HTMLInputElement>
  ) => {
    const { t } = useTranslation();
    const onInputClick = (
      e: React.MouseEvent<HTMLInputElement, MouseEvent>
    ) => {
      e.currentTarget.value = "";
    };

    return (
      <label className="flex flex-col items-center justify-center gap-4 min-h-[190px] min-w-[340px] border border-dashed border-border cursor-pointer">
        <div className="flex items-center gap-4">
          <IcLabelUploadImg />
          <p>
            {t("chose_image")} <span className="text-active">{t("here")}</span>
          </p>
        </div>
        {imgSize && (
          <p className="text-sm italic">
            {t(imgSize)}
          </p>
        )}
        <input
          ref={ref}
          onClick={onInputClick}
          accept={isVideos ? "video/*" : "image/*"}
          onChange={onChange}
          hidden
          multiple
          type="file"
          {...props}
          disabled={disabled}
        />
      </label>
    );
  }
);

export default InputUploadFile;
