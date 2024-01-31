import clsx from "clsx";
import { memo } from "react";
import { useTranslation } from "react-i18next";

interface Props {
  text: string;
  className?: string;
}
const TitlePage = memo(
  ({ text, className }: Props) => {
    const { t } = useTranslation();
    return (
      <div className="flex items-center gap-18">
        <h4
          className={clsx(
            "uppercase font-bold xl:text-32px sm:text-2xl text-base text-main",
            className
          )}
        >
          {t(text)}
        </h4>
      </div>
    );
  }
);

export default TitlePage;
