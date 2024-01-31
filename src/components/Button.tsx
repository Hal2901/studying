import clsx from "clsx";
import React, { ButtonHTMLAttributes, memo, useContext } from "react";
import { useTranslation } from "react-i18next";

type Props = {
  color: "primary" | "empty" | "cancel" | "danger" | "normal";
  text: string;
  image?: React.ReactNode;
  imageLeft?: React.ReactNode;
  disabled?: boolean;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = memo(
  ({
    color = "normal",
    text,
    image,
    className,
    imageLeft,
    disabled = false,
    ...props
  }: Props) => {
    const { t } = useTranslation();

    return (
      <button
        type="button"
        disabled={disabled}
        {...props}
        className={clsx(
          "relative h-12 p-3 text-base min-w-[120px] w-full font-bold overflow-hidden hover:opacity-80 rounded-10 flex gap-1 justify-center items-center " +
            className,
          {
            "bg-main text-white": color === "primary",
            "bg-transparent text-main border border-main": color === "empty",
            "bg-danger text-white": color === "danger",
            "bg-transparent text-danger border border-danger":
              color === "cancel",
            "bg-transparent text-disabled border border-border":
              color === "normal",
            "cursor-not-allowed": disabled,
          }
        )}
      >
        {imageLeft}
        {t(text)}
        {image}
      </button>
    );
  }
);
