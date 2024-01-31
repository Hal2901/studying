import React from "react";
import { useTranslation } from "react-i18next";

interface Props {
  text: string;
  option?: { [key: string]: string | number };
}
const TextError = ({ text, option }: Props) => {
  const { t } = useTranslation();
  return (
    <span className="my-1 text-xs text-danger">
      {t(text ?? "", option ? option : {})}
    </span>
  );
};

export default TextError;
