import React from "react";
import { useTranslation } from "react-i18next";
interface Props {
  className?: string;
}
const NoContent = ({ className }: Props) => {
  const { t } = useTranslation();
  return (
    <div
      className={
        "w-full min-h-screen flex items-center justify-center text-defaultText " +
        className
      }
    >
      <div>
        <p className="text-xl text-center font-bold ">{t("no_data")}</p>
      </div>
    </div>
  );
};

export default NoContent;
