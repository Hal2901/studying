import clsx from "clsx";
import React from "react";
import { useTranslation } from "react-i18next";

type Props = {
  text: string;
  className?: string;
};
const TitleAdminPage = ({ text, className }: Props) => {
  const { t } = useTranslation();
  return (
    <div className={clsx("w-fit text-2xl font-semibold", className)}>
      {t(text ?? "")}
    </div>
  );
};

export default TitleAdminPage;
