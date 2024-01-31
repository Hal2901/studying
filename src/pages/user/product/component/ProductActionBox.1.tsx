import React, { memo } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../../../../components/Button";
import IcDownload from "../../../../assets/icons/IcDowload";
import colors from "../../../../common/colors";
import { Props } from "./ProductActionBox";
import IcCoppy from "../../../../assets/icons/IcCoppy";

export const ProductActionBox = memo(
  ({ icon, text, onCopy, onDownload }: Props) => {
    const { t } = useTranslation();
    return (
      <div className="w-full border border-border rounded-[4px] p-4 h-88 flex items-center justify-between bg-whiteFAFAFA">
        <div className="flex items-center gap-2">
          <div className="rounded-1/2 bg-white flex items-center justify-center">
            {icon}
          </div>
          <div>{t(text)}</div>
        </div>
        <div className="h-full flex flex-col justify-between">
          <Button
            color="normal"
            text="download"
            className="!text-sm !font-normal !text-defaultText px-2 py-1 !w-fit"
            image={<IcDownload color={colors.gray01} />}
          />
          <Button
            color="normal"
            text="download"
            className="!text-sm !font-normal !text-defaultText px-2 py-1 !w-fit"
            image={<IcCoppy color={colors.gray01} />}
          />
        </div>
      </div>
    );
  }
);
