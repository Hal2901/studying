import clsx from "clsx";
import { useTranslation } from "react-i18next";

const TitlePage = ({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) => {
  const { t } = useTranslation();
  return (
    <div
      className={clsx(
        "w-full mb-8 lg:text-40 text-3xl font-semibold",
        className
      )}
    >
      {t(text)}
    </div>
  );
};

export default TitlePage;
