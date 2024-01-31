import { useTranslation } from "react-i18next";
import clsx from "clsx";
import React, { InputHTMLAttributes, memo } from "react";

type Props = {
  withIndicator?: boolean;
  IconComponent?: React.ReactNode;
  renderRight?: () => React.ReactElement;
  renderLeft?: () => React.ReactElement;
  icon?: boolean;
  type?: string;
  borderBold?: boolean;
  setShowPassword?: (value: boolean) => void;
  disabled?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

const InputComponent = memo(
  React.forwardRef(
    (
      {
        withIndicator,
        IconComponent,
        placeholder = "",
        borderBold = false,
        renderRight,
        renderLeft,
        className,
        value,
        maxLength,
        icon,
        setShowPassword,
        disabled = false,
        type = "text",
        ...props
      }: Props,
      ref: React.LegacyRef<HTMLInputElement>
    ) => {
      const { t } = useTranslation();
      return (
        <div
          className={clsx(
            "flex items-center border border-main relative rounded-[10px] px-2"
          )}
        >
          <input
            type={type}
            ref={ref}
            autoComplete="off"
            value={value}
            maxLength={maxLength}
            {...props}
            className={clsx(
              "flex-1 outline-none bg-transparent text-text-normal text-sm min-h-5 py-3 px-4",
              className
            )}
            placeholder={t(placeholder) || ""}
            disabled={disabled}
          />
          {IconComponent && (
            <div className="absolute right-6 top-[50%] -translate-y-[50%]">
              {IconComponent}
            </div>
          )}
          {maxLength && (
            <div className="text-main  flex items-center ">
              <span>{value?.toString().length || 0}</span>/{maxLength}
            </div>
          )}
        </div>
      );
    }
  )
);

export default InputComponent;
