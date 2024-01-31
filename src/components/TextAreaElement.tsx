import clsx from "clsx";
import React, { TextareaHTMLAttributes, memo } from "react";
import { useTranslation } from "react-i18next";
import IcMagnifyingGlass from "../assets/icons/IcMagnifyingGlass";
type Props = {
  icon?: React.ReactElement;
  iconLeft?: React.ReactElement;
  placeholder?: string;
  reSearch?: boolean;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

export const TextAreaElement = memo(
  React.forwardRef(
    (
      {
        placeholder = "",
        icon,
        iconLeft,
        className,
        reSearch = false,
        ...props
      }: Props,
      ref: React.LegacyRef<HTMLTextAreaElement>
    ) => {
      const { t } = useTranslation();
      return (
        <div
          className={clsx(
            "placeholder:text-disabled placeholder:text-sm text-defaultText w-full bg-whiteFAFAFA rounded-10 flex items-center py-3 px-4 border border-solid border-border relative " +
              className,
            {
              "!pr-14": reSearch,
            }
          )}
        >
          <textarea
            ref={ref}
            autoComplete="off"
            rows={5}
            {...props}
            className="flex-1 w-full h-full outline-none bg-inherit resize-none"
            placeholder={t(placeholder) || ""}
          />
        </div>
      );
    }
  )
);
