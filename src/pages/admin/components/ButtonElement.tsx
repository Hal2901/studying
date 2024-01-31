import { useTranslation } from "react-i18next";
import clsx from "clsx";
import React, { ButtonHTMLAttributes, memo } from "react";

type Props = {
  ref?: any;
  className?: string;
  text: string;
  image?: React.ReactNode;
  imageRight?: React.ReactNode;
  disable?: boolean;
  typeBtn: "cancel" | "save" | "del" | "edit" | "main" | 'view';
} & ButtonHTMLAttributes<HTMLButtonElement>;

const ButtonElement = memo(
  React.forwardRef(
    (
      {
        text,
        typeBtn = "save",
        image,
        imageRight,
        disable = false,
        className,
        ...props
      }: Props,
      ref: any
    ) => {
      const { t } = useTranslation();
      return (
        <button
          type="button"
          disabled={disable}
          ref={ref}
          {...props}
          className={clsx(
            "flex items-center gap-4 justify-center min-w-[120px] min-h-[32px] text-sm font-normal rounded-md",
            {
              "bg-active text-white": typeBtn === "save",
              "bg-error text-white": typeBtn === "del",
              "bg-main text-white": typeBtn === "main",
              "bg-transparent text-main border border-main": typeBtn === "edit",
              "bg-transparent border border-error text-error":
                typeBtn === "cancel",
              "cursor-not-allowed": disable,
              "bg-primary-300": typeBtn === "view",
            },
            className
          )}
        >
          {image}
          {t(text) ?? text ?? ""}
        </button>
      );
    }
  )
);

export default ButtonElement;
