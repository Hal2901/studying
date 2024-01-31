import clsx from "clsx";
import React, { InputHTMLAttributes, memo } from "react";
import { useTranslation } from "react-i18next";
import IcMagnifyingGlass from "../assets/icons/IcMagnifyingGlass";
import colors from "../common/colors";
type Props = {
  icon?: React.ReactElement;
  iconLeft?: React.ReactElement;
  placeholder?: string;
  reSearch?: boolean;
  isTextarea?: boolean;
  rows?: number;
} & (
    | {
      isTextarea?: false;
      onChange?: React.ChangeEventHandler<HTMLInputElement>;
    }
    | {
      isTextarea: true;
      onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
    }
  ) &
  Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> &
  Omit<InputHTMLAttributes<HTMLTextAreaElement>, "onChange">;

export const InputElement = memo(
  React.forwardRef(
    (
      {
        placeholder = "",
        icon,
        iconLeft,
        className,
        reSearch = false,
        isTextarea = false,
        rows = 5,
        ...props
      }: Props,
      ref: React.LegacyRef<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      const { t } = useTranslation();
      return (
        <div
          className={clsx(
            "h-min placeholder:text-disabled placeholder:text-sm text-defaultText w-full bg-whiteFAFAFA rounded-10 flex items-center py-3 px-4 border border-solid border-border relative " +
            className,
            {
              "!pl-14": reSearch,
            }
          )}
        >
          {reSearch && (
            <div className="absolute left-0 w-12 h-full flex items-center justify-center rounded-r-10">
              <IcMagnifyingGlass color={colors.disable_color} />
            </div>
          )}
          {isTextarea ? (
            <textarea ref={ref as React.LegacyRef<HTMLTextAreaElement>} autoComplete="off" className="flex-1 h-full outline-none bg-inherit max-w-full resize-none" {...(props as InputHTMLAttributes<HTMLTextAreaElement>)} rows={rows} placeholder={t(placeholder) || ""} ></textarea>
          ) : (
            <input
              ref={ref as React.LegacyRef<HTMLInputElement>}
              autoComplete="off"
              {...(props as InputHTMLAttributes<HTMLInputElement>)}
              className="flex-1 h-full outline-none bg-inherit max-w-full"
              placeholder={t(placeholder) || ""}
            />
          )}

        </div>
      );
    }
  )
);
