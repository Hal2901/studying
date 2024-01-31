import clsx from "clsx";
import React, { memo } from "react";
import { useTranslation } from "react-i18next";

interface Props {
  index: number;
  item: {
    office: string
    representative: string
    department: string
    position: string
    phone: string
    email: string
    address: string
    factory: string
    factory_address: string
    factory_phone: string
  };
}
const OfficeItem = memo(({ index, item }: Props) => {
  const { t } = useTranslation();
  return (
    <div className="w-full p-6 flex flex-col gap-4 xs:h-max h-max bg-white rounded-[4px] text-black">
      <div
        className={clsx(
          "rounded-[4px] h-12 px-4  text-white flex items-center text-lg font-semibold",
          {
            "bg-main": index % 2 === 0,
            // "bg-[#9A8143]": index % 3 != 0,
            "bg-[#ED164B]": index % 2 != 0,
          }
        )}
      >
        {t(item?.office)} &nbsp;
      </div>
      <p className="min-h-[20px] line-clamp-2">
        {t("name_person_contact")} : {t(item?.representative)}
      </p>
      <p className="min-h-[20px] line-clamp-2">
        {t("part")} : {t(item?.department)}
      </p>
      <p className="min-h-[20px] line-clamp-2">
        {t("position")} : {t(item?.position)}
      </p>
      <p className="min-h-[20px] line-clamp-2 ">
        {t("phone_number")} : <a href={`tel:${item.phone.split(' ').join('-')}`} ><span className="text-red-600 text-base font-medium">{item?.phone}</span></a>
      </p>
      <p className="min-h-[20px] line-clamp-2">
        {t("email")} : <a href={`mailto:${item.email}`} className="text-black text-base font-medium" >{item?.email}</a>
      </p>
      <p className="min-h-[20px] line-clamp-2">
        {t("address")} : {t(item?.address)}
      </p>
      <p className="min-h-[20px] line-clamp-2">
        {t("factory")} : {t(item?.factory)}
      </p>
      <p className="min-h-[20px] line-clamp-2">
        {t("factory_address")} : {t(item?.factory_address)}
      </p>
      <p className="min-h-[20px] line-clamp-2">
        {t("factory_phone")} : <a href={`tel:${item.factory_phone.split(' ').join('-')}`} ><span className="text-red-600 text-base font-medium">{item?.factory_phone}</span></a>
      </p>
    </div>
  );
});

export default OfficeItem;
