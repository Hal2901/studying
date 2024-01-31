import clsx from "clsx";
import React, { memo } from "react";
import { useTranslation } from "react-i18next";
import IcImageAbsolute from "../../../../assets/icons/IcImageAbsolute";

interface Props {
  data: {
    title?: string;
    imageLink: string;
    messages: string;
  };
  fromManager?: boolean
}
const InfoPerson = memo(({ data, fromManager = false }: Props) => {
  const { t } = useTranslation();
  return (
    <div className="w-full grid 2xl:grid-cols-[490px_1fr] lg:grid-cols-[380px_1fr] grid-cols-1  relative gap-16 pb-100 pt-[150px] lg:pt-[150px]">
      <div
        className={clsx(
          "lg:block hidden absolute -z-[1] top-[70px] -right-20 "
        )}
      >
        <IcImageAbsolute />
      </div>
      <div className="absolute w-[100vw] xl:w-[50vw] h-[800px] sc1800:left-[-300px] xl:left-[-155px] sm:left-[-100px] px-5 -z-10 top-[40px] bg-neutral-50">
      </div>
      <div className="2xl:h-600 sm:h-500 h-auto bg-main ">
        <img
          src={data?.imageLink}
          className="w-full h-full lg:object-cover object-contain xs:translate-x-10 xs:-translate-y-10 bg-neutral-50"
          alt=""
        />
      </div>
      <div className="h-fit flex justify-center">
        <div className="p-10 bg-white rounded-[4px] shadow-normal flex flex-col gap-6">
          <p className="lg:text-40 text-3xl font-semibold">
            {fromManager ? t('message_from_manager') : t("message_from_president")}
          </p>
          <p className="text-main text-xl">{data?.title}</p>
          {data?.messages.split('\n').map(item => <p>{item}</p>)}
        </div>
      </div>
    </div>
  );
});

export default InfoPerson;
