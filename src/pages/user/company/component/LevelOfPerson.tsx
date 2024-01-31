import React, { memo } from "react";
import { useTranslation } from "react-i18next";

interface Props {
  title: string;
  data: {
    [key: string]: string;
  };
}
const LevelOfPerson = memo(({ title, data }: Props) => {
  const { t } = useTranslation()
  return (
    <div className="mb-10">
      <div className="flex items-center justify-between flex-wrap gap-6 mb-6 relative">
        <p className="text-xl font-semibold w-fit">{title}</p>
        <div className="max-w-[82%] w-full h-[1px] bg-border "></div>
      </div>
      <div>
        {Object.entries(data).map((entries, index) => {
          return (
            <p className="mb-4" key={index}>
              <span className="font-semibold"> {entries[0]}</span> &nbsp;-&nbsp;
              <span> {t(entries[1])}</span>
            </p>
          );
        })}
      </div>
    </div>
  );
});

export default LevelOfPerson;
