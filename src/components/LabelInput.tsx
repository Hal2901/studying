import clsx from "clsx";
import React, { memo } from "react";
import { useTranslation } from "react-i18next";

interface Props {
  isRequire?: boolean;
  text: string;
  subText?: string;
  className?: string;
  numberImageRequired?: number;
}
const LabelInput = memo(
  ({
    isRequire = true,
    text,
    subText,
    className,
    numberImageRequired,
  }: Props) => {
    const { t } = useTranslation();
    return (
      <div className={clsx("flex items-start mb-1", { className })}>
        <span className="text-base font-medium text-defaultText">
          {t(text) ?? text ?? ""}
        </span>
        {isRequire && (
          <span className="text-danger">
            *
            {numberImageRequired
              ? `(${t("form.number_image", { number: numberImageRequired })})`
              : ""}
          </span>
        )}
        {subText && (
          <span className="font-medium">
            &nbsp;{t(subText) ?? subText ?? ""}
          </span>
        )}
      </div>
    );
  }
);

export default LabelInput;
